const rating = document.querySelectorAll(".rating-img");
const btn = document.getElementById("btn");

const container = document.getElementById("box");
let chooseRating = "";

rating.forEach((ratingS) => {
  ratingS.addEventListener("click", (event) => {
    removeActive();
    chooseRating = event.target.innerText || event.target.parentNode.innerText;
    event.target.parentNode.classList.add("active");
  });
});

btn.addEventListener("click", () => {
  if (chooseRating !== "") {
    container.innerHTML = `
       <div class="feed-back">
       <strong>Thank you!😊</strong>
        <div><strong class="choose">Feedback: ${chooseRating}</strong></div>
        <h2>Appreciated!!</h2>
        <p>I respect your time and efforts we'll use  your feedback to improve your experience support.</p>
       </div>
        `;
  }
});

function removeActive() {
  rating.forEach((ratingS) => {
    ratingS.classList.remove("active");
  });
}
