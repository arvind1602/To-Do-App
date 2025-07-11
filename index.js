// Show today's date
const today = new Date();
const formattedDate = today.toDateString();
document.getElementById("date-now").textContent = formattedDate;

// Load stored todos on page load
window.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => renderTodo(todo));
});

const event_submit = document.querySelector("#event-submit");

event_submit.addEventListener("click", (e) => {
  e.preventDefault();

  const event_type = document.querySelector("#event");
  const location = document.querySelector("#location");
  const event_date = document.querySelector("#event-date");

  const arr = [event_type, location, event_date];
  let execute = true;

  // Validate
  arr.forEach((input) => {
    if (input.value === "") {
      input.style.border = "1px solid red";
      setTimeout(() => (input.style.border = "1px solid #ccc"), 3000);
      execute = false;
    }
  });

  if (execute) {
    // Generate unique ID
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }

    const todo = {
      id,
      name: event_type.value,
      location: location.value,
      date: event_date.value
    };

    // Save to localStorage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    // Render on screen
    renderTodo(todo);

    // Clear inputs
    arr.forEach((input) => input.value = "");
  }
});

// Function to render a todo item to the page
function renderTodo({ id, name, location, date }) {
  const event_name = document.querySelector("#event-name");
  const location_ul = document.querySelector("#event-location");
  const date_ul = document.querySelector("#event-day");
  const remove_ul = document.querySelector("#remove-btn");

  const name_li = document.createElement("li");
  name_li.innerText = name;
  name_li.classList.add(id);
  event_name.appendChild(name_li);

  const location_li = document.createElement("li");
  location_li.innerText = location;
  location_li.classList.add(id);
  location_ul.appendChild(location_li);

  const date_li = document.createElement("li");
  date_li.innerText = date;
  date_li.classList.add(id);
  date_ul.appendChild(date_li);

  const remove_li = document.createElement("li");
  const remove_btn = document.createElement("button");
  remove_btn.textContent = "Remove";
  remove_btn.setAttribute("data-id", id);
  remove_li.appendChild(remove_btn);
  remove_ul.appendChild(remove_li);
}

// Remove from both screen and localStorage
document.getElementById("remove-btn").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-id");

    // Remove from DOM
    document.querySelectorAll(`.${id}`).forEach((item) => item.remove());
    e.target.parentElement.remove();

    // Remove from localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});
