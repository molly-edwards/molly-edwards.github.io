const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const checklist = document.getElementById("checklist");

let itemNumber = 1;

itemForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const itemName = itemInput.value.trim();

  if (itemName === "") {
    return;
  }

  itemNumber += 1;

  const listItem = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `bag-item-${itemNumber}`;
  checkbox.name = "packing-item";

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = itemName;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-button";
  removeButton.textContent = "Remove";
  removeButton.setAttribute("aria-label", `Remove ${itemName}`);

  listItem.append(checkbox, label, removeButton);
  checklist.appendChild(listItem);

  itemInput.value = "";
  itemInput.focus();
});

checklist.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-button")) {
    event.target.parentElement.remove();
  }
});