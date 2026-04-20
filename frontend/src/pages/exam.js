function initExamPage() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `<div class="w-full max-w-3xl mx-auto space-y-6" id="exam-container"></div>`;
    
    const container = document.getElementById('exam-container');
    let examData = [], currentQuestionIndex = 0, currentLang = 'en-US', currentDifficulty = 'easy';

    function renderStartScreen() {
        container.innerHTML = `<div class="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"><h1 class="text-2xl font-bold">Pronunciation Exam</h1><p class="mt-2 text-gray-500">Test your skills with a 5-question exam.</p><div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="exam-lang">Language:</label><select id="exam-lang" class="mt-1 w-full rounded-md dark:bg-gray-700"></select></div><div><label for="exam-difficulty">Difficulty:</label><select id="exam-difficulty" class="mt-1 w-full rounded-md dark:bg-gray-700"><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></div></div><button id="start-exam-btn" class="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg">Start Exam</button></div>`;
        const langSelect = document.getElementById('exam-lang');
        for (const code in languages) langSelect.innerHTML += `<option value="${code}">${languages[code]}</option>`;
        langSelect.addEventListener('change', e => currentLang = e.target.value);
        document.getElementById('exam-difficulty').addEventListener('change', e => currentDifficulty = e.target.value);
        document.getElementById('start-exam-btn').addEventListener('click', startExam);
    }

    function startExam() {
        const allPhrases = phrases[currentLang][currentDifficulty];
        examData = [...allPhrases].sort(() => 0.5 - Math.random()).slice(0, Math.min(5, allPhrases.length)).map(p => ({ target: p, user: '', score: 0 }));
        currentQuestionIndex = 0;
        renderQuestion();
    }

    function renderQuestion() {
        const phrase = examData[currentQuestionIndex].target;
        container.innerHTML = `<div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4"><p class="text-sm text-gray-500">Question ${currentQuestionIndex + 1} of ${examData.length}</p><p class="text-2xl font-semibold text-indigo-600">${phrase}</p><div class="text-center"><button id="exam-record-btn" class="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center text-3xl">🎤</button></div></div>`;
        const recordBtn = document.getElementById('exam-record-btn');
        recordBtn.addEventListener('click', () => { 
            if(isRecording) { 
                recognition.stop(); 
            } else { 
                recognition.lang = currentLang; 
                recognition.start(); 
                setFinalTranscriptCallback(handleAnswer); 
            }
        });
    }
    
    function handleAnswer(transcript) {
        const target = examData[currentQuestionIndex].target;
        const targetWords = target.toLowerCase().replace(/[.,?!]/g, '').split(/\s+/);
        const transcriptWords = transcript.toLowerCase().split(/\s+/);
        let correctWords = 0;
        targetWords.forEach((word, index) => { if (index < transcriptWords.length && transcriptWords[index] === word) correctWords++; });
        const score = targetWords.length > 0 ? Math.round((correctWords / targetWords.length) * 100) : 0;
        examData[currentQuestionIndex].user = transcript; examData[currentQuestionIndex].score = score;
        saveResult(currentLang, score, null);
        currentQuestionIndex++;
        if (currentQuestionIndex < examData.length) { renderQuestion(); } else { renderFinalResults(); }
    }

    async function renderFinalResults() {
        const finalScore = Math.round(examData.reduce((acc, cur) => acc + cur.score, 0) / examData.length);
        container.innerHTML = `<div class="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <h2 class="text-2xl font-bold">Exam Complete!</h2>
            <p class="text-xl mt-2">Your average score is:</p>
            <div class="w-40 h-40 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center my-6"><span class="text-5xl font-bold text-green-600 dark:text-green-300">${finalScore}%</span></div>
            
            <div id="exam-review-container" class="space-y-4 text-left"></div>

            <div class="flex justify-between items-center mt-4">
                <button id="exam-prev-btn" class="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Previous</button>
                <span id="exam-review-counter" class="text-sm text-gray-500"></span>
                <button id="exam-next-btn" class="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">Next</button>
            </div>

            <div id="exam-ai-feedback" class="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-left min-h-[100px]">AI is preparing feedback...</div>
            <button id="restart-exam-btn" class="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg">Take Again</button>
        </div>`;
        
        let reviewIndex = 0;
        const reviewContainer = document.getElementById('exam-review-container');
        const reviewCounter = document.getElementById('exam-review-counter');
        const prevBtn = document.getElementById('exam-prev-btn');
        const nextBtn = document.getElementById('exam-next-btn');

        function renderReviewQuestion() {
            const item = examData[reviewIndex];
            reviewContainer.innerHTML = `
                <div>
                    <p class="text-sm font-semibold">Target:</p>
                    <p class="p-2 bg-gray-100 dark:bg-gray-900 rounded">${item.target}</p>
                </div>
                <div>
                    <p class="text-sm font-semibold">You Said:</p>
                    <p class="p-2 bg-gray-100 dark:bg-gray-900 rounded">${item.user || '(No answer recorded)'}</p>
                </div>
                <p class="text-right font-bold">Score: ${item.score}%</p>
            `;
            reviewCounter.textContent = `Question ${reviewIndex + 1} of ${examData.length}`;
            prevBtn.disabled = reviewIndex === 0;
            nextBtn.disabled = reviewIndex === examData.length - 1;
            prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
            nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
        }

        prevBtn.addEventListener('click', () => { if(reviewIndex > 0) { reviewIndex--; renderReviewQuestion(); }});
        nextBtn.addEventListener('click', () => { if(reviewIndex < examData.length - 1) { reviewIndex++; renderReviewQuestion(); }});
        
        document.getElementById('restart-exam-btn').addEventListener('click', renderStartScreen);
        const summary = examData.map(d => `Target: "${d.target}", User Said: "${d.user}"`).join('\n');
        const prompt = `A learner took a ${languages[currentLang]} pronunciation exam. Results:\n${summary}\nProvide a concise, 2-3 sentence summary in English. Identify one common error pattern and suggest what to focus on.`;
        document.getElementById('exam-ai-feedback').textContent = await callGeminiAPI(prompt);
        renderReviewQuestion();
    }
    renderStartScreen();
}
