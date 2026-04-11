import nodemailer from 'nodemailer';


export default async function handler(req, res) {
  console.log('--- API HANDLER START ---');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName, email, message } = req.body;

  // Basic validation
  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  // 0. Safety Check
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('SERVER ERROR: Missing Email Credentials in .env');
    return res.status(500).json({ 
      success: false, 
      message: 'Environment variables (EMAIL_USER/EMAIL_PASS) are missing from the server context.' 
    });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  // 1. Inquiry Alert (to you)
  const inquiryMail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `[PRODUCTION INQUIRY] - ${fullName}`,
    text: `New Portfolio Message:\n\nName: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email
  };

  // 2. Confirmation (to client)
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
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(inquiryMail),
      transporter.sendMail(confirmationMail)
    ]);
    
    return res.status(200).json({ success: true, message: 'All emails sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
