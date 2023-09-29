document.addEventListener("DOMContentLoaded", () => {
    displaySetName();
    const startQuizButton = document.getElementById("startQuiz");
    startQuizButton.addEventListener("click", startQuiz);
});

function getQueryStringValue(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

function displaySetName() {
    const setName = getQueryStringValue("set");
    if (setName) {
        document.getElementById('setName').textContent = setName.replace(".json", "");
    }
}

function startQuiz() {
    const hintChoice = document.querySelector('input[name="hint"]:checked').value;
    const isShuffleEnabled = document.getElementById('shuffle').checked ? 'true' : 'false';
    
    const setName = getQueryStringValue("set");
    window.location.href = `quiz.html?set=${setName}&hint=${hintChoice}&shuffle=${isShuffleEnabled}`;
}
