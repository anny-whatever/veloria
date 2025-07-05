const nodemailer = require("nodemailer");
const config = require("./config");

class EmailService {
  constructor() {
    this.transporter = null;
    this.init();
  }

  init() {
    // Check if email configuration is properly set
    if (
      config.email.smtp.auth.user === "you@yourdomain.com" ||
      config.email.smtp.auth.pass === "your_password"
    ) {
      console.warn(
        "⚠️  Email configuration not properly set! Using default placeholder values."
      );
      console.warn(
        "   Please create a .env file in the server directory with proper SMTP credentials."
      );
      console.warn(
        "   Contact form submissions will be saved to database but emails will not be sent."
      );
      this.transporter = null;
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: config.email.smtp.host,
      port: config.email.smtp.port,
      secure: config.email.smtp.secure,
      auth: {
        user: config.email.smtp.auth.user,
        pass: config.email.smtp.auth.pass,
      },
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error("Email configuration error:", error);
        if (error.code === "ETIMEDOUT") {
          console.error(
            "Connection timeout - please check your SMTP settings and network connectivity"
          );
        } else if (error.code === "EAUTH") {
          console.error(
            "Authentication failed - please check your email credentials"
          );
        } else if (error.code === "ECONNECTION") {
          console.error(
            "Connection failed - please check your SMTP host and port"
          );
        }
      } else {
        console.log("✅ Email server is ready to send messages");
      }
    });
  }

  // Send contact form notification
  async sendContactNotification(data) {
    if (!this.transporter) {
      console.log(
        "📝 Contact form submission received (email not configured):",
        {
          name: data.name,
          email: data.email,
          subject: data.subject || "No Subject",
        }
      );
      return { success: false, error: "Email service not configured" };
    }

    const mailOptions = {
      from: `"${config.email.from.name}" <${config.email.from.email}>`,
      to: config.email.to,
      subject: `New Contact Form Submission - ${data.subject || "No Subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #34495e; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${
        data.email
      }</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
            ${
              data.company
                ? `<p><strong>Company:</strong> ${data.company}</p>`
                : ""
            }
            <p><strong>Subject:</strong> ${data.subject || "No Subject"}</p>
          </div>

          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #34495e; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="background-color: #f1f3f4; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 12px; color: #6c757d;">
            <p><strong>Submission Details:</strong></p>
            <p>IP Address: ${data.ip_address || "Not available"}</p>
            <p>User Agent: ${data.user_agent || "Not available"}</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Contact notification email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending contact notification email:", error);
      return { success: false, error: error.message };
    }
  }

  // Send book call notification
  async sendBookCallNotification(data) {
    if (!this.transporter) {
      console.log("📞 Book call request received (email not configured):", {
        name: data.name,
        email: data.email,
        preferred_date: data.preferred_date,
        preferred_time: data.preferred_time,
      });
      return { success: false, error: "Email service not configured" };
    }

    const mailOptions = {
      from: `"${config.email.from.name}" <${config.email.from.email}>`,
      to: config.email.to,
      subject: `New Book Call Request - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">
            New Book Call Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #34495e; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${
        data.email
      }</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
            ${
              data.company
                ? `<p><strong>Company:</strong> ${data.company}</p>`
                : ""
            }
          </div>

          <div style="background-color: #fff3cd; padding: 20px; border: 1px solid #ffeaa7; border-radius: 5px;">
            <h3 style="color: #856404; margin-top: 0;">Call Preferences</h3>
            ${
              data.preferred_date
                ? `<p><strong>Preferred Date:</strong> ${data.preferred_date}</p>`
                : ""
            }
            ${
              data.preferred_time
                ? `<p><strong>Preferred Time:</strong> ${data.preferred_time}</p>`
                : ""
            }
          </div>

          ${
            data.message
              ? `
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; margin-top: 20px;">
              <h3 style="color: #34495e; margin-top: 0;">Additional Message</h3>
              <p style="white-space: pre-wrap;">${data.message}</p>
            </div>
          `
              : ""
          }

          <div style="background-color: #f1f3f4; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 12px; color: #6c757d;">
            <p><strong>Submission Details:</strong></p>
            <p>IP Address: ${data.ip_address || "Not available"}</p>
            <p>User Agent: ${data.user_agent || "Not available"}</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Book call notification email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending book call notification email:", error);
      return { success: false, error: error.message };
    }
  }

  // Send get started notification
  async sendGetStartedNotification(data) {
    if (!this.transporter) {
      console.log("🚀 Get started request received (email not configured):", {
        name: data.name,
        email: data.email,
        service_type: data.service_type,
        budget_range: data.budget_range,
      });
      return { success: false, error: "Email service not configured" };
    }

    const mailOptions = {
      from: `"${config.email.from.name}" <${config.email.from.email}>`,
      to: config.email.to,
      subject: `New Get Started Request - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">
            New Get Started Request
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #34495e; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${
        data.email
      }</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
            ${
              data.company
                ? `<p><strong>Company:</strong> ${data.company}</p>`
                : ""
            }
          </div>

          <div style="background-color: #d4edda; padding: 20px; border: 1px solid #c3e6cb; border-radius: 5px;">
            <h3 style="color: #155724; margin-top: 0;">Project Details</h3>
            ${
              data.service_type
                ? `<p><strong>Service Type:</strong> ${data.service_type}</p>`
                : ""
            }
            ${
              data.budget_range
                ? `<p><strong>Budget Range:</strong> ${data.budget_range}</p>`
                : ""
            }
            ${
              data.timeline
                ? `<p><strong>Timeline:</strong> ${data.timeline}</p>`
                : ""
            }
          </div>

          ${
            data.project_description
              ? `
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; margin-top: 20px;">
              <h3 style="color: #34495e; margin-top: 0;">Project Description</h3>
              <p style="white-space: pre-wrap;">${data.project_description}</p>
            </div>
          `
              : ""
          }

          <div style="background-color: #f1f3f4; padding: 15px; border-radius: 5px; margin-top: 20px; font-size: 12px; color: #6c757d;">
            <p><strong>Submission Details:</strong></p>
            <p>IP Address: ${data.ip_address || "Not available"}</p>
            <p>User Agent: ${data.user_agent || "Not available"}</p>
            <p>Submitted at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Get started notification email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending get started notification email:", error);
      return { success: false, error: error.message };
    }
  }

  // Send confirmation email to user
  async sendConfirmationEmail(email, name, type) {
    if (!this.transporter) {
      console.log("✉️  Confirmation email skipped (email not configured):", {
        email,
        name,
        type,
      });
      return { success: false, error: "Email service not configured" };
    }

    const subjects = {
      contact: "Thank you for contacting us!",
      bookCall: "Your call request has been received!",
      getStarted: "Thank you for your interest in our services!",
    };

    const mailOptions = {
      from: `"${config.email.from.name}" <${config.email.from.email}>`,
      to: email,
      subject: subjects[type] || "Thank you for your submission!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            Thank You, ${name}!
          </h2>
          
          <p>We have received your submission and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your submission</li>
              <li>We'll contact you within 24 hours</li>
              <li>We'll discuss your needs and next steps</li>
            </ul>
          </div>

          <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
          
          <p>Best regards,<br>
          The Veloria Team</p>
        </div>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Confirmation email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
