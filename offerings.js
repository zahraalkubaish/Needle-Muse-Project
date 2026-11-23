const sortSelect = document.getElementById("sort");
const catalog = document.querySelector(".club-offerings .offerings-container");
const offerings = Array.from(catalog.querySelectorAll(".offering"), (card) => ({
  card,
  name: card.querySelector("h2").textContent.trim(),
  price: Number(card.dataset.price),
}));

function renderOfferings() {
  catalog.append(...offerings.map((offering) => offering.card));
}

// Shuffle the cards once when the page opens.
for (let i = offerings.length - 1; i > 0; i--) {
  const randomIndex = Math.floor(Math.random() * (i + 1));
  [offerings[i], offerings[randomIndex]] = [offerings[randomIndex], offerings[i]];
}
sortSelect.value = "";
renderOfferings();

const comparisons = {
  "price-low": (first, second) => first.price - second.price,
  "price-high": (first, second) => second.price - first.price,
  "name-az": (first, second) => first.name.localeCompare(second.name),
  "name-za": (first, second) => second.name.localeCompare(first.name),
};

sortSelect.addEventListener("change", () => {
  offerings.sort(comparisons[sortSelect.value]);
  renderOfferings();
});
