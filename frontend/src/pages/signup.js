function initSignupPage() {
    const authContainer = document.getElementById('auth-container');
    authContainer.innerHTML = `
        <div class="dashboard-container">
            <!-- Header -->
            <div class="glass-card animated-card" style="text-align: center; margin-bottom: 2rem;">
                <h1 class="animated-text" style="background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 2.5rem;">🚀 Join the Journey</h1>
                <p class="animated-subtitle" style="color: #666; margin-top: 0.5rem;">Start your pronunciation mastery adventure today</p>
            </div>

            <!-- Signup Form -->
            <div class="glass-card animated-card" style="width: 100%; margin: 0 auto;">
                <form id="signup-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <!-- Name Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">Full Name</label>
                        <div style="position: relative;">
                            <input
                                type="text"
                                id="signup-name"
                                required
                                style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem; transition: all 0.3s ease;"
                                placeholder="Enter your full name"
                            >
                            <div style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: #999;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Email Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">Email Address</label>
                        <div style="position: relative;">
                            <input
                                type="email"
                                id="signup-email"
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
                        <div id="email-exists-error" style="display: none; color: red; font-size: 0.9rem;">Email already exists. Please use a different email.</div>
                    </div>

                    <!-- Password Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">Password</label>
                        <div style="position: relative;">
                            <input
                                type="password"
                                id="signup-password"
                                required
                                minlength="6"
                                style="width: 100%; padding: 0.75rem 3rem 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem; transition: all 0.3s ease;"
                                placeholder="Create a password (min 6 characters)"
                            >
                            <button
                                type="button"
                                id="toggle-signup-password"
                                style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: #999; cursor: pointer; padding: 0.25rem;"
                            >
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </button>
                        </div>
                        <!-- Password Strength Indicator -->
                        <div style="margin-top: 0.5rem;">
                            <div style="display: flex; gap: 0.25rem;">
                                <div id="strength-1" style="height: 4px; width: 25%; background: #e5e7eb; border-radius: 2px; transition: all 0.3s ease;"></div>
                                <div id="strength-2" style="height: 4px; width: 25%; background: #e5e7eb; border-radius: 2px; transition: all 0.3s ease;"></div>
                                <div id="strength-3" style="height: 4px; width: 25%; background: #e5e7eb; border-radius: 2px; transition: all 0.3s ease;"></div>
                                <div id="strength-4" style="height: 4px; width: 25%; background: #e5e7eb; border-radius: 2px; transition: all 0.3s ease;"></div>
                            </div>
                            <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;" id="strength-text">Password strength</p>
                        </div>
                    </div>

                    <!-- Confirm Password Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">Confirm Password</label>
                        <div style="position: relative;">
                            <input
                                type="password"
                                id="signup-confirm-password"
                                required
                                style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem; transition: all 0.3s ease;"
                                placeholder="Confirm your password"
                            >
                            <div style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: #999;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Terms Agreement -->
                    <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
                        <input
                            type="checkbox"
                            id="agree-terms"
                            required
                            style="width: 1rem; height: 1rem; accent-color: #764ba2; margin-top: 0.125rem;"
                        >
                        <label for="agree-terms" style="font-size: 0.9rem; color: #666; line-height: 1.4;">
                            I agree to the
                            <a href="#" style="color: #764ba2; text-decoration: none; font-weight: 500;">Terms of Service</a>
                            and
                            <a href="#" style="color: #764ba2; text-decoration: none; font-weight: 500;">Privacy Policy</a>
                        </label>
                    </div>

                    <!-- Error Message -->
                    <div id="signup-error" style="display: none; background: #fee2e2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem; color: #dc2626; font-size: 0.9rem;">
                        <span id="signup-error-text"></span>
                    </div>

                    <!-- Signup Button -->
                    <button
                        type="submit"
                        id="signup-btn"
                        style="width: 100%; padding: 0.75rem 1rem; background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                        Create Account
                    </button>
                </form>

                <!-- Divider -->
                <div style="margin: 2rem 0; position: relative;">
                    <div style="border-top: 1px solid #e5e7eb;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.9); padding: 0 1rem; color: #6b7280; font-size: 0.9rem;">Already have an account?</div>
                </div>

                <!-- Sign In Link -->
                <button
                    id="switch-to-login"
                    style="width: 100%; padding: 0.75rem 1rem; background: rgba(255,255,255,0.8); color: #333; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                >
                    Sign In Instead
                </button>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 2rem; color: #666; font-size: 0.9rem;">
                Join thousands of learners improving their pronunciation skills
            </div>
        </div>
    `;

    // Add event listeners
    setupSignupEventListeners();
}

