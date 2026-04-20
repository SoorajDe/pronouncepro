import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';
import cors from 'cors';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import nodemailer from 'nodemailer';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Database setup
const dbPath = join(__dirname, '..', 'db/db.json');
const adapter = new FileSync(dbPath);
const db = low(adapter);

// Initialize database
db.defaults({
  users: [],
  userProgress: {},
  achievements: {}
}).write();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Email setup
let transporter;
const setupEmail = async () => {
    try {
        if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
            // Use Gmail if configured
            transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });
            console.log('Email transporter configured to use Gmail.');
        } else {
            // Fallback to Ethereal for testing
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
            console.log('Gmail not configured. Falling back to Ethereal for testing emails.');
            console.log('To use Gmail, set GMAIL_USER and GMAIL_APP_PASSWORD in backend/.env');
        }
    } catch (error) {
        console.error('Failed to setup email transporter:', error);
    }
};


const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_API_VERSION = process.env.GEMINI_API_VERSION || 'v1beta';
const API_URL = `https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existingUser = db.get('users').find({ email }).value();
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email,
      name,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      streak: 0,
      totalScore: 0,
      languages: ['en']
    };

    db.get('users').push(user).write();

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        streak: user.streak,
        totalScore: user.totalScore,
        languages: user.languages
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.get('users').find({ email }).value();
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        streak: user.streak,
        totalScore: user.totalScore,
        languages: user.languages
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = db.get('users').find({ email }).value();

  if (user) {
    if (!transporter) {
      console.error('Email transporter not configured.');
      return res.status(500).json({ error: 'Email service is currently unavailable.' });
    }

    try {
      // Generate a short-lived token
      const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });
      const resetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

      // Store the reset token and expiry on the user's record
      db.get('users').find({ id: user.id }).assign({
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      }).write();

      // Create the reset link
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const resetUrl = `${frontendUrl}/?page=reset-password&token=${resetToken}`;

      // Email content
      const mailOptions = {
        from: '"PronouncePro" <no-reply@pronouncepro.com>',
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Password Reset Request</h2>
            <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click on the button below to choose a new password:</p>
            <a href="${resetUrl}" style="background-color: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            <p>This link will expire in 15 minutes.</p>
          </div>
        `,
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Password reset email sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
      console.error('Error sending password reset email:', error);
      // Still send a generic message to the client
    }
  }

  // Always return a success message to prevent user enumeration
  res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required.' });
    }

    // Verify the JWT
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: 'Password reset token is invalid or has expired.' });
    }

    // Find the user and check the token
    const user = db.get('users').find({
      id: decoded.id,
      passwordResetToken: token,
    }).value();

    // Check if user exists and token is not expired
    if (!user || user.passwordResetExpires < Date.now()) {
      return res.status(401).json({ error: 'Password reset token is invalid or has expired.' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset fields
    db.get('users').find({ id: user.id }).assign({
      password: hashedNewPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    }).write();

    res.json({ message: 'Password has been reset successfully.' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'An internal error occurred.' });
  }
});


// Protected routes
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = db.get('users').find({ id: req.user.id }).value();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    streak: user.streak,
    totalScore: user.totalScore,
    languages: user.languages,
    createdAt: user.createdAt
  });
});

app.post('/api/user/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    const user = db.get('users').find({ id: userId }).value();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    db.get('users').find({ id: userId }).assign({ password: hashedNewPassword }).write();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});


app.post('/api/user/progress', authenticateToken, (req, res) => {
  const { language, score, feedback } = req.body;
  const userId = req.user.id;

  // Update user progress
  const user = db.get('users').find({ id: userId }).value();
  if (user) {
    user.totalScore += score;
    db.get('users').find({ id: userId }).assign(user).write();
  }

  // Save detailed progress
  const progress = db.get('userProgress').value();
  if (!progress[userId]) progress[userId] = {};
  if (!progress[userId][language]) progress[userId][language] = [];

  progress[userId][language].push({
    score,
    feedback,
    date: new Date().toISOString()
  });

  db.set('userProgress', progress).write();

  res.json({ success: true });
});

app.post('/api/gemini', authenticateToken, async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured. Please set the GEMINI_API_KEY environment variable.' });
  }

  const maxRetries = 3;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.post(API_URL, req.body);
      return res.json(response.data);
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      const isRetryable = status === 429 || status >= 500;

      if (isRetryable && attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s + random jitter
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        console.log(`Gemini API call failed with status ${status}, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      console.error('Error calling Gemini API:', error.response ? error.response.data : error.message);
      return res.status(status).json({ error: 'Failed to call Gemini API' });
    }
  }
});





app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
