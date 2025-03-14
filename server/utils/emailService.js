// server/utils/emailService.js
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

// Email template for project request notification to admin
const createProjectNotificationTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Project Request</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header with gradient background -->
      <div style="background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; font-family: 'Poppins', Arial, sans-serif;">Veloria</h1>
      </div>
      
      <!-- Email Body -->
      <div style="padding: 30px 20px; background-color: #ffffff;">
        <h2 style="color: #ecb761; margin-top: 0;">New Project Request</h2>
        <p>You've received a new project request with the following details:</p>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Project Name:</div>
          <div style="margin-top: 5px;">${data.projectName}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Service Type:</div>
          <div style="margin-top: 5px;">${
            data.serviceType.charAt(0).toUpperCase() + data.serviceType.slice(1)
          }</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Client:</div>
          <div style="margin-top: 5px;">${data.name}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Company:</div>
          <div style="margin-top: 5px;">${data.companyName}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Contact:</div>
          <div style="margin-top: 5px;">
            Email: ${data.email}<br>
            Phone: ${data.phone || "Not provided"}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="#" style="display: inline-block; padding: 12px 24px; background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">View Project Details</a>
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

// Email template for booking notification to admin
const createBookingNotificationTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Discovery Call Booking</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header with gradient background -->
      <div style="background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; font-family: 'Poppins', Arial, sans-serif;">Veloria</h1>
      </div>
      
      <!-- Email Body -->
      <div style="padding: 30px 20px; background-color: #ffffff;">
        <h2 style="color: #ecb761; margin-top: 0;">New Discovery Call Booking</h2>
        <p>You've received a new discovery call booking with the following details:</p>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Client:</div>
          <div style="margin-top: 5px;">${data.name}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Contact:</div>
          <div style="margin-top: 5px;">
            Email: ${data.email}<br>
            Phone: ${data.phone || "Not provided"}
          </div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Date & Time:</div>
          <div style="margin-top: 5px;">${data.date} at ${data.time} (${
    data.timezone
  })</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Call Type:</div>
          <div style="margin-top: 5px;">${
            data.callType === "video" ? "Video Call" : "Phone Call"
          }</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Project Type:</div>
          <div style="margin-top: 5px;">${data.projectType}</div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="#" style="display: inline-block; padding: 12px 24px; background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">View Booking Details</a>
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

// Email template for booking cancellation notification to admin
const createBookingCancellationTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discovery Call Cancelled</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header with gradient background -->
      <div style="background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; font-family: 'Poppins', Arial, sans-serif;">Veloria</h1>
      </div>
      
      <!-- Email Body -->
      <div style="padding: 30px 20px; background-color: #ffffff;">
        <h2 style="color: #e74c3c; margin-top: 0;">Discovery Call Cancelled</h2>
        <p>A client has cancelled their scheduled discovery call:</p>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Client:</div>
          <div style="margin-top: 5px;">${data.name}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Email:</div>
          <div style="margin-top: 5px;">${data.email}</div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="font-weight: bold; color: #8b86be;">Cancelled Appointment:</div>
          <div style="margin-top: 5px;">${data.date} at ${data.time}</div>
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

// Email template for project request confirmation to user
const createProjectConfirmationTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Request Received - Veloria Studio</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header with gradient background -->
      <div style="background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; font-family: 'Poppins', Arial, sans-serif;">Veloria</h1>
      </div>
      
      <!-- Email Body -->
      <div style="padding: 30px 20px; background-color: #ffffff;">
        <h2 style="color: #ecb761; margin-top: 0; text-align: center;">Your Project Request Has Been Received!</h2>
        
        <!-- Divider -->
        <div style="height: 3px; width: 50px; margin: 20px auto; background: linear-gradient(to right, #ecb761, #deb0bd);"></div>
        
        <p>Hello ${data.name},</p>
        
        <p>Thank you for submitting your project request for "${
          data.projectName
        }". We're excited about the opportunity to work with you!</p>
        
        <p>Our team will carefully review your project details and get back to you within 24-48 hours with next steps or any additional information we might need.</p>
        
        <p>In the meantime, feel free to explore our portfolio or check out our process to learn more about how we work.</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://veloria.in/get-started#process" style="display: inline-block; padding: 12px 24px; background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); color: white; text-decoration: none; border-radius: 4px; font-weight: bold; margin-right: 10px;">Our Process</a>
          
          <a href="https://veloria.in/get-started#booking" style="display: inline-block; padding: 12px 24px; border: 2px solid #ecb761; color: #ecb761; text-decoration: none; border-radius: 4px; font-weight: bold; margin-left: 10px;">Book a Call</a>
        </div>
        
        <div style="margin-top: 30px;">
          <p>Looking forward to bringing your vision to life!</p>
          <p>Kind regards,<br>The Veloria Studio Team</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center; color: #666666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Veloria Studio. All rights reserved.</p>
        <p>1603, Palava City, Downtown Palava phase 2, Mumbai</p>
        <p>+91 9315 360 595 | support@veloria.in</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Email template for booking confirmation to user
