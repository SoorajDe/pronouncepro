0// --- Core App Logic ---

// Global State
let voices = [], recognition, isRecording = false;
let currentUser = null;
let authToken = null;
let lastFinalTranscript = '';

// --- Authentication Functions ---
function checkAuth() {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
        authToken = token;
        currentUser = JSON.parse(userData);
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    currentUser = null;
    authToken = null;

    // Hide main app and show login
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');

    // Load login page
    initLoginPage();
}

function updateUserProfile() {
    if (currentUser) {
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
        document.getElementById('streak-counter').textContent = `${currentUser.streak || 0} Day${(currentUser.streak || 0) === 1 ? '' : 's'}`;
    }
}



// --- Gemini Helpers ---
function parseGeminiJsonResponse(rawText) {
    if (!rawText || typeof rawText !== 'string') return null;
    const candidates = new Set();

    const trimmed = rawText.trim();
    if (trimmed) candidates.add(trimmed);

    const codeBlockMatch = trimmed.match(/```(?:json)?([\s\S]*?)```/i);
    if (codeBlockMatch && codeBlockMatch[1]) {
        candidates.add(codeBlockMatch[1].trim());
    }

    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        candidates.add(trimmed.slice(firstBrace, lastBrace + 1));
    }

    for (const candidate of candidates) {
        try {
            return JSON.parse(candidate);
        } catch {
            // Try the next candidate
        }
    }
    return null;
}

// --- Gemini API ---
async function callGeminiAPI(prompt, isJson = false, maxRetries = 3) {
    if (!authToken) {
        return isJson ? { error: "Authentication required." } : "Please log in to use AI features.";
    }

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    if (isJson) {
        payload.generationConfig = { responseMimeType: "application/json" };
    }

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });

            if (response.status === 401 || response.status === 403) {
                // Token expired or invalid, logout
                logout();
                return isJson ? { error: "Session expired. Please log in again." } : "Session expired. Please log in again.";
            }

            if (response.status === 429 || response.status >= 500) {
                if (attempt === maxRetries - 1) {
                    throw new Error(`API call failed after ${maxRetries} attempts with status: ${response.status}`);
                }
                const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                if (isJson) {
                    const parsed = parseGeminiJsonResponse(text);
                    if (parsed) return parsed;
                    throw new Error("Gemini response was not valid JSON");
                }
                return text;
            } else {
                throw new Error("Invalid response structure from Gemini API");
            }
        } catch (error) {
            if (attempt === maxRetries - 1) {
                console.error("Gemini API call failed:", error);
                return isJson ? { error: "AI analysis unavailable." } : "Sorry, AI is unavailable.";
            }
        }
    }
}

// --- App Initialization & Page Loading ---
const loginPage = document.getElementById('login-page');
const appContainer = document.getElementById('app-container');
const navLinks = document.querySelectorAll('.nav-link');
const pillNavIndicator = document.getElementById('pill-nav-indicator');
const pageContent = document.getElementById('page-content');
const subtitleText = document.getElementById('subtitle-text');

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();

    // Add keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + D)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Check authentication
    if (checkAuth()) {
        // User is logged in, show main app
        loginPage.classList.add('hidden');
        appContainer.classList.remove('hidden');
        updateUserProfile();
        showPage('home');
        updateStreak();
    } else {
        // User not logged in, check for reset password page
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('page') === 'reset-password') {
            initResetPasswordPage();
        } else {
            // Otherwise, show login page
            initLoginPage();
        }
    }

    // Setup navigation
    navLinks.forEach(link => link.addEventListener('click', () => showPage(link.dataset.page)));
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-link.active');
        if (currentActive) updatePillNavIndicator(currentActive);
    });

    // Setup logout
    document.getElementById('logout-btn')?.addEventListener('click', logout);

    // Setup mobile menu
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('opacity-0');
        overlay.classList.toggle('pointer-events-none');
    });

    document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        overlay.classList.add('pointer-events-none');
    });

    if (!setupSpeechAPIs()) {
        document.body.innerHTML = '<h1>Speech Recognition and Synthesis are not supported in this browser. Please use Google Chrome.</h1>';
    }
});


function showPage(pageId) {
    if(isRecording) {
        recognition.stop();
    }

    navLinks.forEach(l => l.classList.toggle('active', l.dataset.page === pageId));
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    updatePillNavIndicator(activeLink);

    // Update page title
    const pageTitles = {
        'home': 'Dashboard',
        'practice': 'Practice',
        'roleplay': 'Roleplay',
        'customPractice': 'Custom Practice',
        'accent': 'Voice Clone',
        'games': 'Games',
        'exam': 'Exam',
        'charts': 'Analytics',
        'scanner': 'Scanner',
        'settings': 'Settings'
    };
    document.getElementById('page-title').textContent = pageTitles[pageId] || 'PronouncePro';

    // This object maps a pageId to the function that initializes it.
    const pageInitializers = {
        'home': initHomePage,
        'practice': initPracticePage,
        'roleplay': initRoleplayPage,
        'customPractice': initCustomPracticePage,
        'accent': initAccentPage,
        'games': initGamesPage,
        'scanner': initScannerPage,
        'exam': initExamPage,
        'charts': initChartsPage,
        'settings': initSettingsPage,
    };
    if (pageInitializers[pageId]) {
        // Clear previous page content before loading new content
        pageContent.innerHTML = '';
        pageInitializers[pageId]();
    }
}

