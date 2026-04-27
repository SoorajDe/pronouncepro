PronouncePro - AI-Powered Pronunciation Coach
License: ISC
Backend: Node.js
Frontend: Vite


🚀 Overview:

PronouncePro is a modern, full-stack web application designed to help users master pronunciation across multiple languages using cutting-edge AI analysis. Built with a responsive glassmorphism UI, it provides an immersive learning experience with real-time speech recognition, AI-powered feedback via Google's Gemini model, and comprehensive progress tracking.


🎯 Key Features:

Multi-Language Support: English, Spanish, French, Hindi, Kannada, Tamil, Telugu (with easy expansion)
AI-Powered Analysis: Real-time pronunciation scoring using Gemini AI
Speech Recognition & Synthesis: Browser-native Web Speech API integration
Progressive Web App (PWA): Installable, offline-capable experience
Complete User Management:
Registration, login, password reset via email
JWT authentication with 7-day tokens
Password change functionality
Learning Modules:
Practice: Guided phrase repetition with instant feedback
Roleplay: Conversational AI scenarios
Custom Practice: User-defined phrases
Phonetics: Accent analysis and voice cloning
Games: Gamified pronunciation challenges
Exam: Timed assessments
Scanner: OCR text scanning for practice
Analytics: Detailed charts and streak tracking
Settings: Theme toggle (light/dark), profile management
Advanced Features:
Daily streak counter with persistence
Real-time subtitle display during recording
Guest mode for instant access
Responsive design (mobile-first)
Smooth animations and micro-interactions


🛠 Tech Stack:

Backend:
Node.js + Express (ESM)
lowdb (JSON database)
JWT Authentication
bcrypt password hashing
Gemini AI API integration (with retry logic)
Nodemailer for password reset emails
CORS enabled


Frontend:
Vite (build tool)
Vanilla JavaScript + Web Speech API
Tailwind CSS + Custom glassmorphism styles
Chart.js for analytics
Tesseract.js for OCR scanning
html2canvas + jsPDF for exports
Vite PWA plugin
Wavesurfer.js for audio visualization
Development Tools

Gemini API key required (backend/.env)
Optional Gmail SMTP for production emails
File-based database (backend/db/db.json)


🚀 Quick Start
🚀 Quick Start

1. `cd backend && npm install && npm start`
2. `cd frontend && npm install && npm run dev`
3. Add `GEMINI_API_KEY` to `backend/.env`
4. Visit `http://localhost:5173`

🌐 Environment Variables

Backend (.env)
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your-super-secret-jwt-key-change-in-production
GMAIL_USER=your-email@gmail.com  # Optional
GMAIL_APP_PASSWORD=your-app-password  # Optional
FRONTEND_URL=http://localhost:5173  # Optional


📁 Project Structure:

pronouncepro/
├── backend/                 # Node.js + Express API
│   ├── src/server.mjs       # Main server
│   ├── db/db.json          # User data & progress
│   └── config/env.js
├── frontend/                # Vite PWA Frontend
│   ├── src/
│   │   ├── main.js         # App router & state
│   │   ├── components/
│   │   └── pages/          # 10+ learning pages
│   ├── public/manifest.json
│   └── vite.config.js      # PWA config
├── start-backend.bat       # One-click start
└── README.md


🔍 API Endpoints:

Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
POST	/api/auth/forgot-password	Send reset email
POST	/api/auth/reset-password	Reset password
GET	/api/user/profile	Get user profile
POST	/api/user/progress	Save practice results
POST	/api/gemini	AI pronunciation analysis


🎨 UI/UX Highlights:

Glassmorphism Design: Modern frosted glass effects
Animated Navigation: Pill-style nav with color bends
Dark/Light Mode: Automatic + manual toggle (Ctrl+Shift+D)
Mobile-First: Perfect on all devices
Micro-interactions: Smooth transitions everywhere
Real-time Feedback: Live subtitle + scoring


📊 Progress Tracking:

Daily streaks (persisted)
Language-specific scores
Total score accumulation
Achievement system ready for expansion


🔒 Security Features:

Password hashing (bcrypt)
JWT tokens (7-day expiry)
Rate limiting on AI calls
Secure password reset flow
Input validation everywhere


🌍 Supported Languages:

Language	Code	Phrases	Difficulty Levels
English	en-US	✅	Easy/Medium/Hard
Spanish	es-ES	✅	Easy/Medium/Hard
French	fr-FR	✅	Easy/Medium/Hard
Hindi	hi-IN	✅	Easy/Medium/Hard
Kannada	kn-IN	✅	Easy/Medium/Hard
Tamil	ta-IN	✅	Easy/Medium/Hard
Telugu	te-IN	✅	Easy/Medium/Hard


🤝 Contributing:

Fork the repository
Create feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open Pull Request
Note: Use blackboxai/ prefix for branch names when submitting PRs.


🙏 Acknowledgments:

Google Gemini API
Vite PWA Plugin
Tailwind CSS
Browser Speech APIs
The open-source community ✨

⭐ Star this repo if you found it useful!
Built with ❤️ using modern web technologies
