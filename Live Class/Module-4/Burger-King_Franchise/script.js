// Items
let burger = document.getElementById("burger");
let fries = document.getElementById("fries");
let pizza = document.getElementById("pizza");
let cupCake = document.getElementById("cup-cake");
let iceCream = document.getElementById("ice-cream");
let drink = document.getElementById("drink");

// Buttons
let order_btn = document.getElementById("order-btn");
let new_orderBtn = document.getElementById("new-order-btn");
let order_item = document.getElementById("order-item");
let order_idShow = document.getElementById("order-ID");

// images
let burgerImg = document.getElementById("burgerImg");
let friesImg = document.getElementById("friesImg");
let pizzaImg = document.getElementById("pizzaImg");
let cupCake_Img = document.getElementById("cupCake-Img");
let iceCream_Img = document.getElementById("iceCream-Img");
let drinkImg = document.getElementById("drinkImg");

function orderId_Generator() {
  return Math.floor(Math.random() * 1001);
}

function hide_images() {
  burgerImg.classList.remove("show");
  friesImg.classList.remove("show");
  pizzaImg.classList.remove("show");
  cupCake_Img.classList.remove("show");
  iceCream_Img.classList.remove("show");
  drinkImg.classList.remove("show");
}

function orderReset() {
  burger.checked = false;
  fries.checked = false;
  pizza.checked = false;
  cupCake.checked = false;
  iceCream.checked = false;
  drink.checked = false;

  hide_images();
  order_item.innerHTML = "";
  order_idShow.style.display = "none";
}

new_orderBtn.addEventListener("click", function () {
  orderReset();
});

order_btn.addEventListener("click", function (e) {
  e.preventDefault();
  hide_images();

  let items = [];
  let orderImg = [];

  if (burger.checked) {
    items.push(burger.value);
    orderImg.push(burgerImg);
  }

  if (fries.checked) {
    items.push(fries.value);
    orderImg.push(friesImg);
  }

  if (pizza.checked) {
    items.push(pizza.value);
    orderImg.push(pizzaImg);
  }

  if (cupCake.checked) {
    items.push(cupCake.value);
    orderImg.push(cupCake_Img);
  }

  if (iceCream.checked) {
    items.push(iceCream.value);
    orderImg.push(iceCream_Img);
  }

  if (drink.checked) {
    items.push(drink.value);
    orderImg.push(drinkImg);
  }

  if (items.length > 0) {
    let orderId = orderId_Generator();
    order_idShow.innerHTML = `Order ID: ${orderId}`;
    order_idShow.style.display = "block";

    orderImg.forEach((img, index) => {
      setTimeout(() => {
        img.classList.add("show");
        order_item.innerHTML = `<p>Items in your order: ${items.join(
          ", "
        )} &nbsp;<i class="fa-regular fa-square-check"></i></p>`;
      }, 500 * (index + 1));
    });
  } else {
    order_item.innerHTML = `<p>Kindly select at least one item to proceed <i class="fa-solid fa-exclamation"></i></p>`;
  }
});
