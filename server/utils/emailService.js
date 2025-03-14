const nodemailer = require("nodemailer");

// Configure transporter for Zoho Mail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send notification to admin
const sendNotification = async ({ type, data }) => {
  try {
    let subject = "";
    let text = "";

    if (type === "new_contact") {
      subject = "New Contact Form Submission";
      text = `
        You've received a new contact form submission:
        
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject || "N/A"}
        
        Log in to the admin panel to view the full message.
      `;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email notification error:", error);
  }
};

// Send confirmation to user
const sendConfirmation = async ({ type, recipient, data }) => {
  try {
    let subject = "";
    let text = "";

    if (type === "contact_received") {
      subject = "Thank You for Contacting Veloria Studio";
      text = `
        Hello ${data.name},
        
        Thank you for reaching out to Veloria Studio. We have received your message and will get back to you shortly.
        
        Kind regards,
        The Veloria Studio Team
      `;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: recipient,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email confirmation error:", error);
  }
};

module.exports = {
  sendNotification,
  sendConfirmation,
};
