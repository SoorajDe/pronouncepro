// --- Settings Page ---
function initSettingsPage() {
    const content = `
        <div class="max-w-4xl mx-auto space-y-8">
            <!-- Page Header -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
                <p class="text-gray-600 dark:text-gray-400">Customize your PronouncePro experience</p>
            </div>

            <!-- Appearance Settings -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="font-medium text-gray-900 dark:text-white">Theme</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <span class="text-sm text-gray-600 dark:text-gray-400" id="current-theme">Light</span>
                            <button id="theme-toggle-settings" class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span id="theme-toggle-switch" class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${document.documentElement.classList.contains('dark') ? 'translate-x-6' : 'translate-x-1'}"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Account Settings -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account</h3>
                <form id="change-password-form" class="space-y-4">
                    <div>
                        <label for="current-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                        <input type="password" id="current-password" name="current-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                    </div>
                    <div>
                        <label for="new-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                        <input type="password" id="new-password" name="new-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                    </div>
                    <div>
                        <label for="confirm-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                    </div>
                    <div id="password-feedback" class="text-sm"></div>
                    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Save Changes</button>
                </form>
            </div>


            <!-- Language Settings -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Language & Region</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4 class="font-medium text-gray-900 dark:text-white">Default Language</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Select your primary language for practice</p>
                        </div>
                        <select id="default-language" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="en-US">English (US)</option>
                            <option value="es-ES">Spanish (Spain)</option>
                            <option value="fr-FR">French (France)</option>
                            <option value="hi-IN">Hindi (India)</option>
                            <option value="kn-IN">Kannada (India)</option>
                            <option value="ta-IN">Tamil (India)</option>
                            <option value="te-IN">Telugu (India)</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Notifications Settings -->
            <div class="glass-card p-8 space-y-6">
                <!-- Header with Icon -->
                <div class="flex items-center space-x-4 mb-6">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12.21-7.493 7.49-14.272L5.64 7.227a7.964 7.964 0 01-.772 5.456zM8.427 3.525l.496-.496a1.5 1.5 0 012.122 0l.495.496M15 17h5l-5 5v-5z"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Notifications</h3>
                        <p class="text-gray-600 dark:text-gray-400">Stay connected with your learning journey</p>
                    </div>
                </div>

                <div class="grid gap-6">
                    <!-- Practice Reminders Card -->
                    <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/30 hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                        <div class="flex items-start justify-between">
                            <div class="flex items-start space-x-4">
                                <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-900 dark:text-white text-lg">Daily Practice Reminders</h4>
                                    <p class="text-gray-600 dark:text-gray-400 mt-1">Get gentle nudges to maintain your learning streak</p>
                                    <div class="flex items-center mt-3 space-x-2">
                                        <div class="flex space-x-1">
                                            <div class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                                            <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
                                            <div class="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
                                        </div>
                                        <span class="text-xs text-gray-500 dark:text-gray-500">Recommended for best results</span>
                                    </div>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="practice-reminders" class="sr-only peer">
                                <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-600 shadow-lg"></div>
                            </label>
                        </div>
                    </div>

                    <!-- Achievement Notifications Card -->
                    <div class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/30 hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                        <div class="flex items-start justify-between">
                            <div class="flex items-start space-x-4">
                                <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-900 dark:text-white text-lg">Achievement Celebrations</h4>
                                    <p class="text-gray-600 dark:text-gray-400 mt-1">Celebrate milestones and unlock new levels</p>
                                    <div class="flex items-center mt-3 space-x-2">
                                        <div class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                            </svg>
                                            Most Popular
                                        </div>
                                        <span class="text-xs text-gray-500 dark:text-gray-500">Motivates continued progress</span>
                                    </div>
                                </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="achievement-notifications" class="sr-only peer" checked>
                                <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-600 shadow-lg"></div>
                            </label>
                        </div>
                    </div>

                    <!-- Notification Preview -->
                    <div class="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-8 h-8 bg-gradient-to-br from-gray-600 to-slate-700 rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12.21-7.493 7.49-14.272L5.64 7.227a7.964 7.964 0 01-.772 5.456z"></path>
                                </svg>
                            </div>
                            <h4 class="font-semibold text-gray-900 dark:text-white">Preview</h4>
                        </div>
                        <div class="space-y-3">
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                                <div class="flex items-start space-x-3">
                                    <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">Time for your daily practice! 🎯</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep your streak going • 2 min ago</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                                <div class="flex items-start space-x-3">
                                    <div class="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white">🎉 New achievement unlocked: Pronunciation Pro!</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">You've completed 50 practice sessions • 1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Data & Privacy -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Data & Privacy</h3>
                <div class="space-y-4">
                    <button id="clear-data-btn" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Clear All Data
                    </button>
                    <p class="text-sm text-gray-600 dark:text-gray-400">This will permanently delete all your practice history and settings.</p>
                </div>
            </div>
        </div>
    `;

    pageContent.innerHTML = content;

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle-settings');
    const themeSwitch = document.getElementById('theme-toggle-switch');
    const currentThemeText = document.getElementById('current-theme');

    function updateThemeUI() {
        const isDark = document.documentElement.classList.contains('dark');
        currentThemeText.textContent = isDark ? 'Dark' : 'Light';
        themeSwitch.classList.toggle('translate-x-6', isDark);
        themeSwitch.classList.toggle('translate-x-1', !isDark);
        themeToggle.classList.toggle('bg-indigo-600', isDark);
        themeToggle.classList.toggle('bg-gray-200', !isDark);
        themeToggle.classList.toggle('dark:bg-gray-700', !isDark);
    }

    updateThemeUI();

    themeToggle.addEventListener('click', () => {
        toggleTheme();
        updateThemeUI();
    });

    // Load saved settings
    const savedLanguage = localStorage.getItem('defaultLanguage') || 'en-US';
    document.getElementById('default-language').value = savedLanguage;

    const practiceReminders = localStorage.getItem('practiceReminders') === 'true';
    document.getElementById('practice-reminders').checked = practiceReminders;

    const achievementNotifications = localStorage.getItem('achievementNotifications') !== 'false'; // Default true
    document.getElementById('achievement-notifications').checked = achievementNotifications;

    // Save settings on change
    document.getElementById('default-language').addEventListener('change', (e) => {
        localStorage.setItem('defaultLanguage', e.target.value);
    });

    document.getElementById('practice-reminders').addEventListener('change', (e) => {
        localStorage.setItem('practiceReminders', e.target.checked);
    });

    document.getElementById('achievement-notifications').addEventListener('change', (e) => {
        localStorage.setItem('achievementNotifications', e.target.checked);
    });

    // Clear data functionality
    document.getElementById('clear-data-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            localStorage.clear();
            location.reload();
        }
    });

    // Change Password functionality
    const changePasswordForm = document.getElementById('change-password-form');
    const passwordFeedback = document.getElementById('password-feedback');

    changePasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            passwordFeedback.textContent = 'New passwords do not match.';
            passwordFeedback.className = 'text-red-500';
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            // Handle not logged in
            passwordFeedback.textContent = 'You are not logged in.';
            passwordFeedback.className = 'text-red-500';
            return;
        }

        try {
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                passwordFeedback.textContent = 'Password changed successfully.';
                passwordFeedback.className = 'text-green-500';
                changePasswordForm.reset();
            } else {
                passwordFeedback.textContent = data.error || 'Failed to change password.';
                passwordFeedback.className = 'text-red-500';
            }
        } catch (error) {
            console.error('Change password error:', error);
            passwordFeedback.textContent = 'An error occurred. Please try again.';
            passwordFeedback.className = 'text-red-500';
        }
    });
}