function setupSignupEventListeners() {
    const signupForm = document.getElementById('signup-form');
    const togglePassword = document.getElementById('toggle-signup-password');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const switchToLogin = document.getElementById('switch-to-login');

    // Password strength indicator
    passwordInput.addEventListener('input', () => {
        updatePasswordStrength(passwordInput.value);
    });

    // Password confirmation validation
    confirmPasswordInput.addEventListener('input', () => {
        validatePasswordMatch();
    });

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
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const signupBtn = document.getElementById('signup-btn');
        const errorDiv = document.getElementById('signup-error');
        const errorText = document.getElementById('signup-error-text');

        // Validate passwords match
        if (password !== confirmPassword) {
            errorText.textContent = 'Passwords do not match';
            errorDiv.classList.remove('hidden');
            return;
        }

        // Show loading state
        signupBtn.disabled = true;
        signupBtn.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
            </span>
        `;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));

                // Update global variables
                authToken = data.token;
                currentUser = data.user;

                // Hide signup page and show the main app
                document.getElementById('login-page').classList.add('hidden');
                document.getElementById('app-container').classList.remove('hidden');
                showPage('home');
            } else {
                const emailErrorDiv = document.getElementById('email-exists-error');
                if (response.status === 409) {
                    emailErrorDiv.style.display = 'block';
                    errorDiv.style.display = 'none';
                } else {
                    emailErrorDiv.style.display = 'none';
                    errorText.textContent = data.error || 'Registration failed';
                    errorDiv.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            errorText.textContent = 'Network error. Please try again.';
            errorDiv.classList.remove('hidden');
        } finally {
            // Reset button
            signupBtn.disabled = false;
            signupBtn.innerHTML = `
                <span class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                    Create Account
                </span>
            `;
        }
    });

    // Switch to login
    switchToLogin.addEventListener('click', () => {
        initLoginPage();
    });
}

function updatePasswordStrength(password) {
    const strengthBars = ['strength-1', 'strength-2', 'strength-3', 'strength-4'];
    const strengthText = document.getElementById('strength-text');

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    // Update bars
    strengthBars.forEach((barId, index) => {
        const bar = document.getElementById(barId);
        if (index < strength) {
            bar.className = `h-1 w-1/4 rounded-full transition-colors duration-200 ${
                strength === 1 ? 'bg-red-400' :
                strength === 2 ? 'bg-yellow-400' :
                strength === 3 ? 'bg-blue-400' :
                'bg-green-400'
            }`;
        } else {
            bar.className = 'h-1 w-1/4 bg-gray-200 rounded-full transition-colors duration-200';
        }
    });

    // Update text
    const texts = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
    strengthText.textContent = texts[strength] || 'Password strength';
    strengthText.className = `text-xs mt-1 ${
        strength === 1 ? 'text-red-500' :
        strength === 2 ? 'text-yellow-500' :
        strength === 3 ? 'text-blue-500' :
        strength >= 4 ? 'text-green-500' :
        'text-gray-500 dark:text-gray-400'
    }`;
}

function validatePasswordMatch() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const confirmInput = document.getElementById('signup-confirm-password');

    if (confirmPassword && password !== confirmPassword) {
        confirmInput.classList.add('border-red-500', 'focus:ring-red-500');
        confirmInput.classList.remove('border-gray-300', 'dark:border-gray-600', 'focus:ring-purple-500');
    } else {
        confirmInput.classList.remove('border-red-500', 'focus:ring-red-500');
        confirmInput.classList.add('border-gray-300', 'dark:border-gray-600', 'focus:ring-purple-500');
    }
}
. border-radius: 2px; transition: all 0.3s ease;"></div>
                            </div>
                            <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;" id="strength-text">Password strength</p>
                        </div>
                    </div>

                    <!-- Confirm Password Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">Confirm Password</label>
                        <div style="position: relative;">
                            <input
                                type="password"
                                id="signup-confirm-password"
                                required
                                style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem; transition: all 0.3s ease;"
                                placeholder="Confirm your password"
                            >
                            <div style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: #999;">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Terms Agreement -->
                    <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
                        <input
                            type="checkbox"
                            id="agree-terms"
                            required
                            style="width: 1rem; height: 1rem; accent-color: #764ba2; margin-top: 0.125rem;"
                        >
                        <label for="agree-terms" style="font-size: 0.9rem; color: #666; line-height: 1.4;">
                            I agree to the
                            <a href="#" style="color: #764ba2; text-decoration: none; font-weight: 500;">Terms of Service</a>
                            and
                            <a href="#" style="color: #764ba2; text-decoration: none; font-weight: 500;">Privacy Policy</a>
                        </label>
                    </div>

                    <!-- Error Message -->
                    <div id="signup-error" style="display: none; background: #fee2e2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem; color: #dc2626; font-size: 0.9rem;">
                        <span id="signup-error-text"></span>
                    </div>

                    <!-- Signup Button -->
                    <button
                        type="submit"
                        id="signup-btn"
                        style="width: 100%; padding: 0.75rem 1rem; background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem;"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                        Create Account
                    </button>
                </form>

                <!-- Divider -->
                <div style="margin: 2rem 0; position: relative;">
                    <div style="border-top: 1px solid #e5e7eb;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.9); padding: 0 1rem; color: #6b7280; font-size: 0.9rem;">Already have an account?</div>
                </div>

                <!-- Sign In Link -->
                <button
                    id="switch-to-login"
                    style="width: 100%; padding: 0.75rem 1rem; background: rgba(255,255,255,0.8); color: #333; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                >
                    Sign In Instead
                </button>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 2rem; color: #666; font-size: 0.9rem;">
                Join thousands of learners improving their pronunciation skills
            </div>
        </div>
    `;

    // Add event listeners
    setupSignupEventListeners();
}

