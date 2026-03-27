// Newsletter signup with enhanced feedback
const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const subscribeBtn = document.getElementById("subscribe-btn");

// Function to show messages with different types
function showMessage(text, type) {
  message.textContent = text;
  message.className = type; // 'success', 'error', or 'loading'
  message.style.display = "block";
  
  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      message.style.display = "none";
    }, 5000);
  }
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to check if email already subscribed
function isAlreadySubscribed(email) {
  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
  return subscribers.includes(email);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();

  // Validate email is not empty
  if (email === "") {
    showMessage("❌ Please enter an email address.", "error");
    emailInput.focus();
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    showMessage("❌ Please enter a valid email address (e.g., name@example.com).", "error");
    emailInput.focus();
    return;
  }

  // Check if already subscribed
  if (isAlreadySubscribed(email)) {
    showMessage("📧 This email is already subscribed to our newsletter!", "error");
    emailInput.value = "";
    emailInput.focus();
    return;
  }

  // Show loading state
  const originalButtonText = subscribeBtn.textContent;
  subscribeBtn.disabled = true;
  subscribeBtn.textContent = "Subscribing...";
  showMessage("Subscribing, please wait...", "loading");

  // Simulate network delay (you can replace this with actual API call)
  setTimeout(() => {
    try {
      // Save email to localStorage
      let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
      subscribers.push(email);
      localStorage.setItem("subscribers", JSON.stringify(subscribers));
      
      // Show success message
      showMessage(`✅ Success! ${email} has been subscribed to our newsletter.`, "success");
      
      // Reset form
      form.reset();
      emailInput.focus();
      
      // Optional: Log all subscribers (for debugging)
      console.log("Current subscribers:", subscribers);
      
    } catch (error) {
      // Show error message if something goes wrong
      showMessage("❌ Oops! Something went wrong. Please try again.", "error");
      console.error("Subscription error:", error);
    } finally {
      // Reset button state
      subscribeBtn.disabled = false;
      subscribeBtn.textContent = originalButtonText;
    }
  }, 800); // Simulates 0.8 second network delay
});