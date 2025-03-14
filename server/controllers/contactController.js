// server/controllers/contactController.js
const Contact = require("../models/Contact");
const asyncHandler = require("express-async-handler");

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Please provide name, email and message");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Your message has been received. We will contact you shortly.",
  });
});

// @desc    Get all contacts
// @route   GET /api/contact/admin
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.status(200).json(contacts);
});

// @desc    Update contact status
// @route   PATCH /api/contact/admin/:id
// @access  Private/Admin
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  contact.status = status;
  await contact.save();

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// Make sure all functions are properly exported
module.exports = {
  submitContact,
  getContacts,
  updateContact,
};
