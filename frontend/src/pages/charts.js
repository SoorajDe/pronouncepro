function initChartsPage() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `<div class="space-y-6"><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"><h2 class="text-2xl font-bold mb-4">Your Progress</h2><select id="chart-lang" class="mt-1 block w-full sm:w-1/3 rounded-md dark:bg-gray-700 border-gray-300 dark:border-gray-600"></select><div class="mt-6"><canvas id="progress-chart"></canvas></div></div><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"><h2 class="text-2xl font-bold mb-4">My Weak Sounds</h2><div id="weak-sounds-list" class="space-y-2"></div></div></div>`;
    
    const chartLangSelect = document.getElementById('chart-lang');
    for (const code in languages) chartLangSelect.innerHTML += `<option value="${code}">${languages[code]}</option>`;
    let progressChart = null;

    function updateChart() {
        const lang = chartLangSelect.value;
        const data = JSON.parse(localStorage.getItem('pronunciationData')) || {};
        const langData = data[lang] || [];
        const labels = langData.map((d, i) => `A${i+1}`);
        const scores = langData.map(d => d.score);
        const ctx = document.getElementById('progress-chart').getContext('2d');
        if (progressChart) progressChart.destroy();
        progressChart = new Chart(ctx, { type: 'line', data: { labels, datasets: [{ label: `Scores`, data: scores, borderColor: '#4f46e5', tension: 0.3 }] }, options: { scales: { y: { beginAtZero: true, max: 100 } } } });
    }

    function updateWeakSounds() {
        const lang = chartLangSelect.value;
        const listEl = document.getElementById('weak-sounds-list');
        const weakSoundsData = JSON.parse(localStorage.getItem('weakSounds')) || {};
        const weakSounds = weakSoundsData[lang] || {};
        if(Object.keys(weakSounds).length === 0) { listEl.innerHTML = `<p class="text-gray-500">No weak sounds identified yet. Keep practicing!</p>`; return; }
        const sortedSounds = Object.entries(weakSounds).sort((a, b) => b[1] - a[1]);
        listEl.innerHTML = sortedSounds.map(([sound, count]) => `<div class="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"><div><span class="font-mono text-lg text-indigo-600 dark:text-indigo-400">/${sound}/</span><span class="text-sm text-gray-500 ml-4">${count} times flagged</span></div><button data-sound="${sound}" data-lang="${lang}" class="practice-sound-btn gemini-btn text-white text-sm font-semibold px-3 py-1 rounded-md">✨ Practice</button></div>`).join('');
        document.querySelectorAll('.practice-sound-btn').forEach(btn => btn.addEventListener('click', handlePracticeSound));
    }
    
    async function handlePracticeSound(event) {
        const sound = event.target.dataset.sound, lang = event.target.dataset.lang;
        const modal = document.getElementById('ai-tutor-modal');
        const modalContent = document.getElementById('modal-content');
        const modalTitle = document.getElementById('modal-title');
        
        modalTitle.textContent = `✨ AI Practice for /${sound}/ sound`;
        modalContent.innerHTML = `<p>AI is generating a custom lesson for you...</p>`;
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('.modal-container').classList.remove('scale-95');

        const prompt = `For a ${languages[lang]} learner struggling with the phoneme sound /${sound}/, provide: 1. A simple, one-sentence description of the mouth and tongue position in English. 2. Three short, simple practice sentences in ${languages[lang]} that feature this sound. Format the response as: Mouth Position: [description]\n\n1. [sentence1]\n2. [sentence2]\n3. [sentence3]`;
        const lesson = await callGeminiAPI(prompt);
        const [mouthPosition, ...sentences] = lesson.split('\n').filter(Boolean);
        modalContent.innerHTML = `<div class="p-2 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg mb-3">${mouthPosition}</div>` + sentences.map(s => `<p class="p-2 bg-gray-100 dark:bg-gray-700 rounded">${s.substring(s.indexOf(' ')+1)}</p>`).join('');
    }

    document.getElementById('close-modal-btn').addEventListener('click', () => {
        const modal = document.getElementById('ai-tutor-modal');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('.modal-container').classList.add('scale-95');
    });

    chartLangSelect.addEventListener('change', () => { updateChart(); updateWeakSounds(); });
    updateChart();
    updateWeakSounds();
}
