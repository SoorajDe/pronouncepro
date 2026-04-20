function initAccentPage() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `<div class="w-full max-w-3xl mx-auto space-y-6">
        <div class="glass-card">
            <h1 class="text-2xl font-bold mb-4">Clarity & Accent Training</h1>
            <p class="text-gray-500 mb-4">Select a training mode and a specific sound to practice with an AI-generated lesson.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label for="a-mode">Training Mode:</label><select id="a-mode" class="mt-1 w-full rounded-md dark:bg-gray-700"><option value="english">English Accents</option><option value="indian">Indian Language Clarity</option></select></div>
                <div id="a-selector-container"></div>
            </div>
        </div>
        <div class="glass-card">
            <h2 class="text-xl font-bold mb-2">AI Curriculum</h2>
            <div id="a-differences" class="space-y-2">Select a mode to begin.</div>
        </div>
        <div id="a-lesson-container" class="hidden glass-card space-y-4"></div>
    </div>`;
    
    const modeSelect = document.getElementById('a-mode');
    const selectorContainer = document.getElementById('a-selector-container');
    const differencesEl = document.getElementById('a-differences');
    const lessonContainer = document.getElementById('a-lesson-container');

    function renderSelectors() {
        const mode = modeSelect.value;
        if (mode === 'english') {
            selectorContainer.innerHTML = `<div><label for="a-accent">Target Accent:</label><select id="a-accent" class="mt-1 w-full rounded-md dark:bg-gray-700"><option value="General American">General American</option><option value="British English">British English</option></select></div>`;
            document.getElementById('a-accent').addEventListener('change', loadCurriculum);
        } else {
            selectorContainer.innerHTML = `<div><label for="a-lang">Target Language:</label><select id="a-lang" class="mt-1 w-full rounded-md dark:bg-gray-700"></select></div>`;
            const langSelect = document.getElementById('a-lang');
            ['hi-IN', 'kn-IN', 'ta-IN', 'te-IN'].forEach(code => {
                langSelect.innerHTML += `<option value="${code}">${languages[code]}</option>`;
            });
            langSelect.addEventListener('change', loadCurriculum);
        }
        loadCurriculum();
    }

    async function loadCurriculum() {
        differencesEl.innerHTML = '<p>AI is generating curriculum...</p>';
        lessonContainer.classList.add('hidden');
        const mode = modeSelect.value;
        let prompt;
        if (mode === 'english') {
            prompt = `Generate a list of 5 key phonetic differences between General American and British English pronunciation. For each, provide a short name (e.g., "The 'r' sound"), the phoneme symbol, and a one-sentence description. Respond in JSON format like this: [{ "name": "string", "phoneme": "string", "description": "string" }]`;
        } else {
            const lang = document.getElementById('a-lang').value;
            prompt = `Generate a list of 5 common pronunciation challenges for learners of ${languages[lang]}. For each, provide a short name (e.g., "Aspirated Consonants"), the relevant script symbol if applicable, and a one-sentence description. Respond in JSON format like this: [{ "name": "string", "phoneme": "string", "description": "string" }]`;
        }
        const diffs = await callGeminiAPI(prompt, true);
        if (diffs.error) { differencesEl.textContent = diffs.error; return; }
        differencesEl.innerHTML = diffs.map(d => `
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" data-name="${d.name}">
                <h3 class="font-bold">${d.name} <span class="font-mono text-indigo-500">${d.phoneme}</span></h3>
                <p class="text-sm text-gray-500">${d.description}</p>
            </div>
        `).join('');
        differencesEl.querySelectorAll('div[data-name]').forEach(el => el.addEventListener('click', loadLesson));
    }

    async function loadLesson(event) {
        const soundName = event.currentTarget.dataset.name;
        const mode = modeSelect.value;
        lessonContainer.classList.remove('hidden');
        lessonContainer.innerHTML = '<p>AI is generating your lesson...</p>';
        let prompt, lessonLang;

        if (mode === 'english') {
            const targetAccent = document.getElementById('a-accent').value;
            lessonLang = 'en-US';
            prompt = `Create a mini-lesson for an English learner trying to master the '${soundName}' for a ${targetAccent} accent. Provide a simple one-sentence explanation of how to produce the sound, and then give three practice sentences that highlight this sound. Respond in JSON format like this: { "explanation": "string", "sentences": ["sentence1", "sentence2", "sentence3"] }`;
        } else {
            lessonLang = document.getElementById('a-lang').value;
            prompt = `Create a mini-lesson for a learner of ${languages[lessonLang]} trying to master '${soundName}'. Provide a simple one-sentence explanation in English of how to produce the sound, and then give three practice sentences in ${languages[lessonLang]} that highlight this sound. Respond in JSON format like this: { "explanation": "string", "sentences": ["sentence1", "sentence2", "sentence3"] }`;
        }

        const lesson = await callGeminiAPI(prompt, true);
        if (lesson.error) { lessonContainer.textContent = lesson.error; return; }

        lessonContainer.innerHTML = `<h2 class="text-xl font-bold">Lesson: ${soundName}</h2><p class="p-3 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg">${lesson.explanation}</p><div id="a-sentences" class="space-y-2"></div>`;
        const sentencesEl = document.getElementById('a-sentences');
        lesson.sentences.forEach((s, i) => {
            sentencesEl.innerHTML += `<div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center"><span>${i+1}. ${s}</span><button class="a-record-btn w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-xl" data-sentence="${s}">🎤</button></div><div id="a-feedback-${i}" class="p-2 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg hidden"></div>`;
        });

        document.querySelectorAll('.a-record-btn').forEach((btn, i) => {
            btn.addEventListener('click', async () => {
                if(isRecording) return;
                const sentence = btn.dataset.sentence;
                const feedbackEl = document.getElementById(`a-feedback-${i}`);
                feedbackEl.classList.remove('hidden');
                feedbackEl.textContent = 'Listening...';
                
                recognition.lang = lessonLang;
                setFinalTranscriptCallback(async (transcript) => {
                    feedbackEl.textContent = 'AI is analyzing...';
                    let analysisPrompt;
                    if (mode === 'english') {
                        const targetAccent = document.getElementById('a-accent').value;
                        analysisPrompt = `Analyze pronunciation. Target: "${sentence}". User said: "${transcript}". The user is focusing on the '${soundName}' for a ${targetAccent} accent. Provide a one-sentence feedback and an accent accuracy score from 0-100. Respond in JSON: {"feedback": "string", "score": 0-100}`;
                    } else {
                        analysisPrompt = `Analyze pronunciation in ${languages[lessonLang]}. Target: "${sentence}". User said: "${transcript}". The user is focusing on '${soundName}'. Provide a one-sentence feedback on their clarity.`;
                    }
                    const analysis = await callGeminiAPI(analysisPrompt, mode === 'english');
                    if (mode === 'english' && !analysis.error) {
                        feedbackEl.innerHTML = `<p>${analysis.feedback}</p><p class="font-bold">Accent Accuracy: ${analysis.score}%</p>`;
                    } else {
                        feedbackEl.textContent = analysis.error || analysis;
                    }
                });
                recognition.start();
            });
        });
    }

    modeSelect.addEventListener('change', renderSelectors);
    renderSelectors();
}
