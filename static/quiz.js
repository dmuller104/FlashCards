let cards = [];
let currentCardIndex = 0;

function getQueryStringValue(key) {
    return new URLSearchParams(window.location.search).get(key);
}

function fetchSet() {
    const setName = getQueryStringValue("set");
    fetch(`/sets/${setName}`)
        .then(response => response.json())
        .then(data => {
            cards = data.cards;
            if (getQueryStringValue('shuffle') === 'true') {
                cards = cards.sort(() => Math.random() - 0.5); // Shuffle cards
            }
            displayCard();
        });
}

function displayCard() {
    const card = cards[currentCardIndex];
    const hintType = getQueryStringValue('hint');
    document.getElementById('hint-display').innerText = card[hintType];
    document.getElementById('answer-display').style.display = 'none';
    document.getElementById('answer-display').innerText = `
        Title: ${card.title}
        Category: ${card.category}
        Content: ${card.content}
    `;
}

function revealAnswer() {
    document.getElementById('answer-display').style.display = 'block';
}

function nextCard() {
    if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
        displayCard();
    }
}

function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        displayCard();
    }
}

// Load the set of cards and start the quiz
fetchSet();
