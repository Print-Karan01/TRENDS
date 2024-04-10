const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
const words = ["deals", "cloths", "fashion", "offers", "savings"];
let wordIndex = 0;
let textIndex = 0;
const typingDelay = 200; // Delay between typing each character
const erasingDelay = 100; // Delay between erasing each character
const newTextDelay = 2000; // Delay before typing new word

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

function type() {
  if (textIndex < words[wordIndex].length) {
    document.getElementById("dynamicText").textContent +=
      words[wordIndex].charAt(textIndex);
    textIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (textIndex > 0) {
    document.getElementById("dynamicText").textContent = words[
      wordIndex
    ].substring(0, textIndex - 1);
    textIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, typingDelay);
  }
}
if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(type, newTextDelay);
  });
}

// adding items to cart

let cart = [];

function addToCart() {
  const existingCart = localStorage.getItem("cart");
  if (existingCart) {
    cart = JSON.parse(existingCart);
  } else {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const image = document.getElementById("MainImg");

  const imageUrl = image.src;

  const title = document.getElementById("protitle").innerText;

  const price = document.getElementById("proprice").innerText;

  const quantity = Number(document.getElementById("proquantity").value);

  const size = document.getElementById("prosize").value;

  const product = [
    {
      url: imageUrl,
      name: title,
      cost: Number(price),
      quant: Number(quantity),
      size: size,
    },
  ];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/sProduct.html"
) {
  btnid = document.getElementById("Addtocart");
  btnid.addEventListener("click", function () {
    addToCart();
  });
}

btnid2 = document.getElementById("tocart");

btnid2.addEventListener("click", function () {
  showcart();
});

function showcart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let cartContent = "";
  console.log(cart[0]);
  console.log(cart[0][0].name);
  let i = 0;
  let subtotal = 0;
  let total = 0;
  cart.forEach((element) => {
    subtotal = Number(element[0].cost * element[0].quant).toFixed(2);
    cartContent += `<tbody>
    <tr>
      <button id="btn=${i}" class="remove-btn">-</button>
      <td><img src=${element[0].url} alt=""></td>
      <td>${element[0].name}</td>
      <td>$${element[0].cost.toFixed(2)}</td> <td>${element[0].quant}</td>
      <td>$${subtotal}</td> </tr>
  </tbody>`;
    i++;
    total += Number(subtotal);
  });
  document.getElementById("cartItems").innerHTML = cartContent;
  console.log(subtotal);

  console.log(total);
  document.getElementById("total").innerText = "$" + total;
  document.getElementById("stotal").innerText = "$" + total;
}

const isCartPage = window.location.pathname.includes("/cart.html");

if (isCartPage) {
  showcart();
}

// removing items from cart logic

const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const buttonId = event.target.id;

    const indexStr = buttonId.split("=")[1];
    const index = parseInt(indexStr, 10);

    if (!isNaN(index)) {
      console.log("Removing item at index:", index);
      existingCart = localStorage.getItem("cart");
      const cart = JSON.parse(existingCart);

      cart.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(cart));
      location.reload();
    } else {
      console.error("Invalid index:", buttonId);
    }
  });
});

// cartitemstable.addEventListener("click", function (event) {
//   console.log("Clicked on cartitemstable"); // Check for click

//   // Check for clicked element with class "remove-btn" within cartitemstable
//   const clickedButton = event.target.classList
//     ? event.target.classList.contains("remove-btn") && event.target
//     : null;

//   if (clickedButton) {
//     console.log("Clicked a remove button!", clickedButton); // Log the button element
//     event.stopPropagation(); // Ensure we stop propagation here

//     const index = parseInt(clickedButton.id.split("-")[2]); // Assuming ID format is still "remove-btn-{i}"
//     console.log("Extracted index:", index); // Log extracted index

//     existingCart = localStorage.getItem("cart");
//     const cart = JSON.parse(existingCart);

//     // Check if cart item exists at the extracted index
//     if (cart && cart[index]) {
//       console.log("Removing item at index:", index); // Log removal attempt
//       cart.splice(index, 1);
//       // ... rest of your code to update local storage and UI
//     } else {
//       console.log("Cart item not found at index:", index); // Log if item not found
//     }
//   }
// });
