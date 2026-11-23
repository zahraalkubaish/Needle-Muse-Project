// ===== Offering Evaluation - Phase 3 =====

// 1) Grab the elements
var form = document.getElementById("evaluation-form");
var offeringSelect = document.getElementById("completed-offering");
var ratingGroup = document.getElementById("rating-group");
var feedbackInput = document.getElementById("feedback");

// 2) Listen for the form's submit event
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Remove old highlights before checking again
  clearErrors();

  // The checked star (null if no star was chosen)
  var checkedStar = document.querySelector('input[name="rating"]:checked');
  var feedback = feedbackInput.value.trim();

  var isValid = true;

  // a) Offering must be selected
  if (offeringSelect.value === "") {
    showError(offeringSelect, "Please select the offering you completed.");
    isValid = false;
  }

  // b) A rating must be chosen
  if (checkedStar === null) {
    showError(ratingGroup, "Please choose a rating.");
    isValid = false;
  }

  // c) Feedback must not be empty
  if (feedback === "") {
    showError(feedbackInput, "Please write your feedback.");
    isValid = false;
  }

  // Stop here if anything is missing
  if (!isValid) {
    return;
  }

  // ---------- Form is valid: check the rating ----------
  var rating = Number(checkedStar.value);

  if (rating >= 4) {
    alert("Thank you for your great rating! We're happy you enjoyed this offering.");
  } else {
    alert("We're sorry the offering didn't meet your expectations. Thank you for your feedback, we'll work on improving it.");
  }

  // Go back to the dashboard (no need to store the review)
  window.location.href = "member-dashboard.html";
});

// 3) Highlight a field and add a small message under it
function showError(field, message) {
  field.classList.add("field-error");

  var text = document.createElement("p");
  text.className = "error-text";
  text.textContent = message;

  // For the select/textarea put the message after the field,
  // for the rating fieldset put it inside at the end
  if (field === ratingGroup) {
    field.appendChild(text);
  } else {
    field.insertAdjacentElement("afterend", text);
  }
}

// 4) Remove all highlights and messages
function clearErrors() {
  var highlighted = document.querySelectorAll(".field-error");
  for (var i = 0; i < highlighted.length; i++) {
    highlighted[i].classList.remove("field-error");
  }

  var messages = document.querySelectorAll(".error-text");
  for (var j = 0; j < messages.length; j++) {
    messages[j].remove();
  }
}
