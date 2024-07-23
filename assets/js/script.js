// Create a SpeechSynthesisUtterance instance
const speech = new SpeechSynthesisUtterance();

// Get available voices (you can customize this part)
let voices = [];
const voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });
};

// Change the selected voice based on user selection
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Start speaking when the "Listen" button is clicked
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

// Stop speaking when the "Stop" button is clicked
document.querySelector("button:last-child").addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
