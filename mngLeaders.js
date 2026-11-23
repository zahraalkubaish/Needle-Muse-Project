
  // (Array of Objects) 
  var leaders = [
  {
    id: "le1",
    name: "Layla Al-Rashid",
    photo: "images/leader1.jpg",
    dob: "1990-05-12",
    email: "layla@needlemuse.com",
    exp: "Sewing & Pattern Making",
    skills: "couture draping and tailoring",
    edu: "B.A. Fashion Design"
  },
  {
    id: "le2",
    name: "Omar Khalid",
    photo: "images/leader2.jpg",
    dob: "1988-11-03",
    email: "omar@needlemuse.com",
    exp: "Fashion Illustration",
    skills: "Editorial figure sketching, watercolor rendering, and digital croquis",
    edu: "B.F.A. Illustration"
  },
  {
    id: "le3",
    name: "Noura Al-Sabah",
    photo: "images/leader3.jpg",
    dob: "1991-02-19",
    email: "noura@needlemuse.com",
    exp: "Sustainable Fashion",
    skills: "Ethical textile sourcing, circular design, and botanical dyeing",
    edu: "M.A. Sustainable Textiles"
  },
  {
    id: "le4",
    name: "Faisal Al-Otaibi",
    photo: "images/leader4.jpg",
    dob: "1987-09-25",
    email: "faisal@needlemuse.com",
    exp: "Textile Design",
    skills: "Surface print creation, jacquard weaving, and luxury silk embroidery",
    edu: "B.A. Textile Engineering"
  },
  {
    id: "le5",
    name: "Sara Al-Mutairi",
    photo: "images/leader5.jpg",
    dob: "1993-07-14",
    email: "sara@needlemuse.com",
    exp: "Fashion Styling",
    skills: "Personal color analysis, capsule wardrobe curation, and editorial styling",
    edu: "Diploma in Fashion Styling"
  },
  {
    id: "le6",
    name: "Yousef Al-Harbi",
    photo: "images/leader6.jpg",
    dob: "1985-12-08",
    email: "yousef@needlemuse.com",
    exp: "Costume Design",
    skills: "Historical garment construction, theatrical couture, and structural tailoring",
    edu: "M.F.A. Costume Design"
  }
];

function getLeadersListElement() {
  var lists = document.querySelectorAll(".leaders-manage-list");
  return lists[0];
}

function renderLeaders() {
  var listEl = getLeadersListElement();
  listEl.innerHTML = "";

  for (var i = 0; i < leaders.length; i++) {
    var leader = leaders[i];
    var li = document.createElement("li");
    li.className = "leader-row";

    var description = leader.exp + " — " + leader.edu + ", specializing in " + leader.skills + ".";

    li.innerHTML =
      '<div class="leader-check-wrap">' +
        '<input type="checkbox" name="leader" value="' + leader.id + '" id="leader-' + (i + 1) + '" aria-label="Select ' + leader.name + '">' +
      '</div>' +
      '<img src="' + leader.photo + '" alt="Portrait of ' + leader.name + '" width="72" height="72" class="leader-thumb">' +
      '<div class="leader-info">' +
        '<label for="leader-' + (i + 1) + '" class="leader-name">' + leader.name + '</label>' +
        '<p>' + description + '</p>' +
      '</div>' +
      '<div class="leader-actions">' +
        '<button type="button" onclick="deleteSingleLeader(\'' + leader.id + '\')" class="delete-btn">Delete</button>' +
      '</div>';

    listEl.appendChild(li);
  }

  var selectAllBox = document.getElementById("select-all-leaders");
  if (selectAllBox) {
    selectAllBox.checked = false;
  }
}

function toggleSelectAllLeaders() {
  var selectAllBox = document.getElementById("select-all-leaders");
  var checkboxes = document.querySelectorAll('input[name="leader"]');

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = selectAllBox.checked;
  }
}

function deleteSingleLeader(idToDelete) {
  var targetLeader = null;
  for (var i = 0; i < leaders.length; i++) {
    if (leaders[i].id === idToDelete) {
      targetLeader = leaders[i];
      break;
    }
  }

  if (targetLeader) {
    var ok = confirm("Are you sure you want to delete " + targetLeader.name + "?");
    if (ok) {
      var updated = [];
      for (var j = 0; j < leaders.length; j++) {
        if (leaders[j].id !== idToDelete) {
          updated.push(leaders[j]);
        }
      }
      leaders = updated;
      renderLeaders();
    }
  }
}

