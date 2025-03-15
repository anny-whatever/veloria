// server/controllers/projectController.js - Enhanced controller
const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");
const { sendNotification, sendConfirmation } = require("../utils/emailService");

// @desc    Submit project form
// @route   POST /api/projects
// @access  Public
const submitProject = asyncHandler(async (req, res) => {
  const {
    serviceType,
    projectName,
    projectDescription,
    projectGoals,
    budget,
    timeline,
    companyName,
    companyWebsite,
    industry,
    targetAudience,
    name,
    email,
    phone,
  } = req.body;

  // Validate required fields
  if (
    !serviceType ||
    !projectName ||
    !projectDescription ||
    !projectGoals ||
    !budget ||
    !timeline ||
    !companyName ||
    !industry ||
    !targetAudience ||
    !name ||
    !email
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create project in database
  const project = await Project.create({
    serviceType,
    projectName,
    projectDescription,
    projectGoals,
    budget,
    timeline,
    companyName,
    companyWebsite,
    industry,
    targetAudience,
    name,
    email,
    phone,
  });

  // Send email notifications
  try {
    // Send notification to admin
    await sendNotification({
      type: "new_project",
      data: {
        projectName,
        serviceType,
        name,
        email,
        phone,
        companyName,
      },
    });

    // Send confirmation to user
    await sendConfirmation({
      type: "project_received",
      recipient: email,
      data: { name, projectName },
    });

    console.log("Project notification emails sent successfully");
  } catch (error) {
    console.error("Failed to send project notification emails:", error);
    // Continue with the response even if email sending fails
  }

  res.status(201).json({
    success: true,
    message:
      "Your project request has been received. We'll contact you shortly.",
  });
});

// @desc    Get all projects
// @route   GET /api/projects/admin
// @access  Private/Admin
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.status(200).json(projects);
});

// @desc    Get project by ID
// @route   GET /api/projects/admin/:id
// @access  Private/Admin
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.status(200).json(project);
});

// @desc    Update project status
// @route   PATCH /api/projects/admin/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Update the project with the provided data
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: updatedProject,
  });
});

// @desc    Delete project
// @route   DELETE /api/projects/admin/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

// @desc    Update project workflow stage
// @route   PATCH /api/projects/admin/:id/workflow
// @access  Private/Admin
const updateWorkflowStage = asyncHandler(async (req, res) => {
  const { workflowStage } = req.body;

  if (!workflowStage) {
    res.status(400);
    throw new Error("Workflow stage is required");
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  project.workflowStage = workflowStage;
  const updatedProject = await project.save();

  res.status(200).json({
    success: true,
    data: updatedProject,
  });
});

// @desc    Add payment to project
// @route   POST /api/projects/admin/:id/payments
// @access  Private/Admin
const addPayment = asyncHandler(async (req, res) => {
  const { name, amount, dueDate, status, notes } = req.body;

  if (!name || !amount || !dueDate) {
    res.status(400);
    throw new Error("Payment name, amount, and due date are required");
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  project.paymentSchedule.push({
    name,
    amount,
    dueDate: new Date(dueDate),
    status: status || "pending",
    notes,
  });

  const updatedProject = await project.save();

  res.status(201).json({
    success: true,
    data: updatedProject,
  });
});

// @desc    Update payment status
// @route   PATCH /api/projects/admin/:id/payments/:paymentId
// @access  Private/Admin
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { status, paidDate } = req.body;

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const payment = project.paymentSchedule.id(req.params.paymentId);

  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }

  payment.status = status;
  if (status === "paid" && paidDate) {
    payment.paidDate = new Date(paidDate);
  }

  // Recalculate received payments
  if (status === "paid") {
    project.receivedPayments = project.paymentSchedule
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);
  }

  const updatedProject = await project.save();

  res.status(200).json({
    success: true,
    data: updatedProject,
  });
});

