import fs from "fs";
import path from "path";
import Resume from "../models/resumeModel.js";
import upload from "../middleware/uploadMiddleware.js";

export const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(
      req,
      res,
      async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "File Upload Failed", error: err.message });
        }

        const resumeId = req.params.id;
        const resume = await Resume.findOne({
          _id: resumeId,
          userId: req.user._id,
        });

        if (!resume) {
          return res
            .status(404)
            .json({ message: "Resume not found or unauthorized" });
        }

        const uploadFolder = path.join(process.cwd(), "uploads");
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.profileImage?.[0];

        if (newThumbnail) {
          // Delete old thumbnail if exists
          if (resume.thumbnailLink) {
            const oldThumbnailPath = path.join(
              uploadFolder,
              path.basename(resume.thumbnailLink)
            );
            if (fs.existsSync(oldThumbnailPath)) {
              fs.unlinkSync(oldThumbnailPath);
            }
          }

          // Update with new thumbnail link
          resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }

        if (newProfileImage) {
          // Delete old profile image if exists
          if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfilePath = path.join(
              uploadFolder,
              path.basename(resume.profileInfo.profilePreviewUrl)
            );
            if (fs.existsSync(oldProfilePath)) {
              fs.unlinkSync(oldProfilePath);
            }
          }

          // Update with new profile image
          resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }

        await resume.save();

        res.status(200).json({
          message: "Image(s) uploaded successfully",
          thumbnailLink: resume.thumbnailLink,
          profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
        });
      }
    );
  } catch (err) {
    console.error("Error uploading images:", err);
    res.status(500).json({
      message: "Failed to upload images",
      error: err.message,
    });
  }
};
