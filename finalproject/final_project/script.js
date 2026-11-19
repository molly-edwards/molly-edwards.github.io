"use strict";

// Arrays store the entries for each tracker.
const trackers = ["macros", "workouts", "assignments", "habits"];

const data = {
  macros: [],
  workouts: [],
  assignments: [],
  habits: []
};

const message = document.getElementById("message");

// Return today's date using the device's local time.
function today() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function showMessage(text) {
  message.textContent = text;
}

// Create HTML elements safely using textContent.
function makeElement(tag, text, className) {
  const element = document.createElement(tag);

  if (text !== undefined) {
    element.textContent = text;
  }

  if (className) {
    element.className = className;
  }

  return element;
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Save before changing the array so a failed save does not lose old entries.
function saveEntries(type, entries = data[type], announce = true) {
  try {
    localStorage.setItem(
      `healthyLifestyle-${type}`,
      JSON.stringify(entries)
    );

    data[type] = entries;
    render(type);

    if (announce) {
      showMessage("Changes saved in this browser.");
    }

    return true;
  } catch (error) {
    showMessage(
      "Could not save. Browser storage may be full or disabled. " +
      "Try a smaller attachment or check your browser settings."
    );

    return false;
  }
}

function loadEntries(type, announce = true) {
  try {
    const saved = localStorage.getItem(`healthyLifestyle-${type}`);
    const entries = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(entries)) {
      throw new Error("Invalid saved entries");
    }

    data[type] = entries;
    render(type);

    if (announce) {
      showMessage("Saved entries loaded.");
    }
  } catch (error) {
    showMessage("Could not load the saved entries for this section.");
  }
}

