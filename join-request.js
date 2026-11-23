// ===== Request to Join an Offering - Phase 3 =====

// 1) Grab the elements we need from the page
var form = document.getElementById("join-form");
var offeringSelect = document.getElementById("offering");
var nameInput = document.getElementById("full-name");
var dateInput = document.getElementById("preferred-date");
var requestsSection = document.getElementById("new-requests");
var requestsBody = document.getElementById("new-requests-body");

// 2) Requests added during this visit only (NOT saved anywhere,
//    so they disappear when the member leaves the page)
var newRequests = [];

// 3) Listen for the form's submit event
form.addEventListener("submit", function (event) {
  // Stop the form from being sent so we can check it first
  event.preventDefault();

  var offering = offeringSelect.value;
  var fullName = nameInput.value.trim();
  var preferredDate = dateInput.value; // format: "YYYY-MM-DD"

  // ---------- Validation ----------

  // a) An offering must be selected
  if (offering === "") {
    alert("Please select an offering.");
    offeringSelect.focus();
    return;
  }

  // b) Name checks
  if (fullName === "") {
    alert("Please enter your full name.");
    nameInput.focus();
    return;
  }

  if (/[0-9]/.test(fullName)) {
    alert("Your name must not contain numbers.");
    nameInput.focus();
    return;
  }

  if (/[?!@]/.test(fullName)) {
    alert("Your name must not contain characters like ?, ! or @.");
    nameInput.focus();
    return;
  }

  // Full name = at least two words separated by a space
  var words = fullName.split(/\s+/);
  if (words.length < 2) {
    alert("Please enter your FULL name (first and last name).");
    nameInput.focus();
    return;
  }

  // c) Date checks
  if (preferredDate === "") {
    alert("Please choose a preferred date.");
    dateInput.focus();
    return;
  }

  // Build the chosen date at local midnight (avoids time-zone issues)
  var parts = preferredDate.split("-");
  var chosen = new Date(parts[0], parts[1] - 1, parts[2]);

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  if (chosen <= today) {
    alert("The preferred date must be a future date (after today).");
    dateInput.focus();
    return;
  }

  // ---------- Form is valid ----------

  // Readable offering name, e.g. "Sewing Basics Class (100 SAR)" -> "Sewing Basics Class"
  var optionText = offeringSelect.options[offeringSelect.selectedIndex].text;
  var offeringName = optionText.split(" (")[0];

  var stay = confirm(
    "Your request to join \"" + offeringName + "\" has been sent!\n\n" +
    "Press OK to stay on this page and add another request.\n" +
    "Press Cancel to return to your dashboard."
  );

  if (stay) {
    // Add the request to the array, then show all requests
    newRequests.push({
      offering: offeringName,
      name: fullName,
      date: formatDate(chosen)
    });
    showRequests();
    form.reset();
  } else {
    // Leaving the page -> newRequests is lost automatically
    window.location.href = "member-dashboard.html";
  }
});

// 4) Display every request in the newRequests array
function showRequests() {
  requestsBody.innerHTML = "";

  for (var i = 0; i < newRequests.length; i++) {
    var req = newRequests[i];
    var row = document.createElement("tr");

    row.innerHTML =
      '<td data-label="OFFERING NAME"></td>' +
      '<td data-label="MEMBER NAME"></td>' +
      '<td data-label="PREFERRED DATE"></td>';

    // textContent (not innerHTML) so user input can't inject HTML
    row.children[0].textContent = req.offering;
    row.children[1].textContent = req.name;
    row.children[2].textContent = req.date;

    requestsBody.appendChild(row);
  }

  requestsSection.hidden = false;
}

// 5) Date -> "DD/MM/YYYY" (same format as the dashboard table)
function formatDate(d) {
  var day = String(d.getDate()).padStart(2, "0");
  var month = String(d.getMonth() + 1).padStart(2, "0");
  return day + "/" + month + "/" + d.getFullYear();
}