const createBookingConfirmationTemplate = (data) => {
  const meetingInfo =
    data.callType === "video"
      ? `<p>You'll receive a separate email with Zoom meeting details closer to the scheduled time. If you don't receive it, please check your spam folder or contact us.</p>`
      : `<p>We'll call you at the phone number you provided at the scheduled time.</p>`;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discovery Call Confirmed - Veloria Studio</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header with gradient background -->
      <div style="background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; font-family: 'Poppins', Arial, sans-serif;">Veloria</h1>
      </div>
      
      <!-- Email Body -->
      <div style="padding: 30px 20px; background-color: #ffffff;">
        <h2 style="color: #ecb761; margin-top: 0; text-align: center;">Your Discovery Call is Confirmed!</h2>
        
        <!-- Divider -->
        <div style="height: 3px; width: 50px; margin: 20px auto; background: linear-gradient(to right, #ecb761, #deb0bd);"></div>
        
        <p>Hello ${data.name},</p>
        
        <p>Thank you for scheduling a discovery call with Veloria Studio. We're looking forward to learning more about your project!</p>
        
        <!-- Meeting Details Card -->
        <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 25px 0;">
          <h3 style="color: #8b86be; margin-top: 0;">Meeting Details</h3>
          
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold;">Date & Time:</div>
            <div>${data.date} at ${data.time} (${data.timezone})</div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <div style="font-weight: bold;">Call Type:</div>
            <div>${
              data.callType === "video" ? "Video Call (Zoom)" : "Phone Call"
            }</div>
          </div>
        </div>
        
        ${meetingInfo}
        
        <p>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance at <strong>support@veloria.in</strong> or call <strong>+91 9315 360 595</strong>.</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Discovery Call with Veloria Studio&dates=${encodeURIComponent(
            `${data.date}T${data.time}/${data.date}T${data.time}`
          )}&details=Discovery call to discuss your project" style="display: inline-block; padding: 12px 24px; background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Add to Calendar</a>
        </div>
        
        <div style="margin-top: 30px;">
          <p>We look forward to speaking with you!</p>
          <p>Kind regards,<br>The Veloria Studio Team</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center; color: #666666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Veloria Studio. All rights reserved.</p>
        <p>1603, Palava City, Downtown Palava phase 2, Mumbai</p>
        <p>+91 9315 360 595 | support@veloria.in</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

// Email template for booking cancellation to user
const createBookingCancellationConfirmationTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Cancellation Confirmed - Veloria Studio</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <!-- Header with gradient background -->
      <div style="background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; font-family: 'Poppins', Arial, sans-serif;">Veloria</h1>
      </div>
      
      <!-- Email Body -->
      <div style="padding: 30px 20px; background-color: #ffffff;">
        <h2 style="color: #ecb761; margin-top: 0; text-align: center;">Your Booking Has Been Cancelled</h2>
        
        <!-- Divider -->
        <div style="height: 3px; width: 50px; margin: 20px auto; background: linear-gradient(to right, #ecb761, #deb0bd);"></div>
        
        <p>Hello ${data.name},</p>
        
        <p>We're confirming that your discovery call scheduled for ${
          data.date
        } at ${data.time} has been successfully cancelled.</p>
        
        <p>We understand that schedules can change. If you'd like to reschedule your call for a more convenient time, please feel free to book another slot on our website.</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://veloria.in/get-started#booking" style="display: inline-block; padding: 12px 24px; background-color: #ecb761; background: linear-gradient(to right, #ecb761, #deb0bd); color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Reschedule Call</a>
        </div>
        
        <div style="margin-top: 30px;">
          <p>Thank you for your interest in Veloria Studio. We hope to connect with you soon!</p>
          <p>Kind regards,<br>The Veloria Studio Team</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f8f8f8; padding: 20px; text-align: center; color: #666666; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Veloria Studio. All rights reserved.</p>
        <p>1603, Palava City, Downtown Palava phase 2, Mumbai</p>
        <p>+91 9315 360 595 | support@veloria.in</p>
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

    switch (type) {
      case "new_contact":
        subject = "New Contact Form Submission";
        html = createAdminEmailTemplate(data);
        break;
      case "new_project":
        subject = "New Project Request";
        html = createProjectNotificationTemplate(data);
        break;
      case "new_booking":
        subject = "New Discovery Call Booking";
        html = createBookingNotificationTemplate(data);
        break;
      case "booking_cancelled":
        subject = "Discovery Call Cancelled";
        html = createBookingCancellationTemplate(data);
        break;
      default:
        throw new Error("Unknown notification type");
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
      // Include a text version as fallback
      text: `You've received a new notification. Please view this email in an HTML compatible email client.`,
    });
  } catch (error) {
    console.error("Email notification error:", error);
    throw error;
  }
};

// Send confirmation to user
const sendConfirmation = async ({ type, recipient, data }) => {
  try {
    let subject = "";
    let html = "";

    switch (type) {
      case "contact_received":
        subject = "Thank You for Contacting Veloria Studio";
        html = createUserEmailTemplate(data);
        break;
      case "project_received":
        subject = "Your Project Request Has Been Received - Veloria Studio";
        html = createProjectConfirmationTemplate(data);
        break;
      case "booking_confirmed":
        subject = "Your Discovery Call is Confirmed - Veloria Studio";
        html = createBookingConfirmationTemplate(data);
        break;
      case "booking_cancellation":
        subject = "Booking Cancellation Confirmed - Veloria Studio";
        html = createBookingCancellationConfirmationTemplate(data);
        break;
      default:
        throw new Error("Unknown confirmation type");
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: recipient,
      subject,
      html,
      // Include a text version as fallback
      text: `Thank you for contacting Veloria Studio. Please view this email in an HTML compatible email client for complete information.`,
    });
  } catch (error) {
    console.error("Email confirmation error:", error);
    throw error;
  }
};

module.exports = {
  sendNotification,
  sendConfirmation,
};