function updatePillNavIndicator(activeLink) {
    if (!pillNavIndicator || !activeLink) return;
    const offsetTop = activeLink.offsetTop;
    const height = activeLink.offsetHeight;
    pillNavIndicator.style.transform = `translateY(${offsetTop}px)`;
    pillNavIndicator.style.height = `${height}px`;
}

// --- Shared Data & Functions ---
const phrases = {
    "en-US": {
        easy: ["Hello, how are you?", "My name is Alex.", "This is a big city."],
        medium: ["The quick brown fox jumps over the lazy dog.", "She sells seashells by the seashore.", "I would like to order a coffee, please."],
        hard: ["She enthusiastically articulated the intricate architectural schematics.", "The juxtaposition of vibrant colors was visually stunning.", "He was a connoisseur of rare and exotic wines."]
    },
    "es-ES": {
        easy: ["Hola, ¿cómo estás?", "Me llamo Alex.", "Esta es una ciudad grande."],
        medium: ["El rápido zorro marrón salta sobre el perro perezoso.", "Tres tristes tigres comían trigo en un trigal.", "Quisiera pedir un café, por favor."],
        hard: ["El otorrinolaringólogo trabaja en el paralelepípedo.", "Es un esternocleidomastoideo.", "Desafortunadamente, el desarrollo fue interrumpido."]
    },
    "fr-FR": {
        easy: ["Bonjour, comment ça va?", "Je m'appelle Alex.", "C'est une grande ville."],
        medium: ["Le renard brun et rapide saute par-dessus le chien paresseux.", "Je voudrais un croissant, s'il vous plaît.", "Les chaussettes de l'archiduchesse sont-elles sèches ?"],
        hard: ["Je suis un anticonstitutionnaliste.", "L'hippopotame est un animal amphibie.", "Votre bienveillance est grandement appréciée."]
    },
    "hi-IN": {
        easy: ["नमस्ते, आप कैसे हैं?", "मेरा नाम एआई है।", "यह एक सुंदर दिन है।"],
        medium: ["भारत एक विविधताओं का देश है।", "मैं हिंदी सीख रहा हूँ।", "कृपया धीरे बोलिए।"],
        hard: ["विश्वविद्यालय में अनेक छात्र पढ़ते हैं।", "यह एक अत्यंत महत्वपूर्ण विषय है।", "सांस्कृतिक विरासत का संरक्षण आवश्यक है।"]
    },
    "kn-IN": {
        easy: ["ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಾ?", "ನನ್ನ ಹೆಸರು ಎಐ.", "ಇದು ಒಂದು ಸುಂದರ ದಿನ."],
        medium: ["ಕರ್ನಾಟಕ ಒಂದು ಸುಂದರ ರಾಜ್ಯ.", "ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ.", "ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ."],
        hard: ["ವಿಶ್ವವಿದ್ಯಾನಿಲಯದಲ್ಲಿ ಅನೇಕ ವಿದ್ಯಾರ್ಥಿಗಳಿದ್ದಾರೆ.", "ಇದು ಅತ್ಯಂತ ಪ್ರಮುಖ ವಿಷಯವಾಗಿದೆ.", "ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ ಅವಶ್ಯಕ."]
    },
    "ta-IN": {
        easy: ["வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?", "என் பெயர் AI.", "இது ஒரு அழகான நாள்."],
        medium: ["தமிழ் ஒரு பழமையான மொழி.", "நான் தமிழ் கற்கிறேன்.", "தயவுசெய்து மெதுவாக பேசுங்கள்."],
        hard: ["பல்கலைக்கழகத்தில் பல மாணவர்கள் படிக்கின்றனர்.", "இது மிகவும் முக்கியமான விஷயம்.", "கலாச்சார பாரம்பரியத்தை பாதுகாப்பது அவசியம்."]
    },
    "te-IN": {
        easy: ["నమస్కారం, మీరు ఎలా ఉన్నారు?", "నా పేరు AI.", "ఇది ఒక అందమైన రోజు."],
        medium: ["భారతదేశం ఒక గొప్ప దేశం.", "నేను తెలుగు నేర్చుకుంటున్నాను.", "దయచేసి నెమ్మదిగా మాట్లాడండి."],
        hard: ["విశ్వవిద్యాలయంలో చాలా మంది విద్యార్థులు ఉన్నారు.", "ఇది చాలా ముఖ్యమైన విషయం.", "సాంస్కృతిక వారసత్వాన్ని కాపాడటం అవసరం."]
    }
};
const languages = {
    "en-US": "English (US)", "es-ES": "Spanish (Spain)", "fr-FR": "French (France)",
    "hi-IN": "Hindi (India)", "kn-IN": "Kannada (India)", "ta-IN": "Tamil (India)", "te-IN": "Telugu (India)"
};

