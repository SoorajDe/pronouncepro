function initResetPasswordPage() {
    const authContainer = document.getElementById('auth-container');
    authContainer.innerHTML = `
        <div class="dashboard-container">
            <!-- Header -->
            <div class="glass-card animated-card" style="text-align: center; margin-bottom: 2rem;">
                <h1 class="animated-text" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 2.5rem;">🔑 Set New Password</h1>
                <p class="animated-subtitle" style="color: #666; margin-top: 0.5rem;">Choose a new password for your account.</p>
            </div>

            <!-- Reset Password Form -->
            <div class="glass-card animated-card" style="width: 100%; margin: 0 auto;">
                <form id="reset-password-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <!-- New Password Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            required
                            style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem;"
                            placeholder="Enter your new password"
                        >
                    </div>

                    <!-- Confirm New Password Field -->
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label style="font-weight: 500; color: #333; font-size: 0.9rem;">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            required
                            style="width: 100%; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333; font-size: 1rem;"
                            placeholder="Confirm your new password"
                        >
                    </div>

                    <!-- Feedback Message -->
                    <div id="reset-feedback" style="display: none; border-radius: 8px; padding: 1rem; font-size: 0.9rem;">
                        <span id="reset-feedback-text"></span>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        id="reset-btn"
                        style="width: 100%; padding: 0.75rem 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    `;

    setupResetPasswordEventListeners();
}

function setupResetPasswordEventListeners() {
    const resetForm = document.getElementById('reset-password-form');

    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const feedbackDiv = document.getElementById('reset-feedback');
        const feedbackText = document.getElementById('reset-feedback-text');
        const resetButton = document.getElementById('reset-btn');

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        // Clear previous feedback
        feedbackDiv.style.display = 'none';
        feedbackText.textContent = '';

        if (newPassword !== confirmPassword) {
            feedbackText.textContent = 'Passwords do not match.';
            feedbackDiv.style.background = '#fee2e2';
            feedbackDiv.style.border = '1px solid #fecaca';
            feedbackDiv.style.color = '#dc2626';
            feedbackDiv.style.display = 'block';
            return;
        }

        if (!token) {
            feedbackText.textContent = 'No reset token found. Please check your reset link.';
            feedbackDiv.style.background = '#fee2e2';
            feedbackDiv.style.border = '1px solid #fecaca';
            feedbackDiv.style.color = '#dc2626';
            feedbackDiv.style.display = 'block';
            return;
        }

        resetButton.disabled = true;
        resetButton.textContent = 'Updating...';

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                feedbackText.textContent = data.message;
                feedbackDiv.style.background = '#d1fae5';
                feedbackDiv.style.border = '1px solid #a7f3d0';
                feedbackDiv.style.color = '#065f46';
                feedbackDiv.style.display = 'block';
                resetButton.style.display = 'none'; // Hide button on success

                // Redirect to login after a few seconds
                setTimeout(() => {
                    window.location.hash = '#login';
                    window.location.reload(); // Reload to re-initialize the app state
                }, 3000);

            } else {
                throw new Error(data.error || 'Failed to reset password.');
            }
        } catch (error) {
            feedbackText.textContent = error.message;
            feedbackDiv.style.background = '#fee2e2';
            feedbackDiv.style.border = '1px solid #fecaca';
            feedbackDiv.style.color = '#dc2626';
            feedbackDiv.style.display = 'block';
            resetButton.disabled = false;
            resetButton.textContent = 'Update Password';
        }
    });
}