function setupSignupEventListeners() {
    const signupForm = document.getElementById('signup-form');
    const togglePassword = document.getElementById('toggle-signup-password');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const switchToLogin = document.getElementById('switch-to-login');

    // Password strength indicator
    passwordInput.addEventListener('input', () => {
        updatePasswordStrength(passwordInput.value);
    });

    // Password confirmation validation
    confirmPasswordInput.addEventListener('input', () => {
        validatePasswordMatch();
    });

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
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const signupBtn = document.getElementById('signup-btn');
        const errorDiv = document.getElementById('signup-error');
        const errorText = document.getElementById('signup-error-text');

        // Validate passwords match
        if (password !== confirmPassword) {
            errorText.textContent = 'Passwords do not match';
            errorDiv.classList.remove('hidden');
            return;
        }

        // Show loading state
        signupBtn.disabled = true;
        signupBtn.innerHTML = `
            <span class="flex items-center justify-center">
                <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
            </span>
        `;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));

                // Update global variables
                authToken = data.token;
                currentUser = data.user;

                // Hide signup page and show the main app
                document.getElementById('login-page').classList.add('hidden');
                document.getElementById('app-container').classList.remove('hidden');
                showPage('home');
            } else {
                const emailErrorDiv = document.getElementById('email-exists-error');
                if (response.status === 409) {
                    emailErrorDiv.style.display = 'block';
                    errorDiv.style.display = 'none';
                } else {
                    emailErrorDiv.style.display = 'none';
                    errorText.textContent = data.error || 'Registration failed';
                    errorDiv.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            errorText.textContent = 'Network error. Please try again.';
            errorDiv.classList.remove('hidden');
        } finally {
            // Reset button
            signupBtn.disabled = false;
            signupBtn.innerHTML = `
                <span class="flex items-center justify-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                    Create Account
                </span>
            `;
        }
    });

    // Switch to login
    switchToLogin.addEventListener('click', () => {
        initLoginPage();
    });
}

function updatePasswordStrength(password) {
    const strengthBars = ['strength-1', 'strength-2', 'strength-3', 'strength-4'];
    const strengthText = document.getElementById('strength-text');

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    // Update bars
    strengthBars.forEach((barId, index) => {
        const bar = document.getElementById(barId);
        if (index < strength) {
            bar.className = `h-1 w-1/4 rounded-full transition-colors duration-200 ${
                strength === 1 ? 'bg-red-400' :
                strength === 2 ? 'bg-yellow-400' :
                strength === 3 ? 'bg-blue-400' :
                'bg-green-400'
            }`;
        } else {
            bar.className = 'h-1 w-1/4 bg-gray-200 rounded-full transition-colors duration-200';
        }
    });

    // Update text
    const texts = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
    strengthText.textContent = texts[strength] || 'Password strength';
    strengthText.className = `text-xs mt-1 ${
        strength === 1 ? 'text-red-500' :
        strength === 2 ? 'text-yellow-500' :
        strength === 3 ? 'text-blue-500' :
        strength >= 4 ? 'text-green-500' :
        'text-gray-500 dark:text-gray-400'
    }`;
}

function validatePasswordMatch() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const confirmInput = document.getElementById('signup-confirm-password');

    if (confirmPassword && password !== confirmPassword) {
        confirmInput.classList.add('border-red-500', 'focus:ring-red-500');
        confirmInput.classList.remove('border-gray-300', 'dark:border-gray-600', 'focus:ring-purple-500');
    } else {
        confirmInput.classList.remove('border-red-500', 'focus:ring-red-500');
        confirmInput.classList.add('border-gray-300', 'dark:border-gray-600', 'focus:ring-purple-500');
    }
}
