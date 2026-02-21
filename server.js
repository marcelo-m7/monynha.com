/**
 * Monynha Softwares - Production Server
 * Express server with static file serving and API endpoints
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, tel, company, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Missing required fields: name, email, and message are mandatory.' 
    });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    console.error('[SERVER ERROR] RESEND_API_KEY environment variable is missing.');
    return res.status(500).json({ 
      error: 'The email service is not properly configured on the server.' 
    });
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Monynha Softwares <hello@monynha.com>',
        to: 'hello@monynha.com',
        subject: `New contact form submission — ${name}`,
        reply_to: email,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: 'Inter', sans-serif; color: #05070a; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 40px; border: 4px solid #05070a; background-color: #ffffff; }
                .header { border-bottom: 4px solid #8b5cf6; margin-bottom: 30px; padding-bottom: 10px; }
                .label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: #8b5cf6; margin-bottom: 4px; }
                .value { font-size: 18px; font-weight: 700; margin-bottom: 24px; color: #05070a; }
                .message-box { background-color: #f8fafc; border-left: 4px solid #8b5cf6; padding: 20px; margin-top: 30px; }
                .footer { margin-top: 40px; font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: -0.02em;">New Studio Signal</h1>
                </div>
                
                <div>
                  <div class="label">Name / Identity</div>
                  <div class="value">${name}</div>
                  
                  <div class="label">Email Address</div>
                  <div class="value">${email}</div>
                  
                  <div class="label">Phone / WhatsApp</div>
                  <div class="value">${tel || 'Not provided'}</div>
                  
                  <div class="label">Company / Project</div>
                  <div class="value">${company || 'Not provided'}</div>
                  
                  <div class="message-box">
                    <div class="label" style="color: #8b5cf6;">Message Context</div>
                    <p style="margin: 0; white-space: pre-wrap; font-size: 16px;">${message}</p>
                  </div>
                </div>
                
                <div class="footer">
                  © Monynha Softwares · Automated Notification · ${new Date().toLocaleString()}
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    const result = await resendResponse.json();

    if (resendResponse.ok) {
      console.log(`[EMAIL SENT] Contact form submission from ${name} (${email}) - ID: ${result.id}`);
      return res.status(200).json({ success: true, id: result.id });
    } else {
      console.error('[RESEND ERROR]', result);
      return res.status(resendResponse.status).json({ 
        error: result.message || 'The email service rejected the transmission. Please check the logs.' 
      });
    }
  } catch (error) {
    console.error('[INTERNAL ERROR]', error);
    return res.status(500).json({ 
      error: 'A critical error occurred while attempting to deliver the signal.' 
    });
  }
});

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║  Monynha Softwares Server                            ║
║  Running on port ${PORT}                               ║
║  Environment: ${process.env.NODE_ENV || 'development'}                           ║
║  API Endpoint: POST /api/contact                     ║
╚══════════════════════════════════════════════════════╝
  `);
  
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  WARNING: RESEND_API_KEY is not set. Contact form will not work.');
  } else {
    console.log('✅ Email service configured');
  }
});
