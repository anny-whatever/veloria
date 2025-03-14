// server/controllers/contactController.js
const Contact = require("../models/Contact");
const asyncHandler = require("express-async-handler");
const { sendNotification, sendConfirmation } = require("../utils/emailService");

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

  // Send notification to admin
  try {
    await sendNotification({
      type: "new_contact",
      data: { name, email, subject, message },
    });

    // Send confirmation to user
    await sendConfirmation({
      type: "contact_received",
      recipient: email,
      data: { name },
    });

    console.log("Email notifications sent successfully");
  } catch (error) {
    console.error("Failed to send email notifications:", error);
    // We don't want to fail the API request just because emails fail
    // So we just log the error but still return success to the client
  }

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

// @desc    Get contact by ID
// @route   GET /api/contact/admin/:id
// @access  Private/Admin
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// @desc    Update contact
// @route   PATCH /api/contact/admin/:id
// @access  Private/Admin
const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes, subject } = req.body;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Only update fields that are provided
  if (status !== undefined) contact.status = status;
  if (notes !== undefined) contact.notes = notes;
  if (subject !== undefined) contact.subject = subject;

  const updatedContact = await contact.save();

  res.status(200).json({
    success: true,
    data: updatedContact,
  });
});

// @desc    Delete contact
// @route   DELETE /api/contact/admin/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});

module.exports = {
  submitContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};