let finalTranscriptCallback = null;
let interimTranscriptCallback = null;

function setFinalTranscriptCallback(callback) {
    finalTranscriptCallback = callback;
}

function setInterimTranscriptCallback(callback) {
    interimTranscriptCallback = callback;
}

function setupSpeechAPIs() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    if (!SpeechRecognition || !speechSynthesis) return false;

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        isRecording = true;
        const activeRecordBtn = pageContent.querySelector('button[id*="-record"]');
        if(activeRecordBtn) activeRecordBtn.classList.add('recording');
    };

    recognition.onresult = (event) => {
        let interim_transcript = '';
        let final_transcript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }

        subtitleText.textContent = interim_transcript;

        if (interim_transcript && interimTranscriptCallback) {
            interimTranscriptCallback(interim_transcript.trim());
        }

        if (final_transcript && finalTranscriptCallback) {
            lastFinalTranscript = final_transcript.trim();
            finalTranscriptCallback(lastFinalTranscript);
            finalTranscriptCallback = null;
        }
    };

    recognition.onend = () => {
        isRecording = false;
        const activeRecordBtn = pageContent.querySelector('button[id*="-record"]');
        if(activeRecordBtn) activeRecordBtn.classList.remove('recording');

        if (finalTranscriptCallback) {
            finalTranscriptCallback(lastFinalTranscript || subtitleText.textContent.trim());
        }
        finalTranscriptCallback = null;
        subtitleText.textContent = '';
        lastFinalTranscript = '';
    };

    speechSynthesis.onvoiceschanged = () => { voices = speechSynthesis.getVoices(); };
    voices = speechSynthesis.getVoices();
    return true;
}

async function saveResult(language, score, feedback) {
    if (!currentUser || !authToken) return;

    try {
        const response = await fetch('http://localhost:3000/api/user/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ language, score, feedback })
        });

        if (response.ok) {
            // Update local user data
            const userResponse = await fetch('http://localhost:3000/api/user/profile', {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (userResponse.ok) {
                const userData = await userResponse.json();
                currentUser = userData;
                localStorage.setItem('userData', JSON.stringify(userData));
                updateUserProfile();
            }
        }
    } catch (error) {
        console.error('Failed to save progress:', error);
        // Fallback to local storage
        const data = JSON.parse(localStorage.getItem('pronunciationData')) || {};
        if (!data[language]) data[language] = [];
        data[language].push({ score, date: new Date().toISOString() });
        localStorage.setItem('pronunciationData', JSON.stringify(data));
    }
}

function updateStreak() {
    if (currentUser) {
        document.getElementById('streak-counter').textContent = `${currentUser.streak || 0} Day${(currentUser.streak || 0) === 1 ? '' : 's'}`;
    } else {
        const streakData = JSON.parse(localStorage.getItem('streakData')) || { count: 0, lastVisit: null };
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (streakData.lastVisit !== today) {
            if (streakData.lastVisit === yesterday) streakData.count++;
            else streakData.count = 1;
            streakData.lastVisit = today;
            localStorage.setItem('streakData', JSON.stringify(streakData));
        }
        document.getElementById('streak-counter').textContent = `${streakData.count} Day${streakData.count === 1 ? '' : 's'}`;
    }
}

// Theme toggle function
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    // Update theme toggle icon in main nav
    const themeToggle = document.getElementById('theme-toggle-main');
    if (themeToggle) {
        const icon = themeToggle.querySelector('svg');
        if (icon) {
            icon.innerHTML = isDark ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>` : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>`;
        }
    }

    // Update theme toggle UI in settings page
    const settingsThemeToggle = document.getElementById('theme-toggle-settings');
    if (settingsThemeToggle) {
        const themeSwitch = document.getElementById('theme-toggle-switch');
        const currentThemeText = document.getElementById('current-theme');
        currentThemeText.textContent = isDark ? 'Light' : 'Dark';
        themeSwitch.classList.toggle('translate-x-6', !isDark);
        themeSwitch.classList.toggle('translate-x-1', isDark);
        settingsThemeToggle.classList.toggle('bg-indigo-600', !isDark);
        settingsThemeToggle.classList.toggle('bg-gray-200', isDark);
        settingsThemeToggle.classList.toggle('dark:bg-gray-700', isDark);
    }
}

// Initialize theme on load
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}
