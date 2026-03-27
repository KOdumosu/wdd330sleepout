const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();

  if (email === "") {
    message.textContent = "Please enter an email.";
    message.style.color = "red";
    return;
  }

  // Save emails locally
  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
  subscribers.push(email);
  localStorage.setItem("subscribers", JSON.stringify(subscribers));

  message.textContent = "Subscribed successfully!";
  message.style.color = "green";

  form.reset();
});