const nodemailer = require("nodemailer");
const config = require("./config");

async function testEmailConfig() {
  console.log("🧪 Testing email configuration...");
  console.log("📧 SMTP Settings:");
  console.log(`   Host: ${config.email.smtp.host}`);
  console.log(`   Port: ${config.email.smtp.port}`);
  console.log(`   Secure: ${config.email.smtp.secure}`);
  console.log(`   User: ${config.email.smtp.auth.user}`);
  console.log(`   From: ${config.email.from.email}`);
  console.log(`   To: ${config.email.to}`);
  console.log("");

  const transporter = nodemailer.createTransporter({
    host: config.email.smtp.host,
    port: config.email.smtp.port,
    secure: config.email.smtp.secure,
    auth: {
      user: config.email.smtp.auth.user,
      pass: config.email.smtp.auth.pass,
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
  });

  try {
    // Test connection
    console.log("⏳ Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully!");

    // Send test email
    console.log("⏳ Sending test email...");
    const info = await transporter.sendMail({
      from: `"${config.email.from.name}" <${config.email.from.email}>`,
      to: config.email.to,
      subject: "🧪 Test Email - Veloria API Integration",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            ✅ Email Configuration Test Successful
          </h2>
          
          <p>This is a test email to verify that your Veloria API email configuration is working correctly.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #34495e; margin-top: 0;">Configuration Details</h3>
            <p><strong>SMTP Host:</strong> ${config.email.smtp.host}</p>
            <p><strong>SMTP Port:</strong> ${config.email.smtp.port}</p>
            <p><strong>Security:</strong> ${
              config.email.smtp.secure ? "SSL" : "TLS"
            }</p>
            <p><strong>From:</strong> ${config.email.from.email}</p>
            <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #27ae60; font-weight: bold;">
            🎉 Your contact forms, booking requests, and get-started forms will now work perfectly!
          </p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📬 Check your inbox at: ${config.email.to}`);
    console.log("");
    console.log("🎉 Email configuration is working perfectly!");
  } catch (error) {
    console.error("❌ Email configuration test failed:");
    console.error(error.message);

    if (error.code === "EAUTH") {
      console.log("\n💡 Authentication failed. Check:");
      console.log("   - Your email password is correct");
      console.log("   - Two-factor authentication settings");
      console.log("   - App passwords (if using 2FA)");
    } else if (error.code === "ECONNECTION") {
      console.log("\n💡 Connection failed. Check:");
      console.log("   - Network/firewall settings");
      console.log("   - SMTP port (587 or 465)");
      console.log("   - SMTP_SECURE setting");
    }
  }
}

// Run the test
testEmailConfig()
  .then(() => {
    console.log("\n🔬 Email test completed!");
    process.exit(0);
  })
  .catch(console.error);
