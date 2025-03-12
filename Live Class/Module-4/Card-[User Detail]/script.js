const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const villageInput = document.getElementById("village");
const cityInput = document.getElementById("city");
const saveButton = document.querySelector(".save");
const clearButton = document.querySelector(".clear");
const userCard = document.getElementById("user-card");
const themeLightButton = document.querySelector(".theme-light");
const themeDarkButton = document.querySelector(".theme-dark");

function loadUserData() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userCard) {
    displayUserData(userData);
  }
}

function displayUserData(data) {
  userCard.innerHTML = `
    <h2>User Information</h2>
    <p><strong>Name:</strong>${data.name}</p>
    <p><strong>Phone Number: </strong>${data.phone}</p>
    <p><strong>Village: </strong>${data.village}</p>
    <p><strong>City:</strong>${data.city}</p>
    `;
}

saveButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const village = villageInput.value.trim();
  const city = cityInput.value.trim();

  if (!name || !phone || !village || !city) {
    alert("Please fill in all fields before saving!");
    return;
  }
  const userData = {
    name,
    phone,
    village,
    city,
  };

  localStorage.setItem("userData", JSON.stringify(userData));
  displayUserData(userData);
  alert("User data saved!");
});

clearButton.addEventListener("click", () => {
  localStorage.removeItem("userData");
  userCard.innerHTML = "";
  alert("User data cleared!");
});

themeLightButton.addEventListener("click", () => {
  document.body.style.backgroundColor = "#a3a3a3bb";
  document.body.style.color = "black";
});

themeDarkButton.addEventListener("click", () => {
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.913)";
  document.body.style.color = "black";
});

loadUserData();