// @desc    Add milestone to project
// @route   POST /api/projects/admin/:id/milestones
// @access  Private/Admin
const addMilestone = asyncHandler(async (req, res) => {
  const { name, description, dueDate, status } = req.body;

  if (!name || !dueDate) {
    res.status(400);
    throw new Error("Milestone name and due date are required");
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  project.milestones.push({
    name,
    description,
    dueDate: new Date(dueDate),
    status: status || "pending",
  });

  const updatedProject = await project.save();

  res.status(201).json({
    success: true,
    data: updatedProject,
  });
});

// @desc    Update milestone status
// @route   PATCH /api/projects/admin/:id/milestones/:milestoneId
// @access  Private/Admin
const updateMilestoneStatus = asyncHandler(async (req, res) => {
  const { status, completedDate } = req.body;

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const milestone = project.milestones.id(req.params.milestoneId);

  if (!milestone) {
    res.status(404);
    throw new Error("Milestone not found");
  }

  milestone.status = status;
  if (status === "completed" && completedDate) {
    milestone.completedDate = new Date(completedDate);
  }

  const updatedProject = await project.save();

  res.status(200).json({
    success: true,
    data: updatedProject,
  });
});

// @desc    Add referral information
// @route   PATCH /api/projects/admin/:id/referral
// @access  Private/Admin
const addReferralInfo = asyncHandler(async (req, res) => {
  const { name, email, phone, commissionPercentage, notes } = req.body;

  if (!name || !commissionPercentage) {
    res.status(400);
    throw new Error("Referrer name and commission percentage are required");
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Calculate commission amount based on project value
  const commissionAmount = (project.projectValue * commissionPercentage) / 100;

  project.referredBy = {
    name,
    email,
    phone,
    commissionPercentage,
    commissionAmount,
    notes,
  };

  const updatedProject = await project.save();

  res.status(200).json({
    success: true,
    data: updatedProject,
  });
});

// @desc    Get upcoming deadlines
// @route   GET /api/projects/admin/deadlines
// @access  Private/Admin
const getUpcomingDeadlines = asyncHandler(async (req, res) => {
  // Get projects with deadlines
  const projectDeadlines = await Project.find({
    deadline: { $exists: true, $ne: null },
    status: { $nin: ["completed", "declined"] },
  }).select("projectName deadline status");

  // Get projects with milestone deadlines
  const projectsWithMilestones = await Project.find({
    "milestones.dueDate": { $exists: true, $ne: null },
    "milestones.status": { $ne: "completed" },
    status: { $nin: ["completed", "declined"] },
  }).select("projectName milestones");

  // Get projects with payment deadlines
  const projectsWithPayments = await Project.find({
    "paymentSchedule.dueDate": { $exists: true, $ne: null },
    "paymentSchedule.status": "pending",
    status: { $nin: ["declined"] },
  }).select("projectName paymentSchedule");

  // Format deadlines
  const formattedDeadlines = [];

  // Add project deadlines
  projectDeadlines.forEach((project) => {
    formattedDeadlines.push({
      projectId: project._id,
      projectName: project.projectName,
      type: "project",
      title: `Project Deadline: ${project.projectName}`,
      date: project.deadline,
      status: project.status,
    });
  });

  // Add milestone deadlines
  projectsWithMilestones.forEach((project) => {
    project.milestones.forEach((milestone) => {
      if (milestone.status !== "completed") {
        formattedDeadlines.push({
          projectId: project._id,
          projectName: project.projectName,
          type: "milestone",
          milestoneId: milestone._id,
          title: `Milestone: ${milestone.name}`,
          description: milestone.description,
          date: milestone.dueDate,
          status: milestone.status,
        });
      }
    });
  });

  // Add payment deadlines
  projectsWithPayments.forEach((project) => {
    project.paymentSchedule.forEach((payment) => {
      if (payment.status === "pending") {
        formattedDeadlines.push({
          projectId: project._id,
          projectName: project.projectName,
          type: "payment",
          paymentId: payment._id,
          title: `Payment Due: ${payment.name}`,
          amount: payment.amount,
          date: payment.dueDate,
          status: payment.status,
        });
      }
    });
  });

  // Sort by date
  formattedDeadlines.sort((a, b) => new Date(a.date) - new Date(b.date));

  res.status(200).json(formattedDeadlines);
});

// @desc    Get project statistics
// @route   GET /api/projects/admin/stats
// @access  Private/Admin
const getProjectStats = asyncHandler(async (req, res) => {
  // Get counts by status
  const statusCounts = await Project.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // Get counts by stage for active projects
  const stageCounts = await Project.aggregate([
    {
      $match: {
        status: "accepted",
      },
    },
    {
      $group: {
        _id: "$workflowStage",
        count: { $sum: 1 },
      },
    },
  ]);

  // Calculate financial metrics
  const financialMetrics = await Project.aggregate([
    {
      $match: {
        status: { $nin: ["declined"] },
      },
    },
    {
      $group: {
        _id: null,
        totalProjectValue: { $sum: "$projectValue" },
        totalReceivedPayments: { $sum: "$receivedPayments" },
        projectCount: { $sum: 1 },
      },
    },
  ]);

  // Format status counts as object
  const formattedStatusCounts = {};
  statusCounts.forEach((item) => {
    formattedStatusCounts[item._id] = item.count;
  });

  // Format stage counts as object
  const formattedStageCounts = {};
  stageCounts.forEach((item) => {
    formattedStageCounts[item._id] = item.count;
  });

  // Calculate financial summaries
  const finance =
    financialMetrics.length > 0
      ? {
          totalProjectValue: financialMetrics[0].totalProjectValue,
          totalReceivedPayments: financialMetrics[0].totalReceivedPayments,
          outstandingPayments:
            financialMetrics[0].totalProjectValue -
            financialMetrics[0].totalReceivedPayments,
          avgProjectValue:
            financialMetrics[0].totalProjectValue /
            financialMetrics[0].projectCount,
        }
      : {
          totalProjectValue: 0,
          totalReceivedPayments: 0,
          outstandingPayments: 0,
          avgProjectValue: 0,
        };

  res.status(200).json({
    byStatus: formattedStatusCounts,
    byStage: formattedStageCounts,
    finance,
  });
});

// @desc    Get calendar events
// @route   GET /api/projects/admin/calendar
// @access  Private/Admin
const getCalendarEvents = asyncHandler(async (req, res) => {
  const { start, end } = req.query;

  let dateFilter = {};
  if (start && end) {
    dateFilter = {
      $gte: new Date(start),
      $lte: new Date(end),
    };
  }

  // Find projects with relevant dates
  const projects = await Project.find({
    $or: [
      { deadline: dateFilter },
      { "milestones.dueDate": dateFilter },
      { "paymentSchedule.dueDate": dateFilter },
    ],
  }).select("projectName deadline milestones paymentSchedule");

  // Format as calendar events
  const events = [];

  projects.forEach((project) => {
    // Project deadline
    if (project.deadline) {
      events.push({
        id: `project_${project._id}`,
        title: `Deadline: ${project.projectName}`,
        start: project.deadline,
        end: project.deadline,
        allDay: true,
        type: "project",
        color: "#e74c3c", // Red
      });
    }

    // Milestone deadlines
    project.milestones.forEach((milestone) => {
      if (milestone.dueDate) {
        events.push({
          id: `milestone_${milestone._id}`,
          title: `${project.projectName}: ${milestone.name}`,
          start: milestone.dueDate,
          end: milestone.dueDate,
          allDay: true,
          type: "milestone",
          color: "#f39c12", // Orange
        });
      }
    });

    // Payment deadlines
    project.paymentSchedule.forEach((payment) => {
      if (payment.dueDate) {
        events.push({
          id: `payment_${payment._id}`,
          title: `${project.projectName}: ${payment.name} ($${payment.amount})`,
          start: payment.dueDate,
          end: payment.dueDate,
          allDay: true,
          type: "payment",
          color: "#2ecc71", // Green
        });
      }
    });
  });

  res.status(200).json(events);
});

module.exports = {
  submitProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateWorkflowStage,
  addPayment,
  updatePaymentStatus,
  addMilestone,
  updateMilestoneStatus,
  addReferralInfo,
  getUpcomingDeadlines,
  getProjectStats,
  getCalendarEvents,
};
