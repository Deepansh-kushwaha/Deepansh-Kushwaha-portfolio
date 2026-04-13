import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('SERVER ERROR: Missing Email Credentials in .env');
    return res.status(500).json({ 
      success: false, 
      message: 'Environment variables (EMAIL_USER/EMAIL_PASS) are missing.' 
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 1. Subscription Alert (to you)
  const alertMail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `[STUDIO NEWSLETTER] New Subscriber: ${email}`,
    text: `A new user has subscribed to the "Stay in the Flow" newsletter.\n\nEmail: ${email}`,
  };

  // 2. Welcome Email (to client)
  const welcomeMail = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Welcome to the Flow | Deepansh Kushwaha Studio`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
        <h2 style="color: #000; font-size: 24px; letter-spacing: -0.02em;">Nice to have you here.</h2>
        <p>Your subscription to <strong>Stay in the Flow</strong> is now active. You’re officially in the loop for exclusive digital aesthetics, motion design tips, and studio updates.</p>
        <p>Expect an occasional dose of inspiration delivered straight to your inbox. No noise, just pure fluidity.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 14px; color: #888;">You’re receiving this because you subscribed via the Deepansh Kushwaha Portfolio.</p>
        <p style="font-size: 14px;">Best regards,<br/><strong>Deepansh Kushwaha Studio</strong></p>
      </div>
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(alertMail),
      transporter.sendMail(welcomeMail)
    ]);
    
    return res.status(200).json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
