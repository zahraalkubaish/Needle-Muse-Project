const backToTop = document.getElementById("back-to-top");
const welcomeHeading = document.getElementById("welcome-heading");

function updateBackToTop() {
  backToTop.hidden = window.scrollY < 300;
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTop.addEventListener("click", () => {
  welcomeHeading.focus({ preventScroll: true });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
});

const clock = document.getElementById("footer-clock");
const riyadhTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Riyadh",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function updateClock() {
  const time = riyadhTime.format(new Date());
  clock.textContent = time;
  clock.dateTime = time + "+03:00";
}

updateClock();
window.setInterval(updateClock, 1000);

const newsToggle = document.getElementById("news-toggle");
const newsDetails = document.getElementById("news-details");

newsDetails.hidden = true;
newsToggle.hidden = false;

newsToggle.addEventListener("click", () => {
  const isExpanded = newsDetails.hidden;
  newsDetails.hidden = !isExpanded;
  newsToggle.setAttribute("aria-expanded", String(isExpanded));
  newsToggle.textContent = isExpanded ? "Show Less" : "Read More";
});
