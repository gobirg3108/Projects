import Resume from "../models/resumeModel.js";
import path from "path";
import fs from "fs";

export const uploadResumeImages = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      // Clean up the uploaded file if resume not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Resume not found" });
    }

    // Delete old thumbnail if exists
    if (resume.thumbnailLink) {
      const oldThumbnailPath = path.join(
        process.cwd(),
        "uploads",
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    resume.thumbnailLink = `${baseUrl}/uploads/${req.file.filename}`;

    await resume.save();

    res.status(200).json({
      message: "Thumbnail uploaded successfully",
      thumbnailLink: resume.thumbnailLink,
    });
  } catch (error) {
    // Clean up the uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      message: "Failed to upload thumbnail",
      error: error.message,
    });
  }
};
