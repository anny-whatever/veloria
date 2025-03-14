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

// Email template for new contact notification to admin
const createAdminEmailTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header with gradient background -->
      <div style="background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); padding: 30px 20px; text-align: center;">
        <!-- Logo text styled to match your brand -->
        <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; font-family: 'Poppins', Arial, sans-serif;">Veloria</h1>
      </div>
      
      <!-- Email Body -->
      <div style="padding: 30px 20px; background-color: #ffffff;">
        <h2 style="color: #ecb761; margin-top: 0;">New Contact Form Submission</h2>
        <p>You've received a new contact form submission with the following details:</p>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Name:</div>
          <div style="margin-top: 5px;">${data.name}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Email:</div>
          <div style="margin-top: 5px;">${data.email}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Subject:</div>
          <div style="margin-top: 5px;">${data.subject || "N/A"}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Message:</div>
          <div style="margin-top: 5px;">${data.message.replace(
            /\n/g,
            "<br>"
          )}</div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="#" style="display: inline-block; padding: 12px 24px; background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Log in to Admin Panel</a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center; color: #666666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Veloria Studio. All rights reserved.</p>
        <p>1603, Palava City, Downtown Palava phase 2, Mumbai</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Email template for confirmation to user
const createUserEmailTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Veloria Studio</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header with gradient background -->
      <div style="background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); padding: 30px 20px; text-align: center;">
        <!-- Logo text styled to match your brand -->
        <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; font-family: 'Poppins', Arial, sans-serif;">Veloria</h1>
      </div>
      
      <!-- Email Body -->
      <div style="padding: 30px 20px; background-color: #ffffff;">
        <h2 style="color: #ecb761; margin-top: 0; text-align: center;">Thank You for Reaching Out!</h2>
        
        <!-- Divider -->
        <div style="height: 3px; width: 50px; margin: 20px auto; background: linear-gradient(to right, #ecb761, #deb0bd);"></div>
        
        <p>Hello ${data.name},</p>
        
        <p>Thank you for contacting Veloria Studio. We've received your message and appreciate your interest in our services.</p>
        
        <p>Our team will review your inquiry and get back to you as soon as possible. We typically respond within 24 hours during business days.</p>
        
        <p>If you have any urgent questions, please don't hesitate to call us at <strong>+91 9315 360 595</strong>.</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://veloria.in/#portfolio" style="display: inline-block; padding: 12px 24px; background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">View Our Portfolio</a>
        </div>
        
        <div style="margin-top: 30px;">
          <p>Kind regards,<br>The Veloria Studio Team</p>
        </div>
        
        <div style="text-align: center; margin-top: 25px;">
          <a href="#" style="display: inline-block; margin: 0 10px; color: #8b86be; text-decoration: none;">Facebook</a>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #8b86be; text-decoration: none;">Twitter</a>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #8b86be; text-decoration: none;">Instagram</a>
          <a href="#" style="display: inline-block; margin: 0 10px; color: #8b86be; text-decoration: none;">LinkedIn</a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center; color: #666666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Veloria Studio. All rights reserved.</p>
        <p>1603, Palava City, Downtown Palava phase 2, Mumbai</p>
        <p style="margin-top: 15px; font-size: 11px;">If you did not submit this contact form, please disregard this email.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Send notification to admin
const sendNotification = async ({ type, data }) => {
  try {
    let subject = "";
    let html = "";

    if (type === "new_contact") {
      subject = "New Contact Form Submission";
      html = createAdminEmailTemplate(data);
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
      // Include a text version as fallback
      text: `
        You've received a new contact form submission:
        
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject || "N/A"}
        Message: ${data.message}
        
        Log in to the admin panel to view the full message.
      `,
    });
  } catch (error) {
    console.error("Email notification error:", error);
  }
};

// Send confirmation to user
const sendConfirmation = async ({ type, recipient, data }) => {
  try {
    let subject = "";
    let html = "";

    if (type === "contact_received") {
      subject = "Thank You for Contacting Veloria Studio";
      html = createUserEmailTemplate(data);
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: recipient,
      subject,
      html,
      // Include a text version as fallback
      text: `
        Hello ${data.name},
        
        Thank you for reaching out to Veloria Studio. We have received your message and will get back to you shortly.
        
        If you have any urgent questions, please don't hesitate to call us at +91 9315 360 595.
        
        Kind regards,
        The Veloria Studio Team
      `,
    });
  } catch (error) {
    console.error("Email confirmation error:", error);
  }
};

module.exports = {
  sendNotification,
  sendConfirmation,
};
