function initCustomPracticePage() {
    pageContent.innerHTML = `<div class="w-full max-w-3xl mx-auto space-y-6">
        <div class="glass-card">
            <h1 class="text-2xl font-bold mb-4">Custom Practice</h1>
            <p class="text-gray-500 mb-4">Paste your own text below. The AI will break it into sentences for you to practice.</p>
            <textarea id="custom-text-input" class="w-full h-40 p-2 border rounded-md dark:bg-gray-700" placeholder="Paste your text here..."></textarea>
            <button id="custom-start-btn" class="w-full mt-4 gemini-btn text-white font-semibold px-4 py-2 rounded-lg">✨ Create Practice Session</button>
        </div>
        <div id="custom-practice-container" class="hidden"></div>
    </div>`;
    
    const startBtn = document.getElementById('custom-start-btn');
    const inputEl = document.getElementById('custom-text-input');
    const container = document.getElementById('custom-practice-container');

    startBtn.addEventListener('click', async () => {
        const text = inputEl.value;
        if (!text.trim()) return;
        startBtn.textContent = 'AI is preparing your session...';
        startBtn.disabled = true;

        const prompt = `Split the following text into an array of sentences. Respond in JSON format like this: {"sentences": ["sentence1", "sentence2", ...]}\n\nText: "${text}"`;
        const result = await callGeminiAPI(prompt, true);
        
        startBtn.textContent = '✨ Create Practice Session';
        startBtn.disabled = false;
        if (result.error || !result.sentences) {
            container.innerHTML = `<p class="text-red-500">Could not process text. Please try again.</p>`;
            return;
        }
        
        renderCustomPractice(result.sentences);
    });

    function renderCustomPractice(sentences) {
        let practiceData = sentences.map(s => ({ target: s, user: '', score: 0 }));
        let currentIndex = 0;
        
        function renderQuestion() {
            container.classList.remove('hidden');
            const phrase = practiceData[currentIndex].target;
            container.innerHTML = `<div class="glass-card space-y-4">
                <p class="text-sm text-gray-500">Sentence ${currentIndex + 1} of ${practiceData.length}</p>
                <p class="text-2xl font-semibold text-indigo-600">${phrase}</p>
                <div class="text-center"><button id="custom-record-btn" class="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl">🎤</button></div>
                <div id="custom-feedback" class="p-2 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg hidden"></div>
                <div class="flex justify-between items-center mt-4">
                    <button id="custom-prev-btn" class="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Previous</button>
                    <button id="custom-next-btn" class="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Next</button>
                </div>
            </div>`;

            const recordBtn = document.getElementById('custom-record-btn');
            const prevBtn = document.getElementById('custom-prev-btn');
            const nextBtn = document.getElementById('custom-next-btn');

            recordBtn.addEventListener('click', () => {
                if(isRecording) { recognition.stop(); } 
                else { 
                    recognition.lang = 'en-US'; 
                    setFinalTranscriptCallback(handleAnswer); 
                    recognition.start();
                }
            });

            prevBtn.addEventListener('click', () => { if(currentIndex > 0) { currentIndex--; renderQuestion(); }});
            nextBtn.addEventListener('click', () => { if(currentIndex < practiceData.length - 1) { currentIndex++; renderQuestion(); }});

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === practiceData.length - 1;
            prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
            nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
        }

        async function handleAnswer(transcript) {
            const feedbackEl = document.getElementById('custom-feedback');
            feedbackEl.classList.remove('hidden');
            feedbackEl.textContent = 'AI is analyzing...';
            
            const target = practiceData[currentIndex].target;
            const prompt = `Analyze pronunciation. Target: "${target}". User said: "${transcript}". Provide a one-sentence feedback on their clarity.`;
            const analysis = await callGeminiAPI(prompt);
            feedbackEl.textContent = analysis;
        }
        
        renderQuestion();
    }
}