// Navigation: show the selected section.
function showPage() {
  const requestedPage = window.location.hash.slice(1);
  const pages = ["home", ...trackers];

  const page = pages.includes(requestedPage)
    ? requestedPage
    : "home";

  document.querySelectorAll("main > section").forEach(section => {
    section.hidden = section.id !== page;
  });

  document.querySelectorAll("nav a").forEach(link => {
    if (link.hash === `#${page}`) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("hashchange", showPage);

// Shared remove button.
function createRemoveButton(type, item) {
  const button = makeElement("button", "Remove", "remove-button");
  button.type = "button";

  button.setAttribute(
    "aria-label",
    `Remove ${item.food || item.exercise || item.title}`
  );

  button.addEventListener("click", () => {
    const updated = data[type].filter(entry => entry.id !== item.id);
    saveEntries(type, updated);
  });

  return button;
}

function showEmptyList(list, text) {
  list.appendChild(makeElement("li", text));
}

// ---------- MACROS ----------

const macroForm = document.getElementById("macro-form");
const macroDate = document.getElementById("macro-date");

macroForm.addEventListener("submit", event => {
  event.preventDefault();

  const values = new FormData(macroForm);
  const food = values.get("food").trim();

  if (!food) {
    showMessage("Please enter a food name.");
    return;
  }

  const entry = {
    id: createId(),
    date: values.get("date"),
    food: food,
    protein: Number(values.get("protein")),
    carbs: Number(values.get("carbs")),
    fat: Number(values.get("fat"))
  };

  if (saveEntries("macros", [...data.macros, entry])) {
    macroDate.value = entry.date;
    renderMacros();

    macroForm.reset();
    macroForm.elements.date.value = entry.date;
  }
});

macroDate.addEventListener("change", renderMacros);

function renderMacros() {
  const list = document.getElementById("macro-list");
  list.replaceChildren();

  const entries = data.macros.filter(item => {
    return item.date === macroDate.value;
  });

  let protein = 0;
  let carbs = 0;
  let fat = 0;

  entries.forEach(item => {
    protein += item.protein;
    carbs += item.carbs;
    fat += item.fat;

    const row = makeElement("li");

    const description = makeElement(
      "span",
      `${item.food} — Protein: ${item.protein} g, ` +
      `Carbs: ${item.carbs} g, Fat: ${item.fat} g`,
      "entry-text"
    );

    row.append(description, createRemoveButton("macros", item));
    list.appendChild(row);
  });

  document.getElementById("macro-totals").textContent =
    `Daily totals — Protein: ${protein.toFixed(1)} g | ` +
    `Carbs: ${carbs.toFixed(1)} g | Fat: ${fat.toFixed(1)} g`;

  if (entries.length === 0) {
    showEmptyList(list, "No foods recorded for this date.");
  }
}

// ---------- WORKOUTS ----------

const workoutForm = document.getElementById("workout-form");

workoutForm.addEventListener("submit", event => {
  event.preventDefault();

  const values = new FormData(workoutForm);
  const exercise = values.get("exercise").trim();

  if (!exercise) {
    showMessage("Please enter an exercise name.");
    return;
  }

  const entry = {
    id: createId(),
    date: values.get("date"),
    exercise: exercise,
    sets: Number(values.get("sets")),
    reps: Number(values.get("reps")),
    weight: values.get("weight")
  };

  if (saveEntries("workouts", [...data.workouts, entry])) {
    workoutForm.reset();
    workoutForm.elements.date.value = entry.date;
  }
});

function renderWorkouts() {
  const list = document.getElementById("workout-list");
  list.replaceChildren();

  const entries = [...data.workouts].sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  entries.forEach(item => {
    const row = makeElement("li");

    const weight = item.weight !== ""
      ? ` | Weight: ${item.weight} lb`
      : "";

    const description = makeElement(
      "span",
      `${item.date} — ${item.exercise} | ` +
      `${item.sets} sets × ${item.reps} reps${weight}`,
      "entry-text"
    );

    row.append(description, createRemoveButton("workouts", item));
    list.appendChild(row);
  });

  if (entries.length === 0) {
    showEmptyList(list, "No exercises recorded yet.");
  }
}

// ---------- ASSIGNMENTS ----------

const assignmentForm = document.getElementById("assignment-form");

// Convert a small attachment into text that localStorage can store.
function readAttachment(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        name: file.name,
        content: reader.result
      });
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

assignmentForm.addEventListener("submit", async event => {
  event.preventDefault();

  const values = new FormData(assignmentForm);
  const title = values.get("title").trim();
  const course = values.get("course").trim();
  const file = values.get("attachment");

  if (!title || !course) {
    showMessage("Please enter an assignment name and class.");
    return;
  }

  if (file.name && file.size > 1024 * 1024) {
    showMessage("Please choose a file that is 1 MB or smaller.");
    return;
  }

  const submitButton = assignmentForm.querySelector(
    'button[type="submit"]'
  );

  submitButton.disabled = true;

  try {
    const attachment = file.name
      ? await readAttachment(file)
      : null;

    const entry = {
      id: createId(),
      title: title,
      course: course,
      due: values.get("due"),
      completed: false,
      attachment: attachment
    };

    if (saveEntries("assignments", [...data.assignments, entry])) {
      assignmentForm.reset();
    }
  } catch (error) {
    showMessage("Could not read the attachment. Please try another file.");
  } finally {
    submitButton.disabled = false;
  }
});

function renderAssignments() {
  const list = document.getElementById("assignment-list");
  list.replaceChildren();

  const entries = [...data.assignments].sort((a, b) => {
    return a.due.localeCompare(b.due);
  });

  entries.forEach(item => {
    const row = makeElement("li");
    row.classList.toggle("completed", item.completed);

    const label = makeElement("label", undefined, "check-label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = item.completed;

    checkbox.addEventListener("change", () => {
      const updated = data.assignments.map(entry => {
        return entry.id === item.id
          ? { ...entry, completed: checkbox.checked }
          : entry;
      });

      if (!saveEntries("assignments", updated)) {
        checkbox.checked = item.completed;
      }
    });

    const overdue = !item.completed && item.due < today()
      ? " (overdue)"
      : "";

    const description = makeElement(
      "span",
      `${item.title} | ${item.course} | Due: ${item.due}${overdue}`,
      "entry-text"
    );

    label.append(checkbox, description);
    row.appendChild(label);

    if (item.attachment) {
      const download = makeElement(
        "a",
        `Download ${item.attachment.name}`
      );

      download.href = item.attachment.content;
      download.download = item.attachment.name;

      row.appendChild(download);
    }

    row.appendChild(createRemoveButton("assignments", item));
    list.appendChild(row);
  });

  if (entries.length === 0) {
    showEmptyList(list, "No assignments added yet.");
  }
}

// ---------- HABITS ----------

const habitForm = document.getElementById("habit-form");
const habitDate = document.getElementById("habit-date");

habitForm.addEventListener("submit", event => {
  event.preventDefault();

  const values = new FormData(habitForm);
  const title = values.get("title").trim();

  if (!title) {
    showMessage("Please enter a habit.");
    return;
  }

  const entry = {
    id: createId(),
    title: title,
    completedDates: []
  };

  if (saveEntries("habits", [...data.habits, entry])) {
    habitForm.reset();
  }
});

habitDate.addEventListener("change", renderHabits);

function renderHabits() {
  const list = document.getElementById("habit-list");
  list.replaceChildren();

  const selectedDate = habitDate.value;

  data.habits.forEach(item => {
    const row = makeElement("li");
    const label = makeElement("label", undefined, "check-label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = item.completedDates.includes(selectedDate);

    row.classList.toggle("completed", checkbox.checked);

    checkbox.addEventListener("change", () => {
      const completedDates = item.completedDates.filter(date => {
        return date !== selectedDate;
      });

      if (checkbox.checked) {
        completedDates.push(selectedDate);
      }

      const updated = data.habits.map(entry => {
        return entry.id === item.id
          ? { ...entry, completedDates: completedDates }
          : entry;
      });

      if (!saveEntries("habits", updated)) {
        checkbox.checked = item.completedDates.includes(selectedDate);
      }
    });

    const description = makeElement(
      "span",
      item.title,
      "entry-text"
    );

    label.append(checkbox, description);
    row.append(label, createRemoveButton("habits", item));
    list.appendChild(row);
  });

  if (data.habits.length === 0) {
    showEmptyList(list, "No habits added yet.");
  }
}

// ---------- SAVE, LOAD, AND STARTUP ----------

function render(type) {
  if (type === "macros") renderMacros();
  if (type === "workouts") renderWorkouts();
  if (type === "assignments") renderAssignments();
  if (type === "habits") renderHabits();
}

document.querySelectorAll("[data-save]").forEach(button => {
  button.addEventListener("click", () => {
    saveEntries(button.dataset.save);
  });
});

document.querySelectorAll("[data-load]").forEach(button => {
  button.addEventListener("click", () => {
    loadEntries(button.dataset.load);
  });
});

// Set initial dates without filling assignment due dates.
document.querySelectorAll('input[type="date"]').forEach(input => {
  if (input.name !== "due") {
    input.value = today();
  }
});

// Restore entries when the website opens.
trackers.forEach(type => {
  loadEntries(type, false);
});

showPage();