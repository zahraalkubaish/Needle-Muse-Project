// ===== Member Dashboard - Extra Functionality (Phase 3) =====
// Upcoming offering reminder: live countdown + "Remind me later" (24h snooze)

// 1) Date & time of the member's next pending offering (Sewing Basics Class)
//    Months start from 0 in JavaScript, so 11 = December
var nextOfferingDate = new Date(2026, 11, 1, 10, 0, 0); // 1 Dec 2026, 10:00 AM

// 2) Grab the elements
var reminderBox = document.getElementById("reminder-box");
var countdownText = document.getElementById("reminder-details");
var hideButton = document.getElementById("hide-reminder");
var showButton = document.getElementById("show-reminder");
var snoozeMessage = document.getElementById("snooze-feedback");

var ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// 3) Update the countdown text
function updateCountdown() {
  var timeLeft = nextOfferingDate - new Date(); // milliseconds

  if (timeLeft <= 0) {
    countdownText.textContent = "Your offering has started!";
    clearInterval(timer);
    return;
  }

  var days = Math.floor(timeLeft / ONE_DAY);
  var hours = Math.floor((timeLeft % ONE_DAY) / (60 * 60 * 1000));
  var minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
  var seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

  countdownText.textContent =
    twoDigits(days) + "d : " +
    twoDigits(hours) + "h : " +
    twoDigits(minutes) + "m : " +
    twoDigits(seconds) + "s";
}

function twoDigits(n) {
  return String(n).padStart(2, "0");
}

// Run once now, then every second
var timer = setInterval(updateCountdown, 1000);
updateCountdown();

// 4) Snooze: hide the reminder for 24 hours
//    We save the "snooze until" time in localStorage so it stays
//    hidden even if the member refreshes the page.
function hideReminder() {
  reminderBox.hidden = true;
  snoozeMessage.classList.add("show");
}

function showReminder() {
  reminderBox.hidden = false;
  snoozeMessage.classList.remove("show");
}

hideButton.addEventListener("click", function () {
  var snoozeUntil = Date.now() + ONE_DAY;
  localStorage.setItem("reminderSnoozeUntil", snoozeUntil);
  hideReminder();
});

showButton.addEventListener("click", function () {
  localStorage.removeItem("reminderSnoozeUntil");
  showReminder();
});

// 5) When the page loads: is the reminder still snoozed?
var savedSnooze = Number(localStorage.getItem("reminderSnoozeUntil"));

if (savedSnooze > Date.now()) {
  hideReminder();
} else {
  localStorage.removeItem("reminderSnoozeUntil"); // 24h passed
}
