const stars = document.querySelectorAll('input[name="rating"]');
const ratingInfo = document.querySelector(".rating-info");

const strongTags = ratingInfo.getElementsByTagName("strong");
let currentAverage = parseFloat(strongTags[0].innerHTML);
let totalRatings = parseInt(strongTags[1].innerHTML);

for (let i = 0; i < stars.length; i++) {
  stars[i].onchange = function () {
    const userRating = parseInt(this.value);
    const totalScore = currentAverage * totalRatings;
    totalRatings++;
    currentAverage = (totalScore + userRating) / totalRatings;
    ratingInfo.innerHTML =
      "<strong>" +
      currentAverage.toFixed(1) +
      "</strong> average · based on <strong>" +
      totalRatings +
      "</strong> ratings - Thank you for rating (" +
      userRating +
      "/5)!";
  };
}
