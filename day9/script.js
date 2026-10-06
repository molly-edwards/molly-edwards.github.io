const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const checklist = document.getElementById("checklist");

/* Default Game Day Bag items */
const gameDayBag = [
  {
    name: "Clear stadium bag",
    packed: false
  },
  {
    name: "Gamecock shirt",
    packed: false
  },
  {
    name: "Phone charger",
    packed: false
  },
  {
    name: "Water bottle",
    packed: false
  }
];

/* Adds every item in the array to the website */
function displayChecklist() {
  checklist.innerHTML = "";

  gameDayBag.forEach(function (item, index) {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `bag-item-${index}`;
    checkbox.checked = item.packed;

    checkbox.addEventListener("change", function () {
      gameDayBag[index].packed = checkbox.checked;
    });

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = item.name;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${item.name}`);

    removeButton.addEventListener("click", function () {
      gameDayBag.splice(index, 1);
      displayChecklist();
    });

    listItem.append(checkbox, label, removeButton);
    checklist.append(listItem);
  });
}

/* Adds a typed item into the array when the button is clicked */
itemForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newItemName = itemInput.value.trim();

  if (newItemName === "") {
    return;
  }

  gameDayBag.push({
    name: newItemName,
    packed: false
  });

  displayChecklist();

  itemInput.value = "";
  itemInput.focus();
});

/* Show the default items when the page first loads */
displayChecklist();