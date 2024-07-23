const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resultTextarea = document.getElementById('result');
const languageSelect = document.getElementById('languageSelect');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resultTextarea.value = '';
};

recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }
    resultTextarea.value = finalTranscript + interimTranscript;
};

recognition.onerror = (event) => {
    console.error('Speech recognition error detected: ' + event.error);
};

recognition.onend = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
};

startBtn.addEventListener('click', () => {
    recognition.lang = languageSelect.value;
    recognition.start();
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
});
