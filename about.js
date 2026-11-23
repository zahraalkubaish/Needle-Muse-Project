const joinForm = document.getElementById("join-form");
joinForm.onsubmit = function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const expertise = document.getElementById("expertise").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const skills = document.getElementById("skills").value.trim();
  const dob = document.getElementById("dob").value;
  const education = document.getElementById("education").value.trim();
  const email = document.getElementById("email").value.trim();
  const experience = document.getElementById("experience").value.trim();
  const message = document.getElementById("message").value.trim();
  const photoInput = document.getElementById("photo");

  if (
    name === "" ||
    expertise === "" ||
    !gender ||
    skills === "" ||
    dob === "" ||
    education === "" ||
    email === "" ||
    experience === "" ||
    message === "" ||
    photoInput.files.length === 0
  ) {
    alert("Please fill in all fields.");
    return;
  }
  if (/^\d/.test(name)) {
    alert("Name cannot start with a number.");
    return;
  }
  const photoFile = photoInput.files[0];
  if (!photoFile.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }
  const birthYear = parseInt(dob.substring(0, 4));
  if (birthYear > 2008) {
    alert("Year of birth must be 2008 or earlier.");
    return;
  }
  alert(
    "Thank you, " + name + "! Your application has been submitted successfully."
  );
  joinForm.reset();
};
