function initGamesPage() {
    console.log('initGamesPage called');
    const pageContent = document.getElementById('page-content');
    if (!pageContent) {
        console.log('pageContent not found');
        return;
    }

    stopSpeechCapture();

    pageContent.innerHTML = `
        <div class="w-full max-w-7xl mx-auto space-y-8">
            <!-- Hero Section with Enhanced Stats -->
            <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_#ffffff,_transparent_70%)] pointer-events-none"></div>
                <div class="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_bottom_right,_#ffffff,_transparent_70%)] pointer-events-none"></div>
                <div class="relative">
                    <div class="text-center mb-8">
                        <h1 class="text-4xl font-black mb-2 bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">
                            🎮 Game Center
                        </h1>
                        <p class="text-indigo-100 text-lg">Master pronunciation through AI-powered challenges</p>
                    </div>
                    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
                        <div class="group rounded-2xl bg-white/10 backdrop-blur-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                <span class="text-2xl">🏆</span>
                            </div>
                            <p class="text-sm uppercase tracking-widest text-indigo-100">Total Score</p>
                            <p id="games-total-score" class="text-4xl font-black mt-1">0</p>
                        </div>
                        <div class="group rounded-2xl bg-white/10 backdrop-blur-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                <span class="text-2xl">🔥</span>
                            </div>
                            <p class="text-sm uppercase tracking-widest text-indigo-100">Win Streak</p>
                            <p id="games-streak" class="text-4xl font-black mt-1">0</p>
                        </div>
                        <div class="group rounded-2xl bg-white/10 backdrop-blur-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                <span class="text-2xl">⚡</span>
                            </div>
                            <p class="text-sm uppercase tracking-widest text-indigo-100">Session Score</p>
                            <p id="games-session" class="text-4xl font-black mt-1">0</p>
                        </div>
                        <div class="group rounded-2xl bg-white/10 backdrop-blur-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                                <span class="text-2xl">🎯</span>
                            </div>
                            <p class="text-sm uppercase tracking-widest text-indigo-100">Status</p>
                            <p id="games-status" class="text-base font-semibold text-white/90 mt-1">Pick a challenge to start practicing.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- AI Settings Panel -->
            <section class="rounded-3xl border border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-8 shadow-xl">
                <div class="flex items-center space-x-4 mb-6">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white">AI Coach Settings</h3>
                        <p class="text-gray-600 dark:text-gray-400">Customize your intelligent training experience</p>
                    </div>
                </div>
                <div class="grid gap-6 md:grid-cols-3">
                    <label class="group">
                        <span class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Training Language</span>
                        <select id="game-language-select" class="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 transition-all group-hover:border-indigo-400">
                        </select>
                    </label>
                    <label class="group">
                        <span class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">AI Voice Coach</span>
                        <select id="game-voice-select" class="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 transition-all group-hover:border-indigo-400">
                            <option value="">Loading voices…</option>
                        </select>
                    </label>
                    <div class="flex items-end">
                        <button id="refresh-voices-btn" class="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 transition-all">
                            <span class="flex items-center justify-center space-x-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                                <span>Refresh Voices</span>
                            </span>
                        </button>
                    </div>
                </div>
                <div class="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                    <p class="text-sm text-indigo-700 dark:text-indigo-300 flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                        </svg>
                        <span><strong>AI-Powered:</strong> Gemini crafts personalized content and provides intelligent feedback based on your performance.</span>
                    </p>
                </div>
            </section>

            <!-- Games Grid -->
            <section>
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span class="text-2xl">🎲</span>
                        </div>
                        <div>
                            <p class="text-sm uppercase tracking-widest text-emerald-500 dark:text-emerald-300">Interactive Challenges</p>
                            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">AI-Powered Games</h2>
                        </div>
                    </div>
                    <button id="reset-session" class="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                        Reset Session
                    </button>
                </div>
                <div id="game-menu" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"></div>
            </section>

            <section id="game-detail" class="hidden"></section>
        </div>
    `;
    
    const scoreState = {
        total: parseInt(localStorage.getItem('gameHubTotalScore'), 10) || 0,
        streak: parseInt(localStorage.getItem('gameHubStreak'), 10) || 0,
        session: 0
    };

    const languageOptions = (typeof languages !== 'undefined' && languages) ? languages : {
        'en-US': 'English (US)',
        'en-GB': 'English (UK)',
        'es-ES': 'Spanish (Spain)',
        'fr-FR': 'French (France)',
        'hi-IN': 'Hindi (India)',
        'ta-IN': 'Tamil (India)',
        'te-IN': 'Telugu (India)'
    };

    const preferenceState = {
        language: localStorage.getItem('gameHubLanguage') || 'en-US',
        voice: localStorage.getItem('gameHubVoice') || '',
        voices: []
    };

    const gameCatalog = [
        // Word Games
        {
            id: 'sprint',
            icon: '⚡',
            title: 'Pronunciation Sprint',
            blurb: 'Race through curated word packs and keep your pace steady.',
            tagline: 'Voice agility • uses speech recognition',
            category: 'Word Games',
            difficulty: 'Medium',
            init: initSprintGame
        },
        {
            id: 'builder',
            icon: '🧱',
            title: 'Word Builder',
            blurb: 'AI crafts word fragments - assemble them into complete words!',
            tagline: 'Vocabulary building • AI-generated challenges',
            category: 'Word Games',
            difficulty: 'Easy',
            init: initWordBuilderGame
        },
        {
            id: 'rhyme',
            icon: '🎭',
            title: 'Rhyme Master',
            blurb: 'Find words that rhyme with AI-generated targets.',
            tagline: 'Phonetic awareness • creative thinking',
            category: 'Word Games',
            difficulty: 'Medium',
            init: initRhymeMasterGame
        },
        {
            id: 'vocab-quiz',
            icon: '📚',
            title: 'Vocabulary Quiz',
            blurb: 'Test your knowledge with AI-generated vocabulary questions.',
            tagline: 'Knowledge check • multiple choice',
            category: 'Word Games',
            difficulty: 'Easy',
            init: initVocabularyQuizGame
        },
        // Pronunciation Games
        {
            id: 'match',
            icon: '🎯',
            title: 'Sound Match',
            blurb: 'Listen to the clue and tap the word that matches the target sound.',
            tagline: 'Listening focus • quick taps',
            category: 'Pronunciation Games',
            difficulty: 'Medium',
            init: initSoundMatchGame
        },
        {
            id: 'echo',
            icon: '🎵',
            title: 'Memory Echo',
            blurb: 'Memorize short rhythm lines and repeat them aloud.',
            tagline: 'Intonation & stress • speech recognition',
            category: 'Pronunciation Games',
            difficulty: 'Hard',
            init: initMemoryEchoGame
        }
    ];

    const menuEl = document.getElementById('game-menu');
    const detailEl = document.getElementById('game-detail');

    gameCatalog.forEach(game => {
        const card = document.createElement('button');
        card.className = 'group rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-left transition transform hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200';
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="text-4xl">${game.icon}</span>
                <svg class="w-6 h-6 text-gray-400 group-hover:text-indigo-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
                    </div>
            <h3 class="mt-4 text-xl font-semibold text-gray-900 dark:text-white">${game.title}</h3>
            <p class="mt-2 text-gray-600 dark:text-gray-300 text-sm">${game.blurb}</p>
            <p class="mt-4 text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-300">${game.tagline}</p>
        `;
        card.addEventListener('click', () => openGame(game));
        menuEl.appendChild(card);
    });

    document.getElementById('reset-session').addEventListener('click', () => {
        scoreState.session = 0;
        updateScoreboard();
        setStatus('Session score cleared. Keep practicing!', 'info');
    });

    setupPreferenceControls();
    updateScoreboard();

    function openGame(game) {
        stopSpeechCapture();
        menuEl.classList.add('hidden');
        detailEl.classList.remove('hidden');
        detailEl.innerHTML = `
            <div class="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl p-6 lg:p-8">
                <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p class="text-sm uppercase tracking-widest text-indigo-500 dark:text-indigo-300">${game.tagline}</p>
                        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">${game.icon} ${game.title}</h2>
                    </div>
                    <button id="back-to-library" class="px-5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">← Back to games</button>
                    </div>
                <div id="game-shell" class="mt-6"></div>
            </div>
         `;
        detailEl.querySelector('#back-to-library').addEventListener('click', closeGame);
        const shell = detailEl.querySelector('#game-shell');
        game.init(shell);
    }

    function closeGame() {
        stopSpeechCapture();
        detailEl.classList.add('hidden');
        menuEl.classList.remove('hidden');
    }

    function initSprintGame(container) {
        const fallbackSprintSets = [
            { label: 'Warm Up', words: ['focus', 'river', 'mirror', 'happy', 'bright'] },
            { label: 'Crunch Time', words: ['clarity', 'thunder', 'victory', 'journey', 'balance'] },
            { label: 'Speed Run', words: ['precision', 'resonance', 'elevation', 'momentum', 'celebration'] }
        ];

        let sprintSets = cloneSets(fallbackSprintSets);

        const sprintState = {
            setIndex: 0,
            wordIndex: 0,
            localScore: 0,
            active: false,
            loading: false
        };

        container.innerHTML = `
            <div class="space-y-6">
                <p class="text-gray-600 dark:text-gray-300">Each sprint asks Gemini to craft brand-new word packs for <strong>${getLanguageLabel()}</strong>. Start a run, then tap the mic for every word.</p>
                <div class="flex flex-wrap gap-3" id="sprint-levels"></div>
                <p id="sprint-pack-info" class="text-sm text-gray-500 dark:text-gray-400">Language: ${getLanguageLabel()} • AI pack ready when you start.</p>
                <div class="rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white shadow-lg">
                    <p class="text-sm uppercase tracking-widest text-white/70">Current word</p>
                    <p id="sprint-word" class="mt-3 text-4xl font-black tracking-wide">Pick a pack</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <button id="sprint-start" class="gemini-btn px-6 py-3 text-white rounded-2xl text-lg font-semibold">🚀 New Sprint Pack</button>
                    <button id="sprint-record" class="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold disabled:opacity-60">🎤 Say Word</button>
                </div>
                <div class="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
                    <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>Words cleared: <strong id="sprint-progress">0/0</strong></span>
                        <span>Local score: <strong id="sprint-score">0</strong></span>
                    </div>
                    <p id="sprint-status" class="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-100">Pick a pack to begin.</p>
                </div>
            </div>
        `;

        const levelWrap = container.querySelector('#sprint-levels');
        const wordEl = container.querySelector('#sprint-word');
        const progressEl = container.querySelector('#sprint-progress');
        const scoreEl = container.querySelector('#sprint-score');
        const statusEl = container.querySelector('#sprint-status');
        const startBtn = container.querySelector('#sprint-start');
        const recordBtn = container.querySelector('#sprint-record');
        const packInfoEl = container.querySelector('#sprint-pack-info');

        recordBtn.disabled = true;

        renderLevelButtons();
        updateSprintProgress();

        startBtn.addEventListener('click', async () => {
            if (sprintState.loading) return;
            await startSprintSession();
        });

        recordBtn.addEventListener('click', () => {
            if (!sprintState.active) {
                setStatus('Start the sprint before recording.', 'warn');
                return;
            }
            requestSpeechCapture(handleSprintAttempt, { button: recordBtn, lang: preferenceState.language });
        });

        function renderLevelButtons() {
            levelWrap.innerHTML = '';
            sprintSets.forEach((set, index) => {
                const btn = document.createElement('button');
                btn.className = `px-4 py-2 rounded-2xl border text-sm font-semibold transition ${
                    sprintState.setIndex === index
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200'
                }`;
                btn.textContent = set.label;
                btn.addEventListener('click', () => {
                    sprintState.setIndex = index;
                    sprintState.wordIndex = 0;
                    sprintState.active = false;
                    recordBtn.disabled = true;
                    startBtn.textContent = '🚀 New Sprint Pack';
                    statusEl.textContent = 'Pack selected. Start the sprint when you are ready.';
                    renderLevelButtons();
                    updateSprintProgress();
                    wordEl.textContent = 'Press start';
                    updatePackInfo(`Language: ${getLanguageLabel()} • Pack: ${sprintSets[sprintState.setIndex].label}`);
                });
                levelWrap.appendChild(btn);
            });
        }

        async function startSprintSession() {
            sprintState.loading = true;
            sprintState.active = false;
            recordBtn.disabled = true;
            startBtn.disabled = true;
            startBtn.textContent = '⏳ Generating words...';
            statusEl.textContent = 'Asking AI for fresh sprint packs...';
            await loadSprintSets();
            sprintState.wordIndex = 0;
            sprintState.localScore = 0;
            sprintState.active = true;
            scoreEl.textContent = '0';
            recordBtn.disabled = false;
            startBtn.disabled = false;
            startBtn.textContent = '🔁 New Sprint Pack';
            statusEl.textContent = 'Sprint running! Tap the mic and match every word.';
            showCurrentWord();
            sprintState.loading = false;
        }

        async function loadSprintSets() {
            const langLabel = getLanguageLabel();
            updatePackInfo(`Language: ${langLabel} • generating...`);
            const prompt = `Create 3 short pronunciation sprint packs for learners practicing ${langLabel} (${preferenceState.language}). Each pack should have a fun label and exactly 5 high-frequency words that are good for speaking drills. Respond with JSON: {"sets":[{"label":"Warm Up","words":["word1","word2","word3","word4","word5"]},...]}`;
            const response = await requestAiJson(prompt, {
                onError: (msg) => updatePackInfo(`Language: ${langLabel} • using preset pack (${msg || 'AI unavailable'})`)
            });
            const aiSets = sanitizeSprintResponse(response);
            sprintSets = aiSets.length ? aiSets : cloneSets(fallbackSprintSets);
            if (sprintState.setIndex >= sprintSets.length) sprintState.setIndex = 0;
            renderLevelButtons();
            updateSprintProgress();
            updatePackInfo(`Language: ${langLabel} • Pack: ${sprintSets[sprintState.setIndex].label}`);
        }

        function updatePackInfo(text) {
            if (packInfoEl) {
                packInfoEl.textContent = text;
            }
        }

        function showCurrentWord() {
            const currentSet = sprintSets[sprintState.setIndex];
            wordEl.textContent = currentSet.words[sprintState.wordIndex].toUpperCase();
            updateSprintProgress();
        }

        function handleSprintAttempt(transcript) {
            const spoken = normalizeText(transcript);
            const target = sprintSets[sprintState.setIndex].words[sprintState.wordIndex];
            const targetClean = normalizeText(target);

            if (!spoken) {
                statusEl.textContent = 'I could not hear anything. Try again.';
                statusEl.classList.add('text-red-500');
                markMiss('No speech detected. Tap the mic and try again.');
                return;
            }

            if (spoken.includes(targetClean)) {
                sprintState.localScore += 5;
                addScore(5, 'Sprint word cleared');
                statusEl.textContent = `Great! "${target}" locked in.`;
                statusEl.classList.remove('text-red-500');
                sprintState.wordIndex += 1;
                scoreEl.textContent = sprintState.localScore;

                if (sprintState.wordIndex >= sprintSets[sprintState.setIndex].words.length) {
                    recordBtn.disabled = true;
                sprintState.active = false;
                    statusEl.textContent = 'Sprint complete! Tap New Sprint Pack for new words.';
                    setStatus('Sprint complete! Awesome pacing.', 'success');
                    startBtn.textContent = '🚀 New Sprint Pack';
                    return;
                }

                showCurrentWord();
            } else {
                statusEl.textContent = `Almost! I heard "${transcript.trim()}". Focus on "${target}".`;
                statusEl.classList.add('text-red-500');
                markMiss('Sprint miss. Resetting streak.');
            }
        }

        function updateSprintProgress() {
            const total = sprintSets[sprintState.setIndex].words.length;
            progressEl.textContent = `${Math.min(sprintState.wordIndex, total)}/${total}`;
        }

        function sanitizeSprintResponse(data) {
            if (!data || !Array.isArray(data.sets)) return [];
            return data.sets.map(set => {
                const words = Array.isArray(set.words) ? set.words.map(w => String(w).trim()).filter(Boolean).slice(0, 6) : [];
                return {
                    label: set.label ? String(set.label).trim() : 'Sprint Pack',
                    words: words.length ? words : []
                };
            }).filter(set => set.words.length >= 3);
        }

        function cloneSets(list) {
            return list.map(set => ({ label: set.label, words: [...set.words] }));
        }
    }

    function initSoundMatchGame(container) {
        const fallbackRounds = [
            {
                clue: 'Tap the word with the /th/ sound.',
                target: 'think',
                options: ['sink', 'think', 'wink'],
                answer: 'think',
                tip: 'Look for the TH digraph at the start.'
            },
            {
                clue: 'Which word uses a long "ee" vowel?',
                target: 'breeze',
                options: ['press', 'brick', 'breeze'],
                answer: 'breeze',
                tip: 'Long vowels often pair with double letters.'
            },
            {
                clue: 'Find the word with the /ʃ/ "sh" sound.',
                target: 'motion',
                options: ['nation', 'notion', 'motion'],
                answer: 'motion',
                tip: '"Ti" can sound like "sh" inside words.'
            },
            {
                clue: 'Choose the word with stress on the second syllable.',
                target: 'advice',
                options: ['AD-vice', 'ad-VICE', 'Advice (monotone)'],
                answer: 'ad-VICE',
                tip: 'Listen for the stronger vowel.'
            }
        ];

        let rounds = cloneRounds(fallbackRounds);

        const matchState = {
            round: 0,
            streak: 0,
            localScore: 0,
            locked: false
        };

        container.innerHTML = `
            <div class="space-y-6">
                <p class="text-gray-600 dark:text-gray-300">Gemini crafts fresh listening clues for <strong>${getLanguageLabel()}</strong>. Hear the target, then tap the matching option.</p>
                <div class="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Round <strong id="match-round">1</strong> / <span id="match-total">${rounds.length}</span></span>
                        <button id="match-play" class="text-indigo-600 dark:text-indigo-400 font-semibold">🔊 Hear the clue</button>
                    </div>
                </div>
                <div id="match-options" class="grid gap-4 sm:grid-cols-3"></div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-300">Correct streak: <strong id="match-streak">0</strong></span>
                    <button id="match-next" class="px-5 py-2 rounded-xl bg-indigo-500 text-white font-semibold disabled:opacity-60" disabled>Next card</button>
                </div>
                <div id="match-feedback" class="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">Answer the prompt to see feedback.</div>
            </div>
        `;

        const roundEl = container.querySelector('#match-round');
        const totalEl = container.querySelector('#match-total');
        const streakEl = container.querySelector('#match-streak');
        const optionsEl = container.querySelector('#match-options');
        const nextBtn = container.querySelector('#match-next');
        const playBtn = container.querySelector('#match-play');
        const feedbackEl = container.querySelector('#match-feedback');

        renderRound();
        loadMatchRounds();

        playBtn.addEventListener('click', () => {
            const current = rounds[matchState.round];
            if (!current) return;
            speakText(current.target);
            setStatus(`Target played: "${current.target}"`, 'info');
        });

        nextBtn.addEventListener('click', () => {
            if (nextBtn.dataset.mode === 'refresh') {
                nextBtn.dataset.mode = '';
                nextBtn.textContent = 'Next card';
                nextBtn.disabled = true;
                loadMatchRounds();
                return;
            }

            matchState.round += 1;
            if (matchState.round >= rounds.length) {
                feedbackEl.innerHTML = `<p class="text-lg font-semibold text-green-600">Deck complete! Local score: ${matchState.localScore}.</p>`;
                nextBtn.textContent = '♻️ New deck';
                nextBtn.dataset.mode = 'refresh';
                nextBtn.disabled = false;
                return;
            }
            matchState.locked = false;
            nextBtn.disabled = true;
            renderRound();
        });

        function renderRound() {
            const current = rounds[matchState.round];
            if (!current) {
                feedbackEl.textContent = 'Loading listening cards...';
                return;
            }
            totalEl.textContent = rounds.length;
            roundEl.textContent = `${matchState.round + 1}`;
            optionsEl.innerHTML = '';
            feedbackEl.textContent = 'Answer the prompt to see feedback.';

            current.options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'rounded-2xl border border-gray-200 dark:border-gray-800 p-4 font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 hover:border-indigo-400 transition text-left';
                btn.innerHTML = `<span class="text-lg">${option}</span>`;
                btn.addEventListener('click', () => evaluateOption(option, btn, current));
                optionsEl.appendChild(btn);
            });
        }

        function evaluateOption(option, btn, roundData) {
            if (matchState.locked) return;
            matchState.locked = true;
            const allButtons = optionsEl.querySelectorAll('button');
            allButtons.forEach(b => b.classList.add('opacity-70'));
            btn.classList.remove('opacity-70');

            if (option === roundData.answer) {
                btn.classList.add('border-emerald-400');
                feedbackEl.innerHTML = `<p class="text-green-600 font-semibold">Correct!</p><p class="text-sm">${roundData.tip}</p>`;
                matchState.localScore += 8;
                matchState.streak += 1;
                addScore(8, 'Sound match');
            } else {
                btn.classList.add('border-rose-400');
                feedbackEl.innerHTML = `<p class="text-rose-600 font-semibold">Not quite.</p><p class="text-sm">Hint: ${roundData.tip}</p>`;
                matchState.streak = 0;
                markMiss('Sound match miss. Try the next clue!');
            }

            streakEl.textContent = matchState.streak;
            nextBtn.disabled = false;
        }

        async function loadMatchRounds() {
            feedbackEl.textContent = 'Generating new listening clues...';
            const langLabel = getLanguageLabel();
            const prompt = `Create 3 short listening discrimination challenges for ${langLabel} (${preferenceState.language}). Each challenge should include "clue" text, a "target" word or short phrase (<=3 words), three concise "options", the correct "answer", and a helpful "tip". Respond as JSON: {"rounds":[{"clue":"","target":"","options":["","",""],"answer":"","tip":""},...]}`
            const response = await requestAiJson(prompt, {
                onError: (msg) => feedbackEl.textContent = `Using preset deck (${msg || 'AI unavailable'}).`
            });
            const aiRounds = sanitizeMatchResponse(response);
            rounds = aiRounds.length ? aiRounds : cloneRounds(fallbackRounds);
            matchState.round = 0;
            matchState.locked = false;
            matchState.streak = 0;
            matchState.localScore = 0;
            nextBtn.dataset.mode = '';
            nextBtn.textContent = 'Next card';
            nextBtn.disabled = true;
            totalEl.textContent = rounds.length;
            renderRound();
        }

        function sanitizeMatchResponse(data) {
            if (!data || !Array.isArray(data.rounds)) return [];
            return data.rounds.map(round => {
                const options = Array.isArray(round.options) ? round.options.map(opt => String(opt).trim()).filter(Boolean).slice(0, 3) : [];
                return {
                    clue: round.clue ? String(round.clue).trim() : '',
                    target: round.target ? String(round.target).trim() : '',
                    options: options.length === 3 ? options : [],
                    answer: round.answer ? String(round.answer).trim() : '',
                    tip: round.tip ? String(round.tip).trim() : ''
                };
            }).filter(round => round.clue && round.target && round.options.length === 3 && round.answer);
        }

        function cloneRounds(list) {
            return list.map(round => ({
                clue: round.clue,
                target: round.target,
                options: [...round.options],
                answer: round.answer,
                tip: round.tip
            }));
        }
    }

    function initMemoryEchoGame(container) {
        const fallbackEchoRounds = [
            {
                title: 'Calm cadence',
                phrase: 'Keep the rhythm steady and smooth.',
                tip: 'Lower your pace and stretch the vowels.',
                bonus: 15
            },
            {
                title: 'Energy burst',
                phrase: 'Push the pace and power through!',
                tip: 'Punch the repeated P sound for emphasis.',
                bonus: 18
            },
            {
                title: 'Curious rise',
                phrase: 'Are you ready for the challenge?',
                tip: 'Lift your pitch at the end like a question.',
                bonus: 20
            }
        ];

        let echoRounds = cloneEchoRounds(fallbackEchoRounds);

        const echoState = {
            index: 0,
            awaitingResponse: false
        };

        container.innerHTML = `
            <div class="space-y-6">
                <p class="text-gray-600 dark:text-gray-300">Gemini composes rhythm lines in <strong>${getLanguageLabel()}</strong>. Listen carefully, then echo the intonation back.</p>
                <div class="rounded-3xl bg-slate-900 text-white p-6 shadow-lg">
                    <p id="echo-title" class="text-sm uppercase tracking-widest text-slate-300">Phrase preview</p>
                    <h3 id="echo-phrase" class="mt-3 text-3xl font-bold">Press play to begin</h3>
                    <p id="echo-tip" class="mt-2 text-sm text-slate-200">Your tip appears here after each round.</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <button id="echo-start" class="gemini-btn text-white px-6 py-3 rounded-2xl font-semibold">▶️ Play phrase</button>
                    <button id="echo-record" class="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold disabled:opacity-60" disabled>🎤 Repeat it</button>
                    <button id="echo-next" class="px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-60" disabled>Next phrase</button>
                </div>
                <p id="echo-progress" class="text-sm text-gray-600 dark:text-gray-300">Round 1 of 3</p>
                <div id="echo-feedback" class="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">Play the phrase to unlock listening mode.</div>
            </div>
        `;

        const titleEl = container.querySelector('#echo-title');
        const phraseEl = container.querySelector('#echo-phrase');
        const tipEl = container.querySelector('#echo-tip');
        const progressEl = container.querySelector('#echo-progress');
        const feedbackEl = container.querySelector('#echo-feedback');
        const startBtn = container.querySelector('#echo-start');
        const recordBtn = container.querySelector('#echo-record');
        const nextBtn = container.querySelector('#echo-next');

        startBtn.addEventListener('click', () => playPhrase());

        recordBtn.addEventListener('click', () => {
            if (!echoState.awaitingResponse) {
                setStatus('Play the phrase before recording.', 'warn');
                return;
            }
            requestSpeechCapture(handleEchoAttempt, { button: recordBtn, lang: preferenceState.language });
        });

        nextBtn.addEventListener('click', () => {
            if (nextBtn.dataset.mode === 'refresh') {
                nextBtn.dataset.mode = '';
                nextBtn.disabled = true;
                nextBtn.textContent = 'Next phrase';
                loadEchoRounds();
                return;
            }
            echoState.index += 1;
            if (echoState.index >= echoRounds.length) {
                feedbackEl.innerHTML = `<p class="text-emerald-600 font-semibold text-lg">All phrases complete! Tap below for new AI lines.</p>`;
                nextBtn.textContent = '♻️ New phrases';
                nextBtn.dataset.mode = 'refresh';
                nextBtn.disabled = false;
                recordBtn.disabled = true;
                return;
            }
            echoState.awaitingResponse = false;
            nextBtn.disabled = true;
            recordBtn.disabled = true;
            updateEchoUI();
            feedbackEl.textContent = 'Play the phrase to unlock listening mode.';
        });

        updateEchoUI();
        loadEchoRounds();

        function playPhrase() {
            const current = echoRounds[echoState.index];
            if (!current) {
                setStatus('Waiting for AI phrases...', 'warn');
                return;
            }
            speakText(current.phrase);
            echoState.awaitingResponse = true;
            recordBtn.disabled = false;
            nextBtn.disabled = true;
            feedbackEl.textContent = 'Now tap the mic and repeat the phrase.';
            setStatus(`Phrase playing: "${current.phrase}"`, 'info');
        }

        function handleEchoAttempt(transcript) {
            const current = echoRounds[echoState.index];
            if (!current || !echoState.awaitingResponse) {
                feedbackEl.textContent = 'Play the phrase before attempting.';
                return;
            }

            const success = phraseMatches(transcript, current.phrase);
            if (success) {
                addScore(current.bonus, 'Memory echo');
                feedbackEl.innerHTML = `<p class="text-green-600 font-semibold">Balanced echo!</p><p class="text-sm">Bonus +${current.bonus} for matching rhythm.</p>`;
                echoState.awaitingResponse = false;
                recordBtn.disabled = true;
                nextBtn.disabled = false;
            } else {
                markMiss('Echo mismatch. Replay the phrase and try again.');
                feedbackEl.innerHTML = `<p class="text-rose-600 font-semibold">I heard a different pattern.</p><p class="text-sm">Tip: ${current.tip}</p>`;
            }
        }

        async function loadEchoRounds() {
            feedbackEl.textContent = 'Composing new rhythm lines...';
            startBtn.disabled = true;
            recordBtn.disabled = true;
            const langLabel = getLanguageLabel();
            const prompt = `Write 3 short pronunciation coaching lines for ${langLabel} (${preferenceState.language}). Each line should include "title", "phrase" (max 12 words), "tip" (how to shape rhythm), and "bonus" points (between 10 and 25). Respond as JSON: {"rounds":[{"title":"","phrase":"","tip":"","bonus":18},...]}`;
            const response = await requestAiJson(prompt, {
                onError: (msg) => feedbackEl.textContent = `Using preset phrases (${msg || 'AI unavailable'}).`
            });
            const aiRounds = sanitizeEchoResponse(response);
            echoRounds = aiRounds.length ? aiRounds : cloneEchoRounds(fallbackEchoRounds);
            echoState.index = 0;
            echoState.awaitingResponse = false;
            updateEchoUI();
            progressEl.textContent = `Round 1 of ${echoRounds.length}`;
            feedbackEl.textContent = 'Play the phrase to unlock listening mode.';
            startBtn.disabled = false;
            nextBtn.disabled = true;
        }

        function updateEchoUI() {
            const current = echoRounds[echoState.index];
            if (!current) return;
            titleEl.textContent = current.title;
            phraseEl.textContent = current.phrase;
            tipEl.textContent = current.tip;
            progressEl.textContent = `Round ${echoState.index + 1} of ${echoRounds.length}`;
        }

        function sanitizeEchoResponse(data) {
            if (!data || !Array.isArray(data.rounds)) return [];
            return data.rounds.map(round => ({
                title: round.title ? String(round.title).trim() : 'Rhythm mode',
                phrase: round.phrase ? String(round.phrase).trim() : '',
                tip: round.tip ? String(round.tip).trim() : '',
                bonus: Number.isFinite(round.bonus) ? Math.max(5, Math.min(40, Math.round(round.bonus))) : 15
            })).filter(round => round.phrase);
        }
    }

    function setupPreferenceControls() {
        const langSelect = document.getElementById('game-language-select');
        const voiceSelect = document.getElementById('game-voice-select');
        const refreshBtn = document.getElementById('refresh-voices-btn');
        if (!langSelect || !voiceSelect) return;

        langSelect.innerHTML = '';
        Object.entries(languageOptions).forEach(([code, label]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${label} (${code})`;
            langSelect.appendChild(option);
        });

        if (!languageOptions[preferenceState.language]) {
            preferenceState.language = Object.keys(languageOptions)[0];
        }
        langSelect.value = preferenceState.language;

        langSelect.addEventListener('change', (event) => {
            preferenceState.language = event.target.value;
            localStorage.setItem('gameHubLanguage', preferenceState.language);
            stopSpeechCapture();
            refreshVoiceOptions();
            setStatus(`Language switched to ${getLanguageLabel()}. AI packs will match this choice.`, 'info');
        });

        voiceSelect.addEventListener('change', (event) => {
            preferenceState.voice = event.target.value;
            localStorage.setItem('gameHubVoice', preferenceState.voice);
            if (preferenceState.voice) {
                setStatus(`Voice set to ${preferenceState.voice}.`, 'info');
            } else {
                setStatus('Voice reset to system default.', 'info');
            }
        });

        refreshBtn?.addEventListener('click', () => refreshVoiceOptions(true));

        refreshVoiceOptions();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = () => refreshVoiceOptions();
        }
    }

    function cloneEchoRounds(list) {
        return list.map(round => ({
            title: round.title,
            phrase: round.phrase,
            tip: round.tip,
            bonus: round.bonus
        }));
    }

    function refreshVoiceOptions(showStatus = false) {
        const voiceSelect = document.getElementById('game-voice-select');
        if (!voiceSelect) return;
        const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
        preferenceState.voices = voices;
        voiceSelect.innerHTML = '';

        const autoOption = document.createElement('option');
        autoOption.value = '';
        autoOption.textContent = 'Auto (browser default)';
        voiceSelect.appendChild(autoOption);

        const langPrefix = (preferenceState.language || '').split('-')[0]?.toLowerCase();
        const filtered = voices.filter(voice => voice.lang && voice.lang.toLowerCase().startsWith(langPrefix));

        filtered.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });

        if (!filtered.length) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = `No dedicated ${getLanguageLabel()} voice detected`;
            voiceSelect.appendChild(option);
        }

        if (preferenceState.voice && filtered.some(v => v.name === preferenceState.voice)) {
            voiceSelect.value = preferenceState.voice;
        } else {
            voiceSelect.value = '';
            preferenceState.voice = '';
            localStorage.removeItem('gameHubVoice');
        }

        if (showStatus) {
            setStatus('Voice list refreshed.', 'info');
        }
    }

    function getLanguageLabel(code = preferenceState.language) {
        return languageOptions[code] || code;
    }

    async function requestAiJson(prompt, { onError } = {}) {
        if (typeof callGeminiAPI !== 'function' || !authToken) {
            onError?.('login required');
            return null;
        }
        try {
            const response = await callGeminiAPI(prompt, true);
            if (response?.error) throw new Error(response.error);
            return response;
        } catch (error) {
            console.warn('Games AI fallback:', error);
            onError?.(error.message || 'AI unavailable');
            return null;
        }
    }

    function updateScoreboard() {
        const totalEl = document.getElementById('games-total-score');
        const streakEl = document.getElementById('games-streak');
        const sessionEl = document.getElementById('games-session');
        if (totalEl) totalEl.textContent = scoreState.total;
        if (streakEl) streakEl.textContent = `${scoreState.streak}🔥`;
        if (sessionEl) sessionEl.textContent = scoreState.session;
    }

    function addScore(points, message) {
        scoreState.total += points;
        scoreState.session += points;
        scoreState.streak += 1;
        localStorage.setItem('gameHubTotalScore', scoreState.total);
        localStorage.setItem('gameHubStreak', scoreState.streak);
        updateScoreboard();
        const totalEl = document.getElementById('games-total-score');
        if (totalEl) {
            totalEl.style.transform = 'scale(1.1)';
            setTimeout(() => totalEl.style.transform = '', 300);
        }
        setStatus(`${message}! +${points} pts`, 'success');
    }

    function markMiss(message) {
        scoreState.streak = 0;
        localStorage.setItem('gameHubStreak', scoreState.streak);
        updateScoreboard();
        setStatus(message, 'danger');
    }

    function setStatus(text, tone = 'info') {
        const statusEl = document.getElementById('games-status');
        if (!statusEl) return;
        statusEl.textContent = text;
        statusEl.classList.remove('text-emerald-200', 'text-rose-200', 'text-amber-200', 'text-sky-200');
        const toneClass = {
            success: 'text-emerald-200',
            danger: 'text-rose-200',
            warn: 'text-amber-200',
            info: 'text-sky-200'
        };
        statusEl.classList.add(toneClass[tone] || 'text-sky-200');
    }

    function stopSpeechCapture() {
        if (typeof recognition !== 'undefined' && recognition && isRecording) {
            recognition.stop();
        }
        if (typeof setFinalTranscriptCallback === 'function') {
            setFinalTranscriptCallback(null);
        }
    }

    function requestSpeechCapture(handler, { button, lang } = {}) {
        const targetLang = lang || preferenceState.language || 'en-US';
        if (typeof recognition === 'undefined' || !recognition) {
            handler('');
            setStatus('Speech recognition is not available in this browser.', 'warn');
                return;
            }

        if (button) {
            button.disabled = true;
            button.dataset.originalLabel = button.dataset.originalLabel || button.innerHTML;
            button.innerHTML = '🎧 Listening...';
        }

        if (isRecording) {
            recognition.stop();
        }

        recognition.lang = targetLang;
        recognition.start();

        if (typeof setFinalTranscriptCallback === 'function') {
            setFinalTranscriptCallback((transcript = '') => {
                if (button) {
                    button.disabled = false;
                    button.innerHTML = button.dataset.originalLabel;
                }
                handler(transcript);
            });
        }
    }

    function speakText(text) {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.lang = preferenceState.language || 'en-US';
        const voices = window.speechSynthesis.getVoices();
        let chosenVoice = null;
        if (preferenceState.voice) {
            chosenVoice = voices.find(v => v.name === preferenceState.voice);
        }
        if (!chosenVoice) {
            const langPrefix = (preferenceState.language || '').split('-')[0]?.toLowerCase();
            chosenVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
        }
        if (chosenVoice) {
            utterance.voice = chosenVoice;
        }
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }

    function normalizeText(text = '') {
        if (!text) return '';
        try {
            return text
                .toLowerCase()
                .normalize('NFKD')
                .replace(/[^\p{L}\s]/gu, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        } catch {
            return text.toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim();
        }
    }

    function phraseMatches(spoken, target) {
        const spokenWords = normalizeText(spoken).split(' ').filter(Boolean);
        const targetWords = normalizeText(target).split(' ').filter(Boolean);
        if (!spokenWords.length) return false;
        const matches = targetWords.filter(word => spokenWords.includes(word));
        return matches.length >= Math.max(2, Math.ceil(targetWords.length * 0.7));
    }

    function initWordBuilderGame(container) {
        const fallbackFragments = [
            {
                fragments: ['sun', 'shine', 'bright'],
                complete: 'sunshine',
                hint: 'What makes a day happy?'
            },
            {
                fragments: ['rain', 'bow', 'color'],
                complete: 'rainbow',
                hint: 'Colors after rain'
            },
            {
                fragments: ['moon', 'light', 'night'],
                complete: 'moonlight',
                hint: 'Glows in the dark'
            }
        ];

        let fragments = cloneFragments(fallbackFragments);

        const builderState = {
            index: 0,
            assembled: [],
            localScore: 0
        };

        container.innerHTML = `
            <div class="space-y-6">
                <p class="text-gray-600 dark:text-gray-300">AI crafts word fragments for <strong>${getLanguageLabel()}</strong>. Drag and drop to assemble complete words!</p>
                <div class="rounded-3xl bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white shadow-lg">
                    <p class="text-sm uppercase tracking-widest text-white/70">Word fragments</p>
                    <div id="builder-fragments" class="mt-4 flex flex-wrap gap-3"></div>
                </div>
                <div class="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
                    <p class="text-sm uppercase tracking-widest text-indigo-500 dark:text-indigo-300">Assembled word</p>
                    <div id="builder-assembled" class="mt-4 min-h-[60px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-4 flex flex-wrap gap-2"></div>
                </div>
                <div class="flex flex-wrap gap-4">
                    <button id="builder-submit" class="px-6 py-3 rounded-2xl bg-indigo-500 text-white font-semibold disabled:opacity-60" disabled>Check Word</button>
                    <button id="builder-next" class="px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold disabled:opacity-60" disabled>Next Word</button>
                </div>
                <div id="builder-feedback" class="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">Assemble the word to check your answer.</div>
            </div>
        `;

        const fragmentsEl = container.querySelector('#builder-fragments');
        const assembledEl = container.querySelector('#builder-assembled');
        const submitBtn = container.querySelector('#builder-submit');
        const nextBtn = container.querySelector('#builder-next');
        const feedbackEl = container.querySelector('#builder-feedback');

        renderFragments();
        loadWordBuilderFragments();

        submitBtn.addEventListener('click', () => checkAssembledWord());

        nextBtn.addEventListener('click', () => {
            if (nextBtn.dataset.mode === 'refresh') {
                nextBtn.dataset.mode = '';
                nextBtn.disabled = true;
                nextBtn.textContent = 'Next Word';
                loadWordBuilderFragments();
                return;
            }
            builderState.index += 1;
            if (builderState.index >= fragments.length) {
                feedbackEl.innerHTML = `<p class="text-emerald-600 font-semibold text-lg">All words complete! Local score: ${builderState.localScore}.</p>`;
                nextBtn.textContent = '♻️ New fragments';
                nextBtn.dataset.mode = 'refresh';
                nextBtn.disabled = false;
                return;
            }
            builderState.assembled = [];
            submitBtn.disabled = true;
            nextBtn.disabled = true;
            renderFragments();
            updateAssembledDisplay();
            feedbackEl.textContent = 'Assemble the word to check your answer.';
        });

        function renderFragments() {
            fragmentsEl.innerHTML = '';
            const current = fragments[builderState.index];
            if (!current) return;
            current.fragments.forEach(fragment => {
                const btn = document.createElement('button');
                btn.className = 'px-4 py-2 rounded-2xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition';
                btn.textContent = fragment;
                btn.addEventListener('click', () => {
                    builderState.assembled.push(fragment);
                    updateAssembledDisplay();
                    if (builderState.assembled.length > 0) {
                        submitBtn.disabled = false;
                    }
                });
                fragmentsEl.appendChild(btn);
            });
        }

        function loadWordBuilderFragments() {
            feedbackEl.textContent = 'Generating new word fragments...';
            const langLabel = getLanguageLabel();
            const prompt = `Create 3 word building challenges for ${langLabel} (${preferenceState.language}). Each challenge should include "fragments" (array of 3 word parts), "complete" (the assembled word), "hint" (clue for the word). Respond as JSON: {"challenges":[{"fragments":["part1","part2","part3"],"complete":"word","hint":"clue"},...]}`;
            requestAiJson(prompt, {
                onError: (msg) => feedbackEl.textContent = `Using preset fragments (${msg || 'AI unavailable'}).`
            }).then(response => {
                const aiFragments = sanitizeBuilderResponse(response);
                fragments = aiFragments.length ? aiFragments : cloneFragments(fallbackFragments);
                builderState.index = 0;
                builderState.assembled = [];
                renderFragments();
                updateAssembledDisplay();
                feedbackEl.textContent = 'Assemble the word to check your answer.';
                submitBtn.disabled = true;
                nextBtn.disabled = true;
            });
        }

        function checkAssembledWord() {
            const current = fragments[builderState.index];
            const assembled = builderState.assembled.join('');
            if (assembled === current.complete) {
                builderState.localScore += 10;
                addScore(10, 'Word builder');
                feedbackEl.innerHTML = `<p class="text-green-600 font-semibold">Correct! "${current.complete}"</p><p class="text-sm">${current.hint}</p>`;
                nextBtn.disabled = false;
            } else {
                markMiss('Word builder miss. Try again.');
                feedbackEl.innerHTML = `<p class="text-rose-600 font-semibold">Not quite. Try different arrangement.</p><p class="text-sm">Hint: ${current.hint}</p>`;
                builderState.assembled = [];
                updateAssembledDisplay();
                submitBtn.disabled = true;
            }
        }

        function updateAssembledDisplay() {
            assembledEl.innerHTML = '';
            builderState.assembled.forEach(fragment => {
                const span = document.createElement('span');
                span.className = 'px-3 py-1 rounded-xl bg-indigo-500 text-white font-semibold';
                span.textContent = fragment;
                assembledEl.appendChild(span);
            });
        }

        function sanitizeBuilderResponse(data) {
            if (!data || !Array.isArray(data.challenges)) return [];
            return data.challenges.map(challenge => {
                const fragments = Array.isArray(challenge.fragments) ? challenge.fragments.map(f => String(f).trim()).filter(Boolean).slice(0, 4) : [];
                return {
                    fragments: fragments.length >= 3 ? fragments.slice(0, 3) : [],
                    complete: challenge.complete ? String(challenge.complete).trim() : '',
                    hint: challenge.hint ? String(challenge.hint).trim() : ''
                };
            }).filter(challenge => challenge.fragments.length >= 3 && challenge.complete);
        }

    }

    function cloneFragments(list) {
        return list.map(fragment => ({
            fragments: [...fragment.fragments],
            complete: fragment.complete,
            hint: fragment.hint
        }));
    }

    function initRhymeMasterGame(container) {
        const fallbackRhymeRounds = [
            {
                target: 'cat',
                options: ['hat', 'dog', 'bat'],
                answer: 'hat',
                tip: 'Words ending with -at sound alike.'
            },
            {
                target: 'sun',
                options: ['run', 'moon', 'fun'],
                answer: 'fun',
                tip: 'Short u sound rhymes with un.'
            },
            {
                target: 'play',
                options: ['day', 'say', 'way'],
                answer: 'day',
                tip: 'Long a sound at the end.'
            }
        ];

        let rhymeRounds = cloneRhymeRounds(fallbackRhymeRounds);

        const rhymeState = {
            round: 0,
            streak: 0,
            localScore: 0,
            locked: false
        };

        container.innerHTML = `
            <div class="space-y-6">
                <p class="text-gray-600 dark:text-gray-300">Gemini crafts rhyming challenges for <strong>${getLanguageLabel()}</strong>. Listen to the target word, then tap the word that rhymes.</p>
                <div class="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Round <strong id="rhyme-round">1</strong> / <span id="rhyme-total">${rhymeRounds.length}</span></span>
                        <button id="rhyme-play" class="text-indigo-600 dark:text-indigo-400 font-semibold">🔊 Hear target</button>
                    </div>
                    <p id="rhyme-target" class="mt-4 text-2xl font-bold text-gray-900 dark:text-white"></p>
                </div>
                <div id="rhyme-options" class="grid gap-4 sm:grid-cols-3"></div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-300">Correct streak: <strong id="rhyme-streak">0</strong></span>
                    <button id="rhyme-next" class="px-5 py-2 rounded-xl bg-indigo-500 text-white font-semibold disabled:opacity-60" disabled>Next word</button>
                </div>
                <div id="rhyme-feedback" class="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">Listen to the target to see options.</div>
            </div>
        `;

        const targetEl = container.querySelector('#rhyme-target');
        const roundEl = container.querySelector('#rhyme-round');
        const totalEl = container.querySelector('#rhyme-total');
        const streakEl = container.querySelector('#rhyme-streak');
        const optionsEl = container.querySelector('#rhyme-options');
        const nextBtn = container.querySelector('#rhyme-next');
        const playBtn = container.querySelector('#rhyme-play');
        const feedbackEl = container.querySelector('#rhyme-feedback');

        renderRhymeRound();
        loadRhymeRounds();

        playBtn.addEventListener('click', () => {
            const current = rhymeRounds[rhymeState.round];
            if (!current) return;
            speakText(current.target);
            setStatus(`Target played: "${current.target}"`, 'info');
        });

        nextBtn.addEventListener('click', () => {
            if (nextBtn.dataset.mode === 'refresh') {
                nextBtn.dataset.mode = '';
                nextBtn.textContent = 'Next word';
                nextBtn.disabled = true;
                loadRhymeRounds();
                return;
            }

            rhymeState.round += 1;
            if (rhymeState.round >= rhymeRounds.length) {
                feedbackEl.innerHTML = `<p class="text-lg font-semibold text-green-600">Rhyme deck complete! Local score: ${rhymeState.localScore}.</p>`;
                nextBtn.textContent = '♻️ New deck';
                nextBtn.dataset.mode = 'refresh';
                nextBtn.disabled = false;
                return;
            }
            rhymeState.locked = false;
            nextBtn.disabled = true;
            renderRhymeRound();
        });

        function renderRhymeRound() {
            const current = rhymeRounds[rhymeState.round];
            if (!current) {
                feedbackEl.textContent = 'Loading rhyme challenges...';
                return;
            }
            totalEl.textContent = rhymeRounds.length;
            roundEl.textContent = `${rhymeState.round + 1}`;
            targetEl.textContent = current.target;
            optionsEl.innerHTML = '';
            feedbackEl.textContent = 'Listen to the target to see options.';

            current.options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'rounded-2xl border border-gray-200 dark:border-gray-800 p-4 font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 hover:border-indigo-400 transition text-left';
                btn.innerHTML = `<span class="text-lg">${option}</span>`;
                btn.addEventListener('click', () => evaluateRhymeOption(option, btn, current));
                optionsEl.appendChild(btn);
            });
        }

        function evaluateRhymeOption(option, btn, roundData) {
            if (rhymeState.locked) return;
            rhymeState.locked = true;
            const allButtons = optionsEl.querySelectorAll('button');
            allButtons.forEach(b => b.classList.add('opacity-70'));
            btn.classList.remove('opacity-70');

            if (option === roundData.answer) {
                btn.classList.add('border-emerald-400');
                feedbackEl.innerHTML = `<p class="text-green-600 font-semibold">Perfect rhyme!</p><p class="text-sm">${roundData.tip}</p>`;
                rhymeState.localScore += 7;
                rhymeState.streak += 1;
                addScore(7, 'Rhyme master');
            } else {
                btn.classList.add('border-rose-400');
                feedbackEl.innerHTML = `<p class="text-rose-600 font-semibold">Not a rhyme.</p><p class="text-sm">Hint: ${roundData.tip}</p>`;
                rhymeState.streak = 0;
                markMiss('Rhyme miss. Try the next target!');
            }

            streakEl.textContent = rhymeState.streak;
            nextBtn.disabled = false;
        }

        async function loadRhymeRounds() {
            feedbackEl.textContent = 'Generating new rhyme challenges...';
            const langLabel = getLanguageLabel();
            const prompt = `Create 3 rhyming challenges for ${langLabel} (${preferenceState.language}). Each challenge should include "target" (a word), three "options" (one that rhymes with target, two that don't), the correct "answer" (the rhyming word), and a helpful "tip". Respond as JSON: {"rounds":[{"target":"","options":["","",""],"answer":"","tip":""},...]}`;
            const response = await requestAiJson(prompt, {
                onError: (msg) => feedbackEl.textContent = `Using preset rhymes (${msg || 'AI unavailable'}).`
            });
            const aiRounds = sanitizeRhymeResponse(response);
            rhymeRounds = aiRounds.length ? aiRounds : cloneRhymeRounds(fallbackRhymeRounds);
            rhymeState.round = 0;
            rhymeState.locked = false;
            rhymeState.streak = 0;
            rhymeState.localScore = 0;
            nextBtn.dataset.mode = '';
            nextBtn.textContent = 'Next word';
            nextBtn.disabled = true;
            totalEl.textContent = rhymeRounds.length;
            renderRhymeRound();
        }

        function sanitizeRhymeResponse(data) {
            if (!data || !Array.isArray(data.rounds)) return [];
            return data.rounds.map(round => {
                const options = Array.isArray(round.options) ? round.options.map(opt => String(opt).trim()).filter(Boolean).slice(0, 3) : [];
                return {
                    target: round.target ? String(round.target).trim() : '',
                    options: options.length === 3 ? options : [],
                    answer: round.answer ? String(round.answer).trim() : '',
                    tip: round.tip ? String(round.tip).trim() : ''
                };
            }).filter(round => round.target && round.options.length === 3 && round.answer);
        }

        function cloneRhymeRounds(list) {
            return list.map(round => ({
                target: round.target,
                options: [...round.options],
                answer: round.answer,
                tip: round.tip
            }));
        }
    }

    function initVocabularyQuizGame(container) {
        const fallbackVocabRounds = [
            {
                question: 'What does "ephemeral" mean?',
                options: ['Lasting forever', 'Short-lived', 'Very loud', 'Extremely bright'],
                answer: 'Short-lived',
                tip: 'Think of things that don\'t last long.'
            },
            {
                question: 'Choose the synonym for "gregarious":',
                options: ['Shy', 'Outgoing', 'Lazy', 'Angry'],
                answer: 'Outgoing',
                tip: 'Someone who enjoys being with others.'
            },
            {
                question: 'What is the meaning of "ubiquitous"?',
                options: ['Rare', 'Everywhere', 'Expensive', 'Small'],
                answer: 'Everywhere',
                tip: 'Found in many places at once.'
            }
        ];

        let vocabRounds = cloneVocabRounds(fallbackVocabRounds);

        const vocabState = {
            round: 0,
            streak: 0,
            localScore: 0,
            locked: false
        };

        container.innerHTML = `
            <div class="space-y-6">
                <p class="text-gray-600 dark:text-gray-300">Gemini creates vocabulary questions for <strong>${getLanguageLabel()}</strong>. Test your word knowledge!</p>
                <div class="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
                    <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>Round <strong id="vocab-round">1</strong> / <span id="vocab-total">${vocabRounds.length}</span></span>
                    </div>
                    <p id="vocab-question" class="mt-4 text-xl font-bold text-gray-900 dark:text-white"></p>
                </div>
                <div id="vocab-options" class="grid gap-4 sm:grid-cols-2"></div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-300">Correct streak: <strong id="vocab-streak">0</strong></span>
                    <button id="vocab-next" class="px-5 py-2 rounded-xl bg-indigo-500 text-white font-semibold disabled:opacity-60" disabled>Next question</button>
                </div>
                <div id="vocab-feedback" class="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900">Answer the question to see feedback.</div>
            </div>
        `;

        const questionEl = container.querySelector('#vocab-question');
        const roundEl = container.querySelector('#vocab-round');
        const totalEl = container.querySelector('#vocab-total');
        const streakEl = container.querySelector('#vocab-streak');
        const optionsEl = container.querySelector('#vocab-options');
        const nextBtn = container.querySelector('#vocab-next');
        const feedbackEl = container.querySelector('#vocab-feedback');

        renderVocabRound();
        loadVocabRounds();

        nextBtn.addEventListener('click', () => {
            if (nextBtn.dataset.mode === 'refresh') {
                nextBtn.dataset.mode = '';
                nextBtn.textContent = 'Next question';
                nextBtn.disabled = true;
                loadVocabRounds();
                return;
            }

            vocabState.round += 1;
            if (vocabState.round >= vocabRounds.length) {
                feedbackEl.innerHTML = `<p class="text-lg font-semibold text-green-600">Quiz complete! Local score: ${vocabState.localScore}.</p>`;
                nextBtn.textContent = '♻️ New quiz';
                nextBtn.dataset.mode = 'refresh';
                nextBtn.disabled = false;
                return;
            }
            vocabState.locked = false;
            nextBtn.disabled = true;
            renderVocabRound();
        });

        function renderVocabRound() {
            const current = vocabRounds[vocabState.round];
            if (!current) {
                feedbackEl.textContent = 'Loading vocabulary questions...';
                return;
            }
            totalEl.textContent = vocabRounds.length;
            roundEl.textContent = `${vocabState.round + 1}`;
            questionEl.textContent = current.question;
            optionsEl.innerHTML = '';
            feedbackEl.textContent = 'Answer the question to see feedback.';

            current.options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'rounded-2xl border border-gray-200 dark:border-gray-800 p-4 font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 hover:border-indigo-400 transition text-left';
                btn.innerHTML = `<span class="text-lg">${option}</span>`;
                btn.addEventListener('click', () => evaluateVocabOption(option, btn, current));
                optionsEl.appendChild(btn);
            });
        }

        function evaluateVocabOption(option, btn, roundData) {
            if (vocabState.locked) return;
            vocabState.locked = true;
            const allButtons = optionsEl.querySelectorAll('button');
            allButtons.forEach(b => b.classList.add('opacity-70'));
            btn.classList.remove('opacity-70');

            if (option === roundData.answer) {
                btn.classList.add('border-emerald-400');
                feedbackEl.innerHTML = `<p class="text-green-600 font-semibold">Correct!</p><p class="text-sm">${roundData.tip}</p>`;
                vocabState.localScore += 6;
                vocabState.streak += 1;
                addScore(6, 'Vocabulary quiz');
            } else {
                btn.classList.add('border-rose-400');
                feedbackEl.innerHTML = `<p class="text-rose-600 font-semibold">Not quite.</p><p class="text-sm">The correct answer is "${roundData.answer}". ${roundData.tip}</p>`;
                vocabState.streak = 0;
                markMiss('Vocabulary miss. Try the next question!');
            }

            streakEl.textContent = vocabState.streak;
            nextBtn.disabled = false;
        }

        async function loadVocabRounds() {
            feedbackEl.textContent = 'Generating new vocabulary questions...';
            const langLabel = getLanguageLabel();
            const prompt = `Create 3 vocabulary quiz questions for ${langLabel} (${preferenceState.language}). Each question should include "question" (the word/definition query), four "options" (multiple choice answers), the correct "answer", and a helpful "tip". Respond as JSON: {"rounds":[{"question":"","options":["","","",""],"answer":"","tip":""},...]}`;
            const response = await requestAiJson(prompt, {
                onError: (msg) => feedbackEl.textContent = `Using preset questions (${msg || 'AI unavailable'}).`
            });
            const aiRounds = sanitizeVocabResponse(response);
            vocabRounds = aiRounds.length ? aiRounds : cloneVocabRounds(fallbackVocabRounds);
            vocabState.round = 0;
            vocabState.locked = false;
            vocabState.streak = 0;
            vocabState.localScore = 0;
            nextBtn.dataset.mode = '';
            nextBtn.textContent = 'Next question';
            nextBtn.disabled = true;
            totalEl.textContent = vocabRounds.length;
            renderVocabRound();
        }

        function sanitizeVocabResponse(data) {
            if (!data || !Array.isArray(data.rounds)) return [];
            return data.rounds.map(round => {
                const options = Array.isArray(round.options) ? round.options.map(opt => String(opt).trim()).filter(Boolean).slice(0, 4) : [];
                return {
                    question: round.question ? String(round.question).trim() : '',
                    options: options.length === 4 ? options : [],
                    answer: round.answer ? String(round.answer).trim() : '',
                    tip: round.tip ? String(round.tip).trim() : ''
                };
            }).filter(round => round.question && round.options.length === 4 && round.answer);
        }

        function cloneVocabRounds(list) {
            return list.map(round => ({
                question: round.question,
                options: [...round.options],
                answer: round.answer,
                tip: round.tip
            }));
        }
    }
}


