function initRoleplayPage() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-8">
            <!-- Header Section -->
            <div class="text-center space-y-4">
                <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </div>
                <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Conversational Roleplay</h1>
                <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Practice real-world conversations with an AI partner in multiple languages</p>
            </div>

            <!-- Settings Panel -->
            <div class="glass-card p-8 space-y-6">
                <div class="text-center">
                    <h2 class="text-2xl font-semibold mb-2">Choose Your Scenario</h2>
                    <p class="text-gray-600 dark:text-gray-400">Select a language and conversation scenario to begin</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <label for="r-lang" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <span class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                                </svg>
                                Language
                            </span>
                        </label>
                        <select id="r-lang" class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"></select>
                    </div>

                    <div class="space-y-3">
                        <label for="r-scenario" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <span class="flex items-center gap-2">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                Scenario
                            </span>
                        </label>
                        <select id="r-scenario" class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"></select>
                    </div>
                </div>

                <!-- Scenario Preview -->
                <div id="scenario-preview" class="hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 dark:text-white">Scenario Preview</h4>
                            <p id="scenario-description" class="text-sm text-gray-600 dark:text-gray-400"></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chat Interface -->
            <div class="glass-card p-6">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-semibold flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        Conversation
                    </h2>
                    <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <div id="conversation-status" class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                            Ready to start
                        </div>
                    </div>
                </div>

                <div id="chat-box" class="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"></div>

                <!-- Recording Controls -->
                <div class="mt-6 flex items-center justify-center">
                    <div class="relative">
                        <button id="r-record" class="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                            </svg>
                        </button>

                        <!-- Recording Indicator -->
                        <div id="recording-indicator" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 transition-opacity duration-300">
                            <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>

                        <!-- Voice Level Indicator -->
                        <div id="voice-level" class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 transition-opacity duration-300">
                            <div class="w-1 h-4 bg-red-400 rounded-full"></div>
                            <div class="w-1 h-6 bg-red-400 rounded-full"></div>
                            <div class="w-1 h-8 bg-red-400 rounded-full"></div>
                            <div class="w-1 h-6 bg-red-400 rounded-full"></div>
                            <div class="w-1 h-4 bg-red-400 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <!-- Recording Instructions -->
                <div class="text-center mt-4">
                    <p id="recording-instructions" class="text-sm text-gray-600 dark:text-gray-400">
                        Click the microphone to start speaking
                    </p>
                </div>
            </div>
        </div>
    `;
    
    const langSelect = document.getElementById('r-lang');
    const scenarioSelect = document.getElementById('r-scenario');
    const chatBox = document.getElementById('chat-box');
    const recordBtn = document.getElementById('r-record');
    
    let currentLang = 'en-US';
    const scenarios = {
        "coffee": "Ordering a coffee at a cafe.",
        "interview": "A job interview for a software developer role.",
        "directions": "Asking a stranger for directions to the library."
    };

    // Populate dropdowns
    for (const code in languages) {
        langSelect.innerHTML += `<option value="${code}">${languages[code]}</option>`;
    }
    for (const key in scenarios) {
        scenarioSelect.innerHTML += `<option value="${key}">${scenarios[key]}</option>`;
    }

    // Get UI elements
    const scenarioPreview = document.getElementById('scenario-preview');
    const scenarioDescription = document.getElementById('scenario-description');
    const conversationStatus = document.getElementById('conversation-status');
    const recordingIndicator = document.getElementById('recording-indicator');
    const voiceLevel = document.getElementById('voice-level');
    const recordingInstructions = document.getElementById('recording-instructions');

    let conversationHistory = [];

    // Update scenario preview
    function updateScenarioPreview() {
        const selectedScenario = scenarioSelect.value;
        if (selectedScenario && scenarios[selectedScenario]) {
            scenarioDescription.textContent = scenarios[selectedScenario];
            scenarioPreview.classList.remove('hidden');
        } else {
            scenarioPreview.classList.add('hidden');
        }
    }

    async function startConversation() {
        chatBox.innerHTML = '';
        currentLang = langSelect.value;
        const scenario = scenarios[scenarioSelect.value];
        const prompt = `You are an AI roleplay partner. The user wants to practice a conversation. The scenario is: "${scenario}". The conversation must be in ${languages[currentLang]}. Start the conversation with a greeting or question in ${languages[currentLang]}. After each of the user's responses, you must reply in character in ${languages[currentLang]} and ALSO provide a short, one-sentence pronunciation feedback in English in parentheses.`;

        updateConversationStatus('Preparing scenario...', 'bg-yellow-400');
        addMessage('system', 'AI is preparing the scenario...');
        const firstResponse = await callGeminiAPI(prompt);
        conversationHistory = [{ role: "user", parts: [{ text: prompt }] }, { role: "model", parts: [{ text: firstResponse }] }];

        const [mainResponse, feedback] = parseRoleplayResponse(firstResponse);
        addMessage('ai', mainResponse, feedback);
        updateConversationStatus('Ready to respond', 'bg-green-400');
    }

    function updateConversationStatus(message, dotColor) {
        conversationStatus.innerHTML = `
            <div class="w-2 h-2 ${dotColor} rounded-full"></div>
            ${message}
        `;
    }

    function addMessage(sender, text, feedback = '') {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('flex', 'mb-4');

        if (sender === 'user') {
            messageDiv.classList.add('justify-end');
            messageDiv.innerHTML = `
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs lg:max-w-md shadow-lg">
                    <p class="text-sm">${text}</p>
                    <div class="flex items-center mt-1">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-xs opacity-75">You</span>
                    </div>
                </div>
            `;
        } else if (sender === 'ai') {
            messageDiv.classList.add('justify-start');
            messageDiv.innerHTML = `
                <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs lg:max-w-md shadow-lg">
                    <p class="text-sm text-gray-900 dark:text-white">${text}</p>
                    ${feedback ? `<p class="text-xs text-purple-600 dark:text-purple-400 mt-2 font-medium">${feedback}</p>` : ''}
                    <div class="flex items-center mt-1">
                        <svg class="w-3 h-3 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-xs text-gray-500 dark:text-gray-400">AI Assistant</span>
                    </div>
                </div>
            `;
        } else {
            messageDiv.classList.add('justify-center');
            messageDiv.innerHTML = `
                <div class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-xs">
                    ${text}
                </div>
            `;
        }

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function parseRoleplayResponse(response) {
        const feedbackMatch = response.match(/\(([^)]+)\)/);
        const feedback = feedbackMatch ? `(Feedback: ${feedbackMatch[1]})` : "";
        const mainResponse = response.replace(/\(([^)]+)\)/, '').trim();
        return [mainResponse, feedback];
    }

    async function handleRoleplayTranscript(transcript) {
        addMessage('user', transcript);
        conversationHistory.push({ role: "user", parts: [{ text: transcript }] });

        const prompt = `Continue the conversation in ${languages[currentLang]}. The last thing the user said was: "${transcript}". Respond in character in ${languages[currentLang]} and provide pronunciation feedback in English in parentheses.`;
        
        const response = await callGeminiAPI(prompt);
        conversationHistory.push({ role: "model", parts: [{ text: response }] });
        
        const [mainResponse, feedback] = parseRoleplayResponse(response);
        addMessage('ai', mainResponse, feedback);
    }

    // Enhanced recording functionality with visual feedback
    recordBtn.addEventListener('click', () => {
        if (isRecording) {
            recognition.stop();
            recordingIndicator.style.opacity = '0';
            voiceLevel.style.opacity = '0';
            recordingInstructions.textContent = 'Click the microphone to start speaking';
            updateConversationStatus('Ready to respond', 'bg-green-400');
        } else {
            recognition.lang = currentLang;
            setFinalTranscriptCallback(handleRoleplayTranscript);
            recognition.start();
            recordingIndicator.style.opacity = '1';
            voiceLevel.style.opacity = '1';
            recordingInstructions.textContent = 'Listening... Click to stop';
            updateConversationStatus('Listening...', 'bg-red-400');
        }
    });

    // Add scenario preview on change
    scenarioSelect.addEventListener('change', () => {
        updateScenarioPreview();
        startConversation();
    });

    langSelect.addEventListener('change', startConversation);

    // Initialize scenario preview
    updateScenarioPreview();
    startConversation();
}
