// Assuming you're using query parameters to identify the set.
const urlParams = new URLSearchParams(window.location.search);
const setName = urlParams.get('set');

let currentSetData = null;

function fetchSet() {
    fetch(`/sets/${setName}`)
        .then(response => response.json())
        .then(data => {
            currentSetData = data;
            document.getElementById("setName").textContent = data.name;

            const cardsList = document.getElementById("cardsList");
            cardsList.innerHTML = ""; // Clear previous entries
            
            data.cards.forEach((card, index) => {
                const li = document.createElement("li");
                li.textContent = `${card.title} - ${card.category}: ${card.content}`;

                // Edit Button
                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.onclick = () => {
                    // For simplicity, we can directly edit the card here, but a modal/popup would be better
                    const title = prompt("Edit title:", card.title);
                    const category = prompt("Edit category:", card.category);
                    const content = prompt("Edit content:", card.content);
                    if (title && category && content) {
                        card.title = title;
                        card.category = category;
                        card.content = content;
                        saveSet();
                    }
                };
                li.appendChild(editBtn);

                // Delete Button
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = () => {
                    currentSetData.cards.splice(index, 1);
                    saveSet();
                };
                li.appendChild(deleteBtn);

                cardsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching set:", error);
        });
}

function addCard() {
    const title = document.getElementById("titleInput").value;
    const category = document.getElementById("categoryInput").value;
    const content = document.getElementById("contentInput").value;

    if (title && category && content) {
        currentSetData.cards.push({
            title: title,
            category: category,
            content: content
        });
        saveSet();
    } else {
        alert("Please fill in all fields to add a card!");
    }
}

function saveSet() {
    fetch(`/sets/${setName}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentSetData)
    })
    .then(response => response.json())
    .then(data => {
        fetchSet(); // Refresh the list
    })
    .catch(error => {
        console.error("Error saving set:", error);
    });
}

// Initial fetch
fetchSet();
