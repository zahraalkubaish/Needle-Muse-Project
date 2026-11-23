var OFFERINGS_STORAGE_KEY = "needleMuseOfferings";
var currentOfferings = [];

function loadDashboardOfferings() {
  var saved = localStorage.getItem(OFFERINGS_STORAGE_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function renderDashboardOfferings(list) {
  var grids = document.querySelectorAll(".manager-offerings-grid");
  var gridEl = grids[0];

  var titles = document.querySelectorAll(".sec-title");
  var titleEl = titles[0];

  if (titleEl) {
    titleEl.innerHTML = "MY OFFERINGS (" + list.length + ")";
  }

  gridEl.innerHTML = "";

  if (list.length === 0) {
    gridEl.innerHTML =
      '<li class="manager-offer-card" style="padding: 2rem; text-align: center;">' +
        '<div class="offer-card-body">' +
          '<h3 class="offer-title">No Newly Added Offerings Yet</h3>' +
          '<p class="offer-description">There are currently no offerings stored in Local Storage. Use "+ Add New Offering" to add a new offering.</p>' +
        '</div>' +
      '</li>';
    return;
  }

  for (var i = 0; i < list.length; i++) {
    var offer = list[i];
    var li = document.createElement("li");
    li.id = offer.id ? offer.id : "Off_" + (i + 1);
    li.className = "manager-offer-card";

    var priceText = Number(offer.price) === 0 ? "Price: 0 SAR (free)" : "Price: " + offer.price + " SAR";
    var capText = offer.capacity ? offer.capacity : "-";

    li.innerHTML =
      '<div class="offer-image-wrap">' +
        '<img src="' + offer.image + '" alt="' + offer.name + ' workshop preview" loading="lazy" width="800" height="550">' +
      '</div>' +
      '<div class="offer-card-body">' +
        '<h3 class="offer-title">' + offer.name + '</h3>' +
        '<p class="offer-description">' + offer.description + '</p>' +
        '<div class="offer-meta">' +
          '<span class="offer-price">' + priceText + '</span>' +
          '<span class="offer-rating">Capacity: ' + capText + '</span>' +
        '</div>' +
        '<a href="offerings.html" class="view-details-btn">View Details</a>' +
      '</div>';

    gridEl.appendChild(li);
  }
}

function sortDashboardOfferings() {
  var sortBox = document.getElementById("sort");
  var mode = sortBox.value;
  var copy = [];

  for (var i = 0; i < currentOfferings.length; i++) {
    copy.push(currentOfferings[i]);
  }

  for (var a = 0; a < copy.length; a++) {
    for (var b = a + 1; b < copy.length; b++) {
      var shouldSwap = false;

      if (mode === "price-low") {
        shouldSwap = Number(copy[a].price) > Number(copy[b].price);
      } else if (mode === "price-high") {
        shouldSwap = Number(copy[a].price) < Number(copy[b].price);
      } else if (mode === "name-az") {
        shouldSwap = String(copy[a].name).toLowerCase() > String(copy[b].name).toLowerCase();
      } else if (mode === "name-za") {
        shouldSwap = String(copy[a].name).toLowerCase() < String(copy[b].name).toLowerCase();
      }

      if (shouldSwap) {
        var temp = copy[a];
        copy[a] = copy[b];
        copy[b] = temp;
      }
    }
  }

  renderDashboardOfferings(copy);
}

function initManagerDashboard() {
  currentOfferings = loadDashboardOfferings();
  renderDashboardOfferings(currentOfferings);

  var sortBox = document.getElementById("sort");
  if (sortBox) {
    sortBox.onchange = sortDashboardOfferings;
  }
}

window.onload = initManagerDashboard;