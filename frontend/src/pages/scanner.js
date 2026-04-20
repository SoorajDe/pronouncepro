function initScannerPage() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="dashboard-container">
            <!-- Header -->
            <div class="glass-card animated-card" style="text-align: center; margin-bottom: 2rem;">
                <h1 class="animated-text" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 2.5rem;">📄 Document Scanner</h1>
                <p class="animated-subtitle" style="color: #666; margin-top: 0.5rem;">Extract text from images and practice pronunciation</p>
            </div>

            <!-- Upload Section -->
            <div class="glass-card animated-card" style="margin-bottom: 2rem;">
                <div class="upload-area">
                    <div class="upload-config" style="display: flex; justify-content: center; margin-bottom: 2rem;">
                        <div class="config-item" style="min-width: 200px;">
                            <label class="config-label" style="font-weight: 500; color: #333;">Voice</label>
                            <select id="voice-select" class="config-select" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 8px; background: rgba(255,255,255,0.8); color: #333;"></select>
                        </div>
                    </div>

                    <div id="upload-zone" class="upload-dropzone" style="border: 2px dashed #ddd; border-radius: 12px; padding: 3rem 2rem; text-align: center; transition: all 0.3s ease; cursor: pointer; background: rgba(255,255,255,0.6);">
                        <div class="upload-content">
                            <div class="upload-icon" style="font-size: 3rem; margin-bottom: 1rem;">📎</div>
                            <div class="upload-text">
                                <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">Drop image here</h3>
                                <p style="color: #666; margin-bottom: 1.5rem;">or click to select file</p>
                            </div>
                            <div class="upload-formats" style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.5rem;">
                                <span style="background: #f0f0f0; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; color: #333;">PNG</span>
                                <span style="background: #f0f0f0; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; color: #333;">JPG</span>
                                <span style="background: #f0f0f0; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500; color: #333;">PDF</span>
                            </div>
                        </div>
                        <input type="file" id="file-picker" accept="image/*,.pdf" hidden>
                    </div>
                </div>
            </div>

            <!-- Processing -->
            <div id="processing-section" class="glass-card animated-card hidden" style="margin-bottom: 2rem;">
                <div class="processing-area" style="display: flex; gap: 2rem; align-items: center;">
                    <div class="processing-preview" style="flex: 1; position: relative;">
                        <img id="preview-image" alt="Document" style="width: 100%; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                        <div class="scan-effect" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
                            <div class="scan-line" style="position: absolute; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, #667eea, transparent); box-shadow: 0 0 20px #667eea; opacity: 0; transition: opacity 0.3s ease;"></div>
                        </div>
                    </div>
                    <div class="processing-status" style="flex: 1;">
                        <h3 style="font-size: 1.5rem; font-weight: bold; color: #333; margin-bottom: 1.5rem;">Processing...</h3>
                        <div class="progress-bar" style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; margin-bottom: 1rem;">
                            <div id="progress-fill" class="progress-fill" style="height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); width: 0%; transition: width 0.3s ease;"></div>
                        </div>
                        <p id="progress-text" style="font-size: 0.9rem; color: #666;">Initializing OCR</p>
                    </div>
                </div>
            </div>

            <!-- Results -->
            <div id="results-section" class="glass-card animated-card hidden">
                <div class="results-area">
                    <div class="results-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #333; margin: 0;">Extracted Text</h2>
                        <div class="results-actions" style="display: flex; gap: 1rem;">
                            <button id="speak-btn" class="action-button speak" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; background: #10b981; color: white;">
                                <span class="action-icon">🔊</span>
                                <span class="action-text">Read Aloud</span>
                            </button>
                            <button id="practice-btn" class="action-button practice" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; background: #f59e0b; color: white;">
                                <span class="action-icon">🎤</span>
                                <span class="action-text">Practice</span>
                            </button>
                            <button id="copy-btn" class="action-button copy" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; background: #6b7280; color: white;">
                                <span class="action-icon">📋</span>
                                <span class="action-text">Copy</span>
                            </button>
                        </div>
                    </div>

                    <!-- Uploaded Image Display -->
                    <div id="results-image-container" class="results-image-container" style="margin-bottom: 2rem; text-align: center;">
                        <img id="results-image" alt="Uploaded Document" style="max-width: 100%; max-height: 300px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); display: none;">
                    </div>

                    <div id="text-display" class="text-content" style="background: rgba(255,255,255,0.8); border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; min-height: 200px; font-size: 1.1rem; line-height: 1.6; color: #333; margin-bottom: 2rem; position: relative; overflow: hidden;">
                        <div class="text-placeholder" style="color: #9ca3af; font-style: italic;">Extracted text will appear here</div>
                    </div>

                    <!-- Practice Mode -->
                    <div id="practice-mode" class="practice-area hidden" style="border-top: 1px solid #e5e7eb; padding-top: 2rem;">
                        <div class="practice-info" style="margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.25rem; font-weight: bold; color: #333; margin-bottom: 0.5rem;">Pronunciation Practice</h3>
                            <p style="color: #666;">Record yourself reading the text</p>
                        </div>
                        <div class="practice-controls" style="text-align: center;">
                            <button id="record-btn" class="record-button" style="display: flex; align-items: center; gap: 0.75rem; background: #ef4444; color: white; border: none; padding: 1rem 2rem; border-radius: 50px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; margin: 0 auto;">
                                <span class="record-icon">🎤</span>
                                <span class="record-label">Start Recording</span>
                            </button>
                        </div>
                        <div id="feedback-display" class="feedback-area hidden" style="margin-top: 1.5rem; padding: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
                            <div class="feedback-content" style="color: #166534; line-height: 1.5;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize Tesseract.js
    let worker = null;
    let extractedText = '';
    let currentImage = null;
    let isReadingAloud = false;
    let currentTargetPhrase = '';
    let speechUtterance = null;
    let currentWordIndex = 0;

    // Function to set current target phrase for practice
    function setCurrentTargetPhrase(text) {
        currentTargetPhrase = text;
    }

    // Get DOM elements
    const uploadZone = document.getElementById('upload-zone');
    const filePicker = document.getElementById('file-picker');
    const processingSection = document.getElementById('processing-section');
    const resultsSection = document.getElementById('results-section');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const previewImage = document.getElementById('preview-image');
    const textDisplay = document.getElementById('text-display');
    const speakBtn = document.getElementById('speak-btn');
    const practiceBtn = document.getElementById('practice-btn');
    const copyBtn = document.getElementById('copy-btn');
    const practiceMode = document.getElementById('practice-mode');
    const recordBtn = document.getElementById('record-btn');
    const feedbackDisplay = document.getElementById('feedback-display');
    const voiceSelect = document.getElementById('voice-select');

    // Populate voices
    function populateVoices() {
        const voices = speechSynthesis.getVoices();
        voiceSelect.innerHTML = voices.map(v => `<option value="${v.name}">${v.name}</option>`).join('');
    }

    // Initialize voices
    speechSynthesis.onvoiceschanged = populateVoices;
    populateVoices();

    // File upload handlers
    uploadZone.addEventListener('click', () => {
        if (!filePicker.disabled) {
            filePicker.click();
        }
    });

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '#667eea';
        uploadZone.style.background = 'rgba(102, 126, 234, 0.1)';
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = '#ddd';
        uploadZone.style.background = 'rgba(255,255,255,0.6)';
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '#ddd';
        uploadZone.style.background = 'rgba(255,255,255,0.6)';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    });

    filePicker.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFiles(files);
        }
        e.target.value = ''; // Reset to allow re-uploading same file
    });

    // Start scanning animation
    function startScanningAnimation() {
        const scanLine = document.querySelector('.scan-line');
        scanLine.style.top = '0%';
        scanLine.style.opacity = '1';

        // Animate scan line
        const duration = 2500; // 2.5 seconds
        const startTime = Date.now();

        function animateScan() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const position = progress * 100;

            scanLine.style.top = position + '%';

            if (progress < 1) {
                requestAnimationFrame(animateScan);
            } else {
                // Fade out scan line
                scanLine.style.opacity = '0';
            }
        }

        requestAnimationFrame(animateScan);
    }

    // Show results with typing animation
    function showResults() {
        processingSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');

        // Display the uploaded image in results
        const resultsImage = document.getElementById('results-image');
        if (currentImage) {
            resultsImage.src = currentImage;
            resultsImage.style.display = 'block';
        }

        // Display extracted text with typing animation
        typeText(textDisplay, extractedText);
    }

    // Typing animation function
    function typeText(element, text) {
        element.innerHTML = '<div class="text-placeholder">Your extracted text will appear here...</div>';
        element.classList.add('typing');

        setTimeout(() => {
            element.innerHTML = '';
            let index = 0;
            const typingSpeed = 25; // milliseconds per character

            function type() {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, typingSpeed);
                } else {
                    element.classList.remove('typing');
                    element.classList.add('typed');
                }
            }

            type();
        }, 500);
    }

    // Speak button functionality with highlighting
    speakBtn.addEventListener('click', () => {
        if (isReadingAloud) {
            speechSynthesis.cancel();
            speakBtn.querySelector('.action-text').textContent = 'Read Aloud';
            speakBtn.classList.remove('active');
            isReadingAloud = false;
            resetTextHighlighting();
        } else {
            const utterance = new SpeechSynthesisUtterance(extractedText);
            const selectedVoice = speechSynthesis.getVoices().find(v => v.name === voiceSelect.value);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            // Split text into words for highlighting
            const words = extractedText.split(' ');
            let wordIndex = 0;

            utterance.onboundary = (event) => {
                if (event.name === 'word') {
                    highlightWord(wordIndex);
                    wordIndex++;
                }
            };

            utterance.onstart = () => {
                speakBtn.querySelector('.action-text').textContent = 'Stop Reading';
                speakBtn.classList.add('active');
                isReadingAloud = true;
                resetTextHighlighting();
            };

            utterance.onend = () => {
                speakBtn.querySelector('.action-text').textContent = 'Read Aloud';
                speakBtn.classList.remove('active');
                isReadingAloud = false;
                resetTextHighlighting();
            };

            speechSynthesis.speak(utterance);
        }
    });

    // Function to highlight word during speech
    function highlightWord(index) {
        const words = extractedText.split(' ');
        if (index < words.length) {
            const highlightedText = words.map((word, i) => {
                if (i < index) {
                    return `<span style="color: #10b981;">${word}</span>`;
                } else if (i === index) {
                    return `<span style="color: #f59e0b; font-weight: bold;">${word}</span>`;
                } else {
                    return `<span style="color: #333;">${word}</span>`;
                }
            }).join(' ');
            textDisplay.innerHTML = highlightedText;
        }
    }

    // Function to reset text highlighting
    function resetTextHighlighting() {
        textDisplay.innerHTML = extractedText;
    }

    // Practice button functionality
    practiceBtn.addEventListener('click', () => {
        practiceMode.classList.remove('hidden');
        setCurrentTargetPhrase(extractedText);
        textDisplay.scrollIntoView({ behavior: 'smooth' });
    });

    // Copy button functionality
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(extractedText);
            const originalText = copyBtn.querySelector('.action-text').textContent;
            copyBtn.querySelector('.action-text').textContent = 'Copied!';
            copyBtn.classList.add('active');
            setTimeout(() => {
                copyBtn.querySelector('.action-text').textContent = originalText;
                copyBtn.classList.remove('active');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    });

    // Record button functionality
    recordBtn.addEventListener('click', () => {
        if (isRecording) {
            recordBtn.classList.remove('recording');
            recordBtn.querySelector('.record-label').textContent = 'Start Recording';
            recognition.stop();
        } else {
            recordBtn.classList.add('recording');
            recordBtn.querySelector('.record-label').textContent = 'Stop Recording';
            try {
                recognition.lang = 'en-US';
                setFinalTranscriptCallback(handleTranscript);
                setInterimTranscriptCallback(handleInterimTranscript);
                recognition.start();
            } catch (err) {
                console.error("Error starting recording:", err);
                showFeedback('Could not start recording. Please try again.');
            }
        }
    });

    // Handle final transcript
    async function handleTranscript(transcript) {
        feedbackDisplay.classList.remove('hidden');
        showFeedback('AI is analyzing your pronunciation...');

        try {
            const prompt = `Analyze pronunciation. Target text: "${extractedText}". User said: "${transcript}". Provide feedback on clarity and accuracy.`;
            const analysis = await callGeminiAPI(prompt);
            showFeedback(analysis);
        } catch (error) {
            console.error('Error analyzing pronunciation:', error);
            showFeedback('Unable to analyze pronunciation at this time. Please try again later.');
        }
    }

    // Handle interim transcript for real-time feedback
    function handleInterimTranscript(transcript) {
        const targetWords = extractedText.toLowerCase().split(/\s+/);
        const userWords = transcript.toLowerCase().split(/\s+/);
        let highlightedText = '';

        targetWords.forEach((targetWord, index) => {
            const userWord = userWords[index] || '';
            let style = 'color: #333;'; // Default color

            if (userWord) {
                if (targetWord === userWord) {
                    style = 'color: #10b981; font-weight: bold;'; // Green for correct
                } else if (targetWord.includes(userWord) || userWord.includes(targetWord)) {
                    style = 'color: #f59e0b; font-weight: bold;'; // Orange for partial
                } else {
                    style = 'color: #ef4444; font-weight: bold;'; // Red for incorrect
                }
            }

            highlightedText += `<span style="${style}">${extractedText.split(/\s+/)[index]}</span> `;
        });

        textDisplay.innerHTML = highlightedText.trim();
    }

    // Show feedback in practice mode
    function showFeedback(message) {
        feedbackDisplay.classList.remove('hidden');
        feedbackDisplay.querySelector('.feedback-content').textContent = message;
    }

    // Add loading indicator for OCR processing
    function showLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'ocr-loading';
        loadingDiv.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5);
            display: flex; align-items: center; justify-content: center; z-index: 50;
        `;
        loadingDiv.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 2rem; text-align: center;">
                <div style="animation: spin 1s linear infinite; border: 4px solid #f3f4f6; border-top: 4px solid #667eea; border-radius: 50%; width: 3rem; height: 3rem; margin: 0 auto 1rem;"></div>
                <p style="font-size: 1.25rem; font-weight: 600; color: #333;">Processing OCR...</p>
                <p style="font-size: 0.9rem; color: #666;">This may take a few moments</p>
            </div>
        `;
        document.body.appendChild(loadingDiv);
    }

    function hideLoadingIndicator() {
        const loadingDiv = document.getElementById('ocr-loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    }

    // Handle files function (fixed to prevent double calls)
    async function handleFiles(files) {
        if (files.length === 0) return;

        const file = files[0];
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Disable upload zone to prevent multiple triggers
        uploadZone.style.pointerEvents = 'none';
        filePicker.disabled = true;

        // Show processing section
        processingSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        showLoadingIndicator();

        // Create image preview
        const reader = new FileReader();
        reader.onload = (e) => {
            currentImage = e.target.result;
            previewImage.src = currentImage;
            previewImage.onload = () => {
                startScanningAnimation();
            };
        };
        reader.readAsDataURL(file);

        // Initialize Tesseract
        if (!worker) {
            progressText.textContent = 'Loading OCR engine...';
            progressFill.style.width = '20%';

            try {
                // Load Tesseract.js from CDN
                const { createWorker } = Tesseract;
                worker = await createWorker();
                progressFill.style.width = '40%';
                progressText.textContent = 'Initializing language model...';

                await worker.loadLanguage('eng');
                await worker.initialize('eng');

                progressFill.style.width = '60%';
                progressText.textContent = 'Processing image...';
            } catch (error) {
                console.error('Tesseract initialization failed:', error);
                progressText.textContent = 'OCR engine failed to load. Please refresh and try again.';
                hideLoadingIndicator();
                uploadZone.style.pointerEvents = 'auto';
                filePicker.disabled = false;
                return;
            }
        }

        // Perform OCR
        try {
            progressFill.style.width = '80%';
            progressText.textContent = 'Extracting text...';

            const { data: { text } } = await worker.recognize(file);
            extractedText = text.trim();

            progressFill.style.width = '100%';
            progressText.textContent = 'Complete!';

            // Show results with fade-in animation
            setTimeout(() => {
                showResults();
                hideLoadingIndicator();
                uploadZone.style.pointerEvents = 'auto';
                filePicker.disabled = false;
            }, 1000);

        } catch (error) {
            console.error('OCR failed:', error);
            progressText.textContent = 'Text extraction failed. Please try again.';
            hideLoadingIndicator();
            uploadZone.style.pointerEvents = 'auto';
            filePicker.disabled = false;
        }
    }
}

// Add scanner-specific CSS
const style = document.createElement('style');
style.textContent = `
    .dashboard-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        min-height: 100vh;
    }

    .glass-card {
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }

    .animated-card {
        animation: fadeInUp 0.6s ease-out;
    }

    .animated-text {
        animation: slideInLeft 0.8s ease-out;
    }

    .animated-subtitle {
        animation: slideInRight 0.8s ease-out 0.2s both;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .upload-dropzone:hover {
        border-color: #667eea !important;
        background: rgba(102, 126, 234, 0.1) !important;
    }

    .scan-line {
        position: absolute;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, transparent, #667eea, transparent);
        box-shadow: 0 0 20px #667eea;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .text-content.typing::after {
        content: '|';
        animation: blink 1s infinite;
    }

    .text-content.typed {
        animation: fadeIn 0.5s ease;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .action-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .action-button.active {
        transform: scale(0.95);
    }

    .record-button:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
    }

    .record-button.recording {
        background: #dc2626;
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .hidden {
        display: none !important;
    }

    /* Responsive design */
    @media (max-width: 768px) {
        .dashboard-container {
            padding: 1rem;
        }

        .glass-card {
            padding: 1.5rem;
        }

        .upload-config {
            flex-direction: column !important;
        }

        .results-header {
            flex-direction: column !important;
            gap: 1rem !important;
            align-items: flex-start !important;
        }

        .results-actions {
            width: 100% !important;
            justify-content: center !important;
        }

        .text-content {
            padding: 1.5rem !important;
            font-size: 1rem !important;
        }

        .processing-area {
            flex-direction: column !important;
            gap: 1.5rem !important;
        }
    }
`;
document.head.appendChild(style);
