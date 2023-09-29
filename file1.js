document.addEventListener("DOMContentLoaded", function() {
    // Fetch all sets on page load
    fetchSets();
});

function fetchSets() {
    fetch('/sets')
        .then(response => response.json())
        .then(data => {
            const setsList = document.getElementById("setsList");
            setsList.innerHTML = ""; // Clear previous entries
            
            data.sets.forEach(setName => {
                // Fetch each set to get the number of cards
                fetch(`/sets/${setName}`)
                    .then(resp => resp.json())
                    .then(setData => {
                        const li = document.createElement("li");
                        li.textContent = `${setData.name} - ${setData.cards.length} cards`;

                        // Edit Button
                        const editBtn = document.createElement("button");
                        editBtn.textContent = "Edit";
                        editBtn.onclick = () => {
                            window.location.href = `/file2.html?set=${setName}`;
                        };
                        li.appendChild(editBtn);

                        // Quiz Button
                        const quizBtn = document.createElement("button");
                        quizBtn.textContent = "Quiz";
                        quizBtn.onclick = () => {
                            window.location.href = `/file3.html?set=${setName}`;
                        };
                        li.appendChild(quizBtn);

                        // Delete Button
                        const deleteBtn = document.createElement("button");
                        deleteBtn.textContent = "Delete";
                        deleteBtn.onclick = () => {
                            deleteSet(setName);
                        };
                        li.appendChild(deleteBtn);

                        setsList.appendChild(li);
                    });
            });
        })
        .catch(error => {
            console.error("Error fetching sets:", error);
        });
}

function deleteSet(setName) {
    fetch(`/sets/${setName}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchSets(); // Refresh the list
    })
    .catch(error => {
        console.error("Error deleting set:", error);
    });
}

function createSet() {
    const setName = document.getElementById("newSetName").value;
    if (!setName) {
        alert("Please enter a set name!");
        return;
    }

    const newSet = {
        id: new Date().getTime(), // Using timestamp as an ID for simplicity
        name: setName,
        cards: []
    };

    fetch(`/sets/${setName}.json`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSet)
    })
    .then(response => response.json())
    .then(data => {
        fetchSets(); // Refresh the list
    })
    .catch(error => {
        console.error("Error creating set:", error);
    });
}
