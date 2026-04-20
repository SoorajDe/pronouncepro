function initLoginPage() {
    const authContainer = document.getElementById('auth-container');
    authContainer.innerHTML = `
        <div class="dashboard-container">
            <!-- Header -->
            <div class="glass-card animated-card" style="text-align: center; margin-bottom: 2rem;">
                <h1 class="animated-text" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 2.5rem;">🔐 Welcome Back</h1>
                <p class="animated-subtitle" style="color: #666; margin-top: 0.5rem;">Continue your pronunciation mastery journey</p>
            </div>

            <!-- Login Form -->
            <div class="glass-card animated-card" style="width: 100%; margin: 0 auto;">
                <form id="login-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <!-- Email Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">Email Address</label>
                        <div style="position: relative;">
                            <input
                                type="email"
                                id="login-email"
                                required
                                style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem; transition: all 0.3s ease;"
                                placeholder="Enter your email"
                            >
                            <div style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: #999;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">Password</label>
                        <div style="position: relative;">
                            <input
                                type="password"
                                id="login-password"
                                required
                                style="width: 100%; padding: 0.75rem 3rem 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem; transition: all 0.3s ease;"
                                placeholder="Enter your password"
                            >
                            <button
                                type="button"
                                id="toggle-password"
                                style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: #999; cursor: pointer; padding: 0.25rem;"
                            >
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: #666;">
                            <input type="checkbox" style="width: 1rem; height: 1rem; accent-color: #667eea;">
                            Remember me
                        </label>
                        <a href="#" id="forgot-password-link" style="color: #667eea; text-decoration: none; font-size: 0.9rem; font-weight: 500;">Forgot password?</a>
                    </div>

                    <!-- Error Message -->
                    <div id="login-error" style="display: none; background: #fee2e2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem; color: #dc2626; font-size: 0.9rem;">
                        <span id="login-error-text"></span>
                    </div>

                    <!-- Login Button -->
                    <button
                        type="submit"
                        id="login-btn"
                        style="width: 100%; padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                        </svg>
                        Sign In
                    </button>
                </form>

                <!-- Divider -->
                <div style="margin: 2rem 0; position: relative;">
                    <div style="border-top: 1px solid #e5e7eb;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.9); padding: 0 1rem; color: #6b7280; font-size: 0.9rem;">Don't have an account?</div>
                </div>

                <!-- Sign Up Link -->
                <button
                    id="switch-to-signup"
                    style="width: 100%; padding: 0.75rem 1rem; background: rgba(255,255,255,0.8); color: #333; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                >
                    Create New Account
                </button>

                <!-- Guest Sign In -->
                <button
                    id="guest-signin"
                    style="width: 100%; margin-top: 1rem; padding: 0.75rem 1rem; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Continue as Guest
                </button>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 2rem; color: #666; font-size: 0.9rem;">
                By signing in, you agree to our
                <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">Terms of Service</a>
                and
                <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">Privacy Policy</a>
            </div>
        </div>

        <!-- Forgot Password Modal -->
        <div id="forgot-password-modal" class="hidden" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
            <div class="glass-card" style="width: 90%; max-width: 400px; padding: 2rem;">
                <h2 style="text-align: center; font-size: 1.5rem; margin-bottom: 1.5rem;">Forgot Password</h2>
                <form id="forgot-password-form">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                        <label for="forgot-email" style="font-weight: 500; color: #333; font-size: 0.9rem;">Email Address</label>
                        <input type="email" id="forgot-email" required style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem;">
                    </div>
                    <div id="forgot-password-feedback" class="text-sm" style="margin-bottom: 1rem;"></div>
                    <button type="submit" style="width: 100%; padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Send Reset Link</button>
                </form>
                <button id="close-modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: #666; cursor: pointer;">&times;</button>
            </div>
        </div>
    `;

    // Add event listeners
    setupLoginEventListeners();
}

function setupLoginEventListeners() {
    const loginForm = document.getElementById('login-form');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');
    const switchToSignup = document.getElementById('switch-to-signup');

    // Password toggle
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.innerHTML = type === 'password'
            ? `<svg class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
               </svg>`
            : `<svg class="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
               </svg>`;
    });

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const loginBtn = document.getElementById('login-btn');
        const errorDiv = document.getElementById('login-error');
        const errorText = document.getElementById('login-error-text');

        // Show loading state
        loginBtn.disabled = true;
        loginBtn.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
            </span>
        `;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));

                // Update global variables
                authToken = data.token;
                currentUser = data.user;

                // Update user profile display
                updateUserProfile();

                // Hide login page and show main app
                document.getElementById('login-page').classList.add('hidden');
                document.getElementById('app-container').classList.remove('hidden');

                // Load home page
                showPage('home');
            } else {
                // Show error
                errorText.textContent = data.error || 'Invalid email or password';
                errorDiv.style.display = 'block';
                // Highlight inputs in red
                document.getElementById('login-email').style.borderColor = '#dc2626';
                document.getElementById('login-password').style.borderColor = '#dc2626';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorText.textContent = 'Network error. Please try again.';
            errorDiv.style.display = 'block';
        } finally {
            // Reset button
            loginBtn.disabled = false;
            loginBtn.innerHTML = `
                <span class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    Sign In
                </span>
            `;
        }
    });

    // Switch to signup
    switchToSignup.addEventListener('click', () => {
        initSignupPage();
    });

    // Guest sign in
    const guestSignin = document.getElementById('guest-signin');
    guestSignin.addEventListener('click', () => {
        // Create guest user data
        const guestUser = {
            id: 'guest-' + Date.now(),
            name: 'Guest User',
            email: 'guest@example.com',
            isGuest: true
        };

        // Store guest data
        localStorage.setItem('authToken', 'guest-token');
        localStorage.setItem('userData', JSON.stringify(guestUser));

        // Hide login page and show main app
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('app-container').classList.remove('hidden');

        // Load home page
        showPage('home');
    });

    // Setup theme toggle for login page
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Reset input borders on input
    const emailInput = document.getElementById('login-email');
    emailInput.addEventListener('input', () => emailInput.style.borderColor = '#ddd');
    passwordInput.addEventListener('input', () => passwordInput.style.borderColor = '#ddd');

    // Forgot Password Modal
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const closeModal = document.getElementById('close-modal');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const forgotPasswordFeedback = document.getElementById('forgot-password-feedback');

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        forgotPasswordModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        forgotPasswordModal.classList.add('hidden');
    });

    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                forgotPasswordFeedback.textContent = 'If an account with that email exists, a password reset link has been sent.';
                forgotPasswordFeedback.className = 'text-green-500';
            } else {
                forgotPasswordFeedback.textContent = data.error || 'An error occurred.';
                forgotPasswordFeedback.className = 'text-red-500';
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            forgotPasswordFeedback.textContent = 'An error occurred. Please try again.';
            forgotPasswordFeedback.className = 'text-red-500';
        }
    });
}
