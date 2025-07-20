const Customer = require('../models/Customer');

exports.generateReports = async (req, res) => {
  try {
    const leadConversionRates = await Customer.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const salesPerformance = await Customer.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ leadConversionRates, salesPerformance });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};