const constants = [
    "Health Potion",
    "Sword",
    "Shield",
    "Spell Book",
    "Pet Lizard"
];

function loadInventory() {
    const listElement = document.getElementById("item-list");

    listElement.innerHTML = "";

    for(let i=0; i < contents.length; i++)
    {
        let currentItem = contents[i];

        let htmlToInject = "<li>" + currentItem + "</li>";

        listElement.innerHTML += htmlToInject;
    }

    document.querySelector("button").disabled = true;
    document.querySelector("button").innerText = "Backpack Full";
}