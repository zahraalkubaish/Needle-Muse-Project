var OFFERINGS_STORAGE_KEY = "needleMuseOfferings";

function setOfferFieldMessage(fieldId, message) {
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

function validateOfferField(fieldId, checkEmpty) {
  if (fieldId === "oname") {
    var nameVal = document.getElementById("oname").value;
    if (nameVal === "") {
      if (checkEmpty) {
        setOfferFieldMessage("oname", "Offering Name is required.");
        return "Offering Name is required.";
      }
      setOfferFieldMessage("oname", "");
      return "";
    }
    if (nameVal.search(/^\d/) === 0) {
      var nameMsg = "Offering Name cannot start with numbers.";
      setOfferFieldMessage("oname", nameMsg);
      return nameMsg;
    }
    setOfferFieldMessage("oname", "");
    return "";
  }

  if (fieldId === "oimage") {
    var imageInput = document.getElementById("oimage");
    if (imageInput.files.length === 0) {
      if (checkEmpty) {
        setOfferFieldMessage("oimage", "Image / Thumbnail is required.");
        return "Image / Thumbnail is required.";
      }
      setOfferFieldMessage("oimage", "");
      return "";
    }
    if (imageInput.files[0].type.search(/^image\//) !== 0) {
      var imgMsg = "Please select a valid image file.";
      setOfferFieldMessage("oimage", imgMsg);
      return imgMsg;
    }
    setOfferFieldMessage("oimage", "");
    return "";
  }

  if (fieldId === "oprice") {
    var priceRaw = document.getElementById("oprice").value;
    if (priceRaw === "") {
      if (checkEmpty) {
        setOfferFieldMessage("oprice", "Price or Registration Fee is required.");
        return "Price or Registration Fee is required.";
      }
      setOfferFieldMessage("oprice", "");
      return "";
    }
    var priceNum = Number(priceRaw);
    if (isNaN(priceNum) || priceNum < 0) {
      var priceMsg = "Price must be a valid non-negative number.";
      setOfferFieldMessage("oprice", priceMsg);
      return priceMsg;
    }
    setOfferFieldMessage("oprice", "");
    return "";
  }

  if (fieldId === "ocap") {
    var capRaw = document.getElementById("ocap").value;
    if (capRaw === "") {
      if (checkEmpty) {
        setOfferFieldMessage("ocap", "Max Seat Capacity is required.");
        return "Max Seat Capacity is required.";
      }
      setOfferFieldMessage("ocap", "");
      return "";
    }
    var capNum = Number.parseInt(capRaw, 10);
    if (isNaN(capNum) || capNum <= 0) {
      var capMsg = "Max Seat Capacity must be a positive number.";
      setOfferFieldMessage("ocap", capMsg);
      return capMsg;
    }
    setOfferFieldMessage("ocap", "");
    return "";
  }

  if (fieldId === "odes") {
    var descVal = document.getElementById("odes").value;
    if (descVal === "") {
      if (checkEmpty) {
        setOfferFieldMessage("odes", "Description is required.");
        return "Description is required.";
      }
      setOfferFieldMessage("odes", "");
      return "";
    }
    if (descVal.match(/^\d+$/) !== null) {
      var descMsg = "Description cannot contain numbers only.";
      setOfferFieldMessage("odes", descMsg);
      return descMsg;
    }
    setOfferFieldMessage("odes", "");
    return "";
  }

  return "";
}

function getOfferingsFromLocalStorage() {
  var saved = localStorage.getItem(OFFERINGS_STORAGE_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function handleAddOfferingSubmit(event) {
  event.preventDefault();

  var fields = ["oname", "oimage", "oprice", "ocap", "odes"];
  var errors = [];

  for (var i = 0; i < fields.length; i++) {
    var typeErr = validateOfferField(fields[i], false);
    if (typeErr !== "") {
      errors.push(typeErr);
    }
  }

  if (errors.length > 0) {
    alert("Please fix the following errors:\n- " + errors.join("\n- "));
    return false;
  }

  for (var j = 0; j < fields.length; j++) {
    var emptyErr = validateOfferField(fields[j], true);
    if (emptyErr !== "") {
      errors.push(emptyErr);
    }
  }

  if (errors.length > 0) {
    alert("Please complete all required fields:\n- " + errors.join("\n- "));
    return false;
  }

  var offerName = document.getElementById("oname").value;
  var offerPrice = Number(document.getElementById("oprice").value);
  var offerCap = Number.parseInt(document.getElementById("ocap").value, 10);
  var offerDesc = document.getElementById("odes").value;
  var offerImageFile = document.getElementById("oimage").files[0];

  var reader = new FileReader();
  reader.onload = function () {
    var offeringsList = getOfferingsFromLocalStorage();

    var newOffering = {
      id: "off_" + new Date().getTime(),
      name: offerName,
      image: reader.result,
      price: offerPrice,
      capacity: offerCap,
      description: offerDesc
    };

    offeringsList.push(newOffering);
    localStorage.setItem(OFFERINGS_STORAGE_KEY, JSON.stringify(offeringsList));

    alert('Offering "' + offerName + '" has been added successfully!');
    document.getElementById("add-offer").reset();

    for (var k = 0; k < fields.length; k++) {
      setOfferFieldMessage(fields[k], "");
    }
  };
  reader.readAsDataURL(offerImageFile);

  return false;
}

function initAddOfferingPage() {
  var offerForm = document.getElementById("add-offer");
  if (offerForm) {
    offerForm.onsubmit = handleAddOfferingSubmit;
  }

  document.getElementById("oname").onblur = function () { validateOfferField("oname", false); };
  document.getElementById("oimage").onchange = function () { validateOfferField("oimage", false); };
  document.getElementById("oprice").onblur = function () { validateOfferField("oprice", false); };
  document.getElementById("ocap").onblur = function () { validateOfferField("ocap", false); };
  document.getElementById("odes").onblur = function () { validateOfferField("odes", false); };
}

window.onload = initAddOfferingPage;