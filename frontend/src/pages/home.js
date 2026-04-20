function initHomePage() {
    const pageContent = document.getElementById('page-content');
    const userName = currentUser ? currentUser.name : 'Guest';
    const userStreak = currentUser ? currentUser.streak || 0 : 0;

    pageContent.innerHTML = `<div class="dashboard-container">

    <div>
        <h1 class="animated-text">Welcome Back, ${userName}!</h1>
        <p class="animated-subtitle" style="color: #ccc; margin-top: -10px;">Ready to improve your pronunciation?</p>
    </div>

    <div class="glass-card animated-card">
        <h2 style="margin-top:0;"> Your Personalized Practice </h2>
        <p>To begin, let's focus on the <strong>'Z' sound</strong>. Try repeating: <em>'zoo', 'buzz', and 'fuzzy'</em>.</p>

        <button id="start-practice-btn" class="animated-button">
            Start Practice
        </button>
    </div>

    <div class="split-row">

        <div class="glass-card split-card animated-card">
            <h3>🏆 Achievements</h3>
            <p>🔥 <strong>Current Streak:</strong> ${userStreak} Days</p>
        </div>

        <div class="glass-card split-card animated-card">
            <h3>📊 Weekly Score</h3>
            <div class="animated-score" style="font-size: 2rem; font-weight: bold; color: #4facfe;">85%</div>
            <p style="font-size: 0.9rem; color: #aaa;">Top 10% of class</p>
        </div>

    </div>

</div>`;

    document.getElementById('start-practice-btn').addEventListener('click', () => {
        showPage('practice');
    });
}
