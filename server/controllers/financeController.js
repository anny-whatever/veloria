// server/controllers/financeController.js
const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");

// @desc    Get finance overview
// @route   GET /api/finance/admin/overview
// @access  Private/Admin
const getFinanceOverview = asyncHandler(async (req, res) => {
  try {
    // Calculate total revenue (sum of all project values)
    const totalRevenueResult = await Project.aggregate([
      {
        $match: {
          status: { $nin: ["declined"] },
          projectValue: { $exists: true, $gt: 0 },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$projectValue" },
        },
      },
    ]);

    const totalRevenue =
      totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    // Calculate received payments (sum of all payments with status "paid")
    const receivedPaymentsResult = await Project.aggregate([
      {
        $unwind: "$paymentSchedule",
      },
      {
        $match: {
          "paymentSchedule.status": "paid",
        },
      },
      {
        $group: {
          _id: null,
          receivedPayments: { $sum: "$paymentSchedule.amount" },
        },
      },
    ]);

    const receivedPayments =
      receivedPaymentsResult.length > 0
        ? receivedPaymentsResult[0].receivedPayments
        : 0;

    // Calculate pending payments
    const pendingPayments = totalRevenue - receivedPayments;

    // Get revenue by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const revenueByMonthResult = await Project.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          projectValue: { $exists: true, $gt: 0 },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$projectValue" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Format the revenue by month data
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const revenueByMonth = revenueByMonthResult.map((item) => ({
      month: monthNames[item._id.month - 1],
      revenue: item.revenue,
    }));

    // Get recent payments (paid)
    const recentPayments = await Project.aggregate([
      {
        $unwind: "$paymentSchedule",
      },
      {
        $match: {
          "paymentSchedule.status": "paid",
        },
      },
      {
        $sort: {
          "paymentSchedule.paidDate": -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          projectName: 1,
          clientName: "$name",
          paymentName: "$paymentSchedule.name",
          amount: "$paymentSchedule.amount",
          date: "$paymentSchedule.paidDate",
          status: "$paymentSchedule.status",
        },
      },
    ]);

    // Get upcoming payments (pending)
    const upcomingPayments = await Project.aggregate([
      {
        $unwind: "$paymentSchedule",
      },
      {
        $match: {
          "paymentSchedule.status": "pending",
          "paymentSchedule.dueDate": { $exists: true },
        },
      },
      {
        $sort: {
          "paymentSchedule.dueDate": 1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          projectName: 1,
          clientName: "$name",
          paymentName: "$paymentSchedule.name",
          amount: "$paymentSchedule.amount",
          dueDate: "$paymentSchedule.dueDate",
          status: "$paymentSchedule.status",
        },
      },
    ]);

    // Return the finance overview data
    res.status(200).json({
      financials: {
        totalRevenue,
        receivedPayments,
        pendingPayments,
        revenueByMonth,
      },
      recentPayments,
      upcomingPayments,
    });
  } catch (error) {
    console.error("Error fetching finance overview:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch finance overview",
      error: error.message,
    });
  }
});

module.exports = {
  getFinanceOverview,
};
