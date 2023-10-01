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
    if (cards.size > 0) {
        const card = cards.current.data;
        const hintType = getQueryStringValue('hint');
        
        // Initially show only hint
        document.getElementById('hint-display').innerText = card[hintType];
        document.getElementById('category-display').style.display = 'none';
        document.getElementById('content-display').style.display = 'none';
    } else {
        document.getElementById('hint-display').innerText = "No more cards";
        document.getElementById('category-display').style.display = 'none';
        document.getElementById('content-display').style.display = 'none';
    }
}

function revealAnswer() {
    if (cards.current == null) {
        displayCard();
        return;
    }
    const card = cards.current.data;
    if (document.getElementById('content-display').style.display === 'none') {
        document.getElementById('hint-display').innerText = card.title;
        document.getElementById('category-display').style.display = 'block';
        document.getElementById('category-display').innerText = card.category;
        document.getElementById('content-display').style.display = 'block';
        document.getElementById('content-display').innerText = card.content;
    } else {
        displayCard();
    }
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
