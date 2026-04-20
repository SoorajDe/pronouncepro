function initPracticePage() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-6">
            <!-- Controls -->
            <div class="glass-card animated-card">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <select id="p-lang" class="form-input rounded-lg px-3 py-2 animated-select">
                        <!-- Options populated by JS -->
                    </select>
                    <select id="p-difficulty" class="form-input rounded-lg px-3 py-2 animated-select">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <select id="p-voice" class="form-input rounded-lg px-3 py-2 animated-select">
                        <!-- Options populated by JS -->
                    </select>
                    <button id="p-listen" class="animated-button gemini-btn rounded-lg px-4 py-2 font-medium">🔊 Listen</button>
                </div>
                <div class="flex gap-2 mb-4">
                    <input id="p-topic" type="text" placeholder="Enter a topic (e.g., 'food', 'travel')" class="form-input flex-1 rounded-lg px-3 py-2 animated-input" maxlength="50">
                    <button id="p-generate" class="animated-button gemini-btn rounded-lg px-4 py-2 font-medium">✨ Generate</button>
                </div>
                <div class="flex justify-center gap-4">
                    <button id="p-prev" class="animated-nav-btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg px-4 py-2 font-medium transition-colors">⬅️ Previous</button>
                    <button id="p-random" class="animated-nav-btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg px-4 py-2 font-medium transition-colors">🎲 Random</button>
                    <button id="p-next" class="animated-nav-btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg px-4 py-2 font-medium transition-colors">Next ➡️</button>
                </div>
            </div>

            <!-- Main Content -->
            <div id="p-main-content" class="glass-card animated-card text-center">
                <div id="p-target" class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-8 leading-relaxed animated-target">
                    <!-- Target phrase displayed here -->
                </div>
                <div class="text-center">
                    <button id="p-record" class="mic-button w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl hover:bg-red-600 transition-colors animated-mic">🎤</button>
                </div>
            </div>

            <!-- Results -->
            <div id="p-results" class="hidden glass-card animated-card">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 animated-title">Analysis Results</h3>
                <div id="p-ai-feedback" class="text-gray-700 dark:text-gray-300 animated-feedback"></div>
                <div class="mt-4">
                    <button id="p-accent-btn" class="animated-button gemini-btn rounded-lg px-4 py-2 font-medium">🎯 Detailed Analysis</button>
                </div>
            </div>

            <!-- Accent Analysis Section -->
            <div id="accent-analysis-section" class="hidden glass-card animated-card">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 animated-title">Detailed Pronunciation Analysis</h3>
                <div id="p-accent-feedback" class="text-gray-700 dark:text-gray-300 animated-feedback"></div>
            </div>
        </div>
    `;

    const langSelect = document.getElementById('p-lang'), difficultySelect = document.getElementById('p-difficulty'), voiceSelect = document.getElementById('p-voice'), topicInput = document.getElementById('p-topic'), generateBtn = document.getElementById('p-generate'), targetEl = document.getElementById('p-target'), listenBtn = document.getElementById('p-listen'), recordBtn = document.getElementById('p-record'), resultsEl = document.getElementById('p-results'), mainEl = document.getElementById('p-main-content'), aiFeedbackEl = document.getElementById('p-ai-feedback'), prevBtn = document.getElementById('p-prev'), randomBtn = document.getElementById('p-random'), nextBtn = document.getElementById('p-next'), accentSection = document.getElementById('accent-analysis-section'), accentBtn = document.getElementById('p-accent-btn'), accentFeedbackEl = document.getElementById('p-accent-feedback');
    let currentPhrase = '', currentLang = 'en-US', currentDifficulty = 'easy', currentPhraseIndex = 0, lastTranscript = '';

    function populateLangs() { for (const code in languages) langSelect.innerHTML += `<option value="${code}">${languages[code]}</option>`; }
    function populateVoices() { const langVoices = voices.filter(v => v.lang.startsWith(currentLang.split('-')[0])); voiceSelect.innerHTML = langVoices.map(v => `<option data-name="${v.name}">${v.name}</option>`).join('') || `<option disabled>No voices</option>`; }
    
    function setNewPhrase(indexOrText) {
        mainEl.classList.remove('hidden');
        resultsEl.classList.add('hidden');
        accentFeedbackEl.classList.add('hidden');

        if (typeof indexOrText === 'string') {
            currentPhrase = indexOrText;
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            prevBtn.classList.add('opacity-50');
            nextBtn.classList.add('opacity-50');
        } else {
            const phraseList = phrases[currentLang][currentDifficulty];
            currentPhraseIndex = (typeof indexOrText === 'number') ? indexOrText : Math.floor(Math.random() * phraseList.length);
            currentPhrase = phraseList[currentPhraseIndex];
            prevBtn.disabled = false;
            nextBtn.disabled = false;
            prevBtn.classList.remove('opacity-50');
            nextBtn.classList.remove('opacity-50');
        }
        targetEl.innerHTML = currentPhrase.split(' ').map(word => `<span class="text-gray-500 dark:text-gray-400 word-highlight">${word}</span>`).join(' ');
    }

    function speakPhrase() { const u = new SpeechSynthesisUtterance(currentPhrase); u.voice = voices.find(v => v.name === voiceSelect.selectedOptions[0]?.dataset.name) || voices.find(v => v.lang.startsWith(currentLang.split('-')[0])); speechSynthesis.speak(u); }
    
    async function handleFinalTranscript(transcript) {
        lastTranscript = transcript;
        mainEl.classList.add('hidden'); resultsEl.classList.remove('hidden');
        aiFeedbackEl.innerHTML = '<p>AI is analyzing...</p>';
        const prompt = `Analyze pronunciation in ${languages[currentLang]}. Target: "${currentPhrase}". User said: "${transcript}". Respond in JSON with: { "overall_score": (0-100), "intonation_score": (0-100), "intonation_details": "string", "words": [{ "word": "string", "correctness": "correct|partial|incorrect", "phoneme_tip": "string" }] }.`;
        const analysis = await callGeminiAPI(prompt, true);
        if(analysis.error) { aiFeedbackEl.textContent = analysis.error; return; }

        // Highlight words in target phrase based on correctness
        const targetWords = currentPhrase.split(' ');
        const userWords = transcript.toLowerCase().split(' ');
        let highlightedPhrase = '';

        targetWords.forEach((targetWord, index) => {
            const userWord = userWords[index] || '';
            const wordAnalysis = analysis.words.find(w => w.word.toLowerCase() === targetWord.toLowerCase());
            let className = 'text-gray-500 dark:text-gray-400';

            if (wordAnalysis) {
                if (wordAnalysis.correctness === 'correct') {
                    className = 'text-green-600 dark:text-green-400';
                } else if (wordAnalysis.correctness === 'partial') {
                    className = 'text-yellow-600 dark:text-yellow-400';
                } else {
                    className = 'text-red-600 dark:text-red-400';
                }
            }

            highlightedPhrase += `<span class="${className} word-highlight">${targetWord}</span> `;
        });

        targetEl.innerHTML = highlightedPhrase.trim();

        let feedbackHTML = `<p><strong>Overall Score:</strong> ${analysis.overall_score}% | <strong>Intonation Score:</strong> ${analysis.intonation_score}%</p><p><strong>Rhythm & Flow:</strong> ${analysis.intonation_details}</p><ul class="list-disc pl-5 mt-2">`;
        analysis.words.filter(w => w.correctness !== 'correct').forEach(w => { feedbackHTML += `<li><strong>${w.word}:</strong> ${w.phoneme_tip}</li>`; });
        aiFeedbackEl.innerHTML = feedbackHTML + `</ul>`;
        saveResult(currentLang, analysis.overall_score, analysis);
    }

    function toggleRecording() {
        if (isRecording) {
            recordBtn.classList.remove('recording');
            recognition.stop();
        } else {
            recordBtn.classList.add('recording');
            try {
                recognition.lang = currentLang;
                setFinalTranscriptCallback(handleFinalTranscript);
                setInterimTranscriptCallback(handleInterimTranscript);
                recognition.start();
            } catch (err) {
                console.error("Error starting recording:", err);
                if (err.name === 'InvalidStateError') {
                    recognition.abort();
                }
                subtitleText.textContent = 'Could not start recording.';
            }
        }
    }

    function handleInterimTranscript(transcript) {
        // Real-time word coloring during recording
        const targetWords = currentPhrase.split(' ');
        const userWords = transcript.toLowerCase().split(' ');
        let highlightedPhrase = '';

        targetWords.forEach((targetWord, index) => {
            const userWord = userWords[index] || '';
            let className = 'text-gray-500 dark:text-gray-400';

            // Improved matching for real-time feedback
            if (userWord) {
                const target = targetWord.toLowerCase().replace(/[^a-z0-9]/g, '');
                const user = userWord.replace(/[^a-z0-9]/g, '');
                if (target === user) {
                    className = 'text-green-600 dark:text-green-400';
                } else if (target.startsWith(user)) {
                    className = 'text-yellow-600 dark:text-yellow-400';
                } else {
                    className = 'text-red-600 dark:text-red-400';
                }
            }

            highlightedPhrase += `<span class="${className} word-highlight">${targetWord}</span> `;
        });

        targetEl.innerHTML = highlightedPhrase.trim();
    }
    
    generateBtn.addEventListener('click', async () => { const topic = topicInput.value || "any topic"; generateBtn.textContent = 'Generating...'; const prompt = `Generate one simple, clear ${languages[currentLang]} sentence for pronunciation practice about ${topic}.`; const newSentence = await callGeminiAPI(prompt); setNewPhrase(newSentence); topicInput.value = ''; generateBtn.textContent = '✨ Generate'; });
    accentBtn.addEventListener('click', async () => { accentFeedbackEl.classList.remove('hidden'); accentFeedbackEl.textContent = 'Analyzing details...'; const prompt = `The user is practicing ${languages[currentLang]}. The target phrase was "${currentPhrase}", and they said "${lastTranscript}". Provide a detailed analysis of their pronunciation. Focus on clarity, rhythm, and any common errors a learner might make. Give one or two short, actionable tips to help them sound more natural.`; const feedback = await callGeminiAPI(prompt); accentFeedbackEl.textContent = feedback; });
    
    const updatePracticeState = () => { currentLang = langSelect.value; currentDifficulty = difficultySelect.value; populateVoices(); setNewPhrase(0); };
    langSelect.addEventListener('change', updatePracticeState);
    difficultySelect.addEventListener('change', updatePracticeState);
    
    listenBtn.addEventListener('click', speakPhrase); recordBtn.addEventListener('click', toggleRecording);
    nextBtn.addEventListener('click', () => setNewPhrase((currentPhraseIndex + 1) % phrases[currentLang][currentDifficulty].length));
    prevBtn.addEventListener('click', () => setNewPhrase((currentPhraseIndex - 1 + phrases[currentLang][currentDifficulty].length) % phrases[currentLang][currentDifficulty].length));
    randomBtn.addEventListener('click', () => setNewPhrase());

    populateLangs(); setTimeout(() => { populateVoices(); setNewPhrase(0); }, 100);
}
