let cards = new CircledLinkedList();

function main() {
    resetCards();
}

function prepareCardsArr(cards_arr) {
    if (getQueryStringValue('shuffle') === 'true') {
        cards_arr = cards_arr.sort(() => Math.random() - 0.5); // Shuffle cards
    }
    return cards_arr
}

function getQueryStringValue(key) {
    return new URLSearchParams(window.location.search).get(key);
}

function displayCard() {
    // cur_card = card.data;
    if (cards.size > 0) {
        const card = cards.current.data;
        const hintType = getQueryStringValue('hint');
        document.getElementById('hint-display').innerText = card[hintType];
        document.getElementById('answer-display').style.display = 'none';
        document.getElementById('answer-display').innerText = 
        `
        Title: ${card.title}
        Category: ${card.category}
        Content: ${card.content}
        `;
    }
    else {
        
        document.getElementById('hint-display').innerText = "No more cards";
        document.getElementById('answer-display').style.display = 'none';
    }
}

function revealAnswer() {
    document.getElementById('answer-display').style.display = 'block';
}

function nextCard() {
    // if (currentCardIndex < cards.length - 1) {
        // currentCardIndex++;
    cards.next();
    displayCard();
    // }
}

function previousCard() {
    cards.prev();
    displayCard();
}

function removeCard() {
    cards.remove();
    displayCard();
}

function resetCards() {
    cards = new CircledLinkedList();    
    const setName = getQueryStringValue("set");
    fetch(`/sets/${setName}`)
        .then(response => response.json())
        .then(data => {
            let cards_arr = prepareCardsArr(data.cards);
            cards.fill(cards_arr);
            displayCard();
        });
}

// Load the set of cards and start the quiz
main();
