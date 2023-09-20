
console.log("Tushar")

// Get references to the buttons and images
const btnWaiting = document.getElementById("btn-waiting");
const btnNew = document.getElementById("btn-new");
const btnCompleted = document.getElementById("btn-completed");


const content_waiting_container = document.getElementById("waiting_container");
const content_new_container = document.getElementById("new_container");
const content_completed_container = document.getElementById("completed_container");


// Add event listeners to the buttons
btnWaiting.addEventListener("click", showWaiting);
btnNew.addEventListener("click", showNew);
btnCompleted.addEventListener("click", showDiscounted);

// Function to show upcoming images and hide the rest
function showWaiting() {
  content_new_container.style.display = "none";
  content_completed_container.style.display = "none";
  content_waiting_container.style.display = "block";
}

// Function to show new images and hide the rest
function showNew() {
    content_waiting_container.style.display = "none";
    content_completed_container.style.display = "none";
    content_new_container.style.display = "block";
}

// Function to show discounted images and hide the rest
function showDiscounted() {
    content_new_container.style.display = "none";
    content_waiting_container.style.display = "none";
    content_completed_container.style.display = "block";
}