function deleteSelectedLeaders(event) {
  event.preventDefault();

  var checkedBoxes = document.querySelectorAll('input[name="leader"]:checked');
  if (checkedBoxes.length === 0) {
    alert("Please select at least one activity leader or instructor to delete.");
    return false;
  }

  var confirmed = confirm(
    "Are you sure you want to delete the selected (" + checkedBoxes.length + ") activity leader(s)/instructor(s)?"
  );

  if (confirmed) {
    var idsToDelete = [];
    for (var i = 0; i < checkedBoxes.length; i++) {
      idsToDelete.push(checkedBoxes[i].value);
    }

    var remaining = [];
    for (var j = 0; j < leaders.length; j++) {
      var shouldDelete = false;
      for (var k = 0; k < idsToDelete.length; k++) {
        if (leaders[j].id === idsToDelete[k]) {
          shouldDelete = true;
          break;
        }
      }
      if (!shouldDelete) {
        remaining.push(leaders[j]);
      }
    }

    leaders = remaining;
    renderLeaders();
  }

  return false;
}

function setFieldMessage(fieldId, message) {
  var msgEl = document.getElementById(fieldId + "-msg");
  if (!msgEl) {
    var inputEl = document.getElementById(fieldId);
    msgEl = document.createElement("small");
    msgEl.id = fieldId + "-msg";
    msgEl.style.color = "#9e1b32";
    msgEl.style.display = "block";
    msgEl.style.marginTop = "4px";
    inputEl.parentNode.appendChild(msgEl);
  }
  msgEl.innerHTML = message;
}

