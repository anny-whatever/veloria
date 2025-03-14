// server/controllers/projectController.js
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
  const { status, notes } = req.body;

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (status) project.status = status;
  if (notes) project.notes = notes;

  const updatedProject = await project.save();

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

module.exports = {
  submitProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
