// Show today's date
const today = new Date();
const formattedDate = today.toDateString();
document.getElementById("date-now").textContent = formattedDate;

// On submit
const event_submit = document.querySelector("#event-submit");

event_submit.addEventListener("click", (e) => {
  e.preventDefault();

  // Input fields
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

  // If valid, add list items
  if (execute) {
    // Generate unique ID
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 8; i++) {
      id += chars[Math.floor(Math.random() * chars.length + 1)];
    }

    // Create <li> for event name
    const event_name = document.querySelector("#event-name");
    const event_li = document.createElement("li");
    event_li.innerText = event_type.value;
    event_li.classList.add(id);
    event_name.appendChild(event_li);

    // Create <li> for location
    const location_ul = document.querySelector("#event-location");
    const location_li = document.createElement("li");
    location_li.innerText = location.value;
    location_li.classList.add(id);
    location_ul.appendChild(location_li);

    // Create <li> for date
    const date_ul = document.querySelector("#event-day");
    const date_li = document.createElement("li");
    date_li.innerText = event_date.value;
    date_li.classList.add(id);
    date_ul.appendChild(date_li);

    // Create <li> for remove button
    const remove_ul = document.querySelector("#remove-btn");
    const remove_li = document.createElement("li");
    const remove_btn = document.createElement("button");
    remove_btn.textContent = "Remove";
    remove_btn.setAttribute("data-id", id);
    remove_li.appendChild(remove_btn);
    remove_ul.appendChild(remove_li);

    // Clear input fields
    // arr.forEach((input) => (input.value = ""));
  }
});

// Remove button handler (event delegation)
document.getElementById("remove-btn").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-id");

    // Remove all list items with this ID
    const items = document.querySelectorAll(`.${id}`);
    items.forEach((item) => item.remove());

    // Also remove the remove button's <li>
    e.target.parentElement.remove();
  }
});