function validateLeaderField(fieldId, checkEmpty) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fieldId === "name") {
    var nameVal = document.getElementById("name").value;
    if (nameVal === "") {
      if (checkEmpty) {
        setFieldMessage("name", "Name is required.");
        return "Name is required.";
      }
      setFieldMessage("name", "");
      return "";
    }
    if (nameVal.search(/^\d/) === 0 || nameVal.match(/^[A-Za-z\s'-]+$/) === null) {
      var nameMsg = "Name cannot start with numbers and must contain only letters.";
      setFieldMessage("name", nameMsg);
      return nameMsg;
    }
    setFieldMessage("name", "");
    return "";
  }

  if (fieldId === "photo") {
    var photoInput = document.getElementById("photo");
    if (photoInput.files.length === 0) {
      if (checkEmpty) {
        setFieldMessage("photo", "Photo is required.");
        return "Photo is required.";
      }
      setFieldMessage("photo", "");
      return "";
    }
    if (photoInput.files[0].type.search(/^image\//) !== 0) {
      var photoMsg = "Photo must be a valid image file.";
      setFieldMessage("photo", photoMsg);
      return photoMsg;
    }
    setFieldMessage("photo", "");
    return "";
  }

  if (fieldId === "dob") {
    var dobVal = document.getElementById("dob").value;
    if (dobVal === "") {
      if (checkEmpty) {
        setFieldMessage("dob", "Date of Birth is required.");
        return "Date of Birth is required.";
      }
      setFieldMessage("dob", "");
      return "";
    }
    setFieldMessage("dob", "");
    return "";
  }

  if (fieldId === "email") {
    var emailVal = document.getElementById("email").value;
    if (emailVal === "") {
      if (checkEmpty) {
        setFieldMessage("email", "Email is required.");
        return "Email is required.";
      }
      setFieldMessage("email", "");
      return "";
    }
    if (emailVal.match(emailPattern) === null) {
      var emailMsg = "Please enter a valid email address.";
      setFieldMessage("email", emailMsg);
      return emailMsg;
    }
    setFieldMessage("email", "");
    return "";
  }

  if (fieldId === "exp") {
    var expVal = document.getElementById("exp").value;
    if (expVal === "") {
      if (checkEmpty) {
        setFieldMessage("exp", "Area of Expertise is required.");
        return "Area of Expertise is required.";
      }
      setFieldMessage("exp", "");
      return "";
    }
    if (expVal.search(/^\d/) === 0 || expVal.match(/[A-Za-z]/) === null) {
      var expMsg = "Area of Expertise cannot start with numbers and must be text.";
      setFieldMessage("exp", expMsg);
      return expMsg;
    }
    setFieldMessage("exp", "");
    return "";
  }

  if (fieldId === "skills") {
    var skillsVal = document.getElementById("skills").value;
    if (skillsVal === "") {
      if (checkEmpty) {
        setFieldMessage("skills", "Skills field is required.");
        return "Skills field is required.";
      }
      setFieldMessage("skills", "");
      return "";
    }
    if (skillsVal.search(/^\d/) === 0 || skillsVal.match(/[A-Za-z]/) === null) {
      var skillsMsg = "Skills cannot start with numbers and must be text.";
      setFieldMessage("skills", skillsMsg);
      return skillsMsg;
    }
    setFieldMessage("skills", "");
    return "";
  }

  if (fieldId === "edu") {
    var eduVal = document.getElementById("edu").value;
    if (eduVal === "") {
      if (checkEmpty) {
        setFieldMessage("edu", "Education is required.");
        return "Education is required.";
      }
      setFieldMessage("edu", "");
      return "";
    }
    if (eduVal.search(/^\d/) === 0 || eduVal.match(/[A-Za-z]/) === null) {
      var eduMsg = "Education cannot start with numbers and must be text.";
      setFieldMessage("edu", eduMsg);
      return eduMsg;
    }
    setFieldMessage("edu", "");
    return "";
  }

  return "";
}

function handleAddLeaderSubmit(event) {
  event.preventDefault();

  var fields = ["name", "photo", "dob", "email", "exp", "skills", "edu"];
  var errors = [];

  for (var i = 0; i < fields.length; i++) {
    var typeErr = validateLeaderField(fields[i], false);
    if (typeErr !== "") {
      errors.push(typeErr);
    }
  }

  if (errors.length > 0) {
    alert("Please fix the following errors:\n- " + errors.join("\n- "));
    return false;
  }

  for (var j = 0; j < fields.length; j++) {
    var emptyErr = validateLeaderField(fields[j], true);
    if (emptyErr !== "") {
      errors.push(emptyErr);
    }
  }

  if (errors.length > 0) {
    alert("Please complete all required fields:\n- " + errors.join("\n- "));
    return false;
  }

  var leaderName = document.getElementById("name").value;
  var leaderPhoto = document.getElementById("photo").files[0];
  var leaderDob = document.getElementById("dob").value;
  var leaderEmail = document.getElementById("email").value;
  var leaderExp = document.getElementById("exp").value;
  var leaderSkills = document.getElementById("skills").value;
  var leaderEdu = document.getElementById("edu").value;

  var reader = new FileReader();
  reader.onload = function () {
    var newLeader = {
      id: "le_" + new Date().getTime(),
      name: leaderName,
      photo: reader.result,
      dob: leaderDob,
      email: leaderEmail,
      exp: leaderExp,
      skills: leaderSkills,
      edu: leaderEdu
    };

    leaders.push(newLeader);
    renderLeaders();

    alert(leaderName + " has been added to the activity leaders and instructors list!");
    document.getElementById("add-lead").reset();

    for (var k = 0; k < fields.length; k++) {
      setFieldMessage(fields[k], "");
    }
  };
  reader.readAsDataURL(leaderPhoto);

  return false;
}

function initManageLeadersPage() {
  renderLeaders();

  var selectAllBox = document.getElementById("select-all-leaders");
  if (selectAllBox) {
    selectAllBox.onchange = toggleSelectAllLeaders;
  }

  var actForm = document.getElementById("act-lead");
  if (actForm) {
    actForm.onsubmit = deleteSelectedLeaders;
  }

  var addForm = document.getElementById("add-lead");
  if (addForm) {
    addForm.onsubmit = handleAddLeaderSubmit;
  }

  document.getElementById("name").onblur = function () { validateLeaderField("name", false); };
  document.getElementById("photo").onchange = function () { validateLeaderField("photo", false); };
  document.getElementById("dob").onchange = function () { validateLeaderField("dob", false); };
  document.getElementById("email").onblur = function () { validateLeaderField("email", false); };
  document.getElementById("exp").onblur = function () { validateLeaderField("exp", false); };
  document.getElementById("skills").onblur = function () { validateLeaderField("skills", false); };
  document.getElementById("edu").onblur = function () { validateLeaderField("edu", false); };
}

window.onload = initManageLeadersPage;