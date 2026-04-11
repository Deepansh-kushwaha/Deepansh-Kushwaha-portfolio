const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { fullName, email, message } = req.body;

  // 1. Email to You (Inquiry Alert)
  const inquiryMail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `[STUDIO INQUIRY] - ${fullName}`,
    text: `New message from ${fullName} (${email}):\n\n${message}`,
    replyTo: email
  };

  // 2. Email to Client (Confirmation)
  const confirmationMail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Acknowledgment: Your Inquiry at Deepansh Kushwaha Studio`,
    text: `Hello ${fullName},\n\nThank you for reaching out to Deepansh Kushwaha Studio. We have received your message and will get back to you within 24-48 hours.\n\nYour message preview: "${message}"\n\nBest regards,\nDeepansh Kushwaha Studio`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #1a1a1a;">
        <h2 style="color: #000;">Thank you for reaching out, ${fullName}.</h2>
        <p>Your message has been received by the studio. We appreciate your interest in collaborating on a digital symphony.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 0.9em; color: #666;"><strong>Your Message Preview:</strong><br/>"${message}"</p>
        <p>A member of our team will review your inquiry and get back to you within 24-48 hours.</p>
        <br/>
        <p>Best regards,<br/><strong>Deepansh Kushwaha Studio</strong></p>
      </div>
    `,
    replyTo: process.env.EMAIL_USER
  };


  try {
    // Send both emails in parallel for better performance and reliability
    await Promise.all([
      transporter.sendMail(inquiryMail),
      transporter.sendMail(confirmationMail)
    ]);
    
    res.status(200).json({ success: true, message: 'All emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send one or more emails.' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
