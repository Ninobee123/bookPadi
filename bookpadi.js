// In-memory array to store cart items
let cartItems = [];

// Get UI elements
const lightMode = document.getElementById("light-mode");
const darkMode = document.getElementById("dark-mode");
let timeOutIdShow, timeOutIdHide;
const containerArray = document.getElementById("container");
const menuLogo = document.querySelector("#menu-logo");
const leftBar = document.querySelector("#left-bar");
const cartCount = document.getElementById("cart-count");
let cartAmount = cartItems.length; // Start with an empty cart
const rightBar = document.querySelector("#right-bar");
const cartLogo = document.querySelector("#cart-logo");
const searchInput = document.querySelector('#message-search')






// Update cart count on page load
cartCount.textContent = cartAmount;

// Create a button to calculate the total price
const calculateButton = document.createElement("button");
calculateButton.textContent = "Calculate Total";
calculateButton.style.marginTop = "20px";
calculateButton.style.padding = "10px";
calculateButton.style.background = "#4CAF50";
calculateButton.style.color = "white";
calculateButton.style.border = "none";
calculateButton.style.cursor = "pointer";

// Create a div to display the total price
const totalPriceDiv = document.createElement("div");
totalPriceDiv.style.marginTop = "10px";
totalPriceDiv.style.fontSize = "18px";

// Function to update cart preview in rightBar
const updateCartPreview = () => {
  // Clear the rightBar and display cart items
  rightBar.innerHTML = cartItems
    .map(
      (product) =>
        `<div class="cart-item" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <p><b>${product.name}</b></p>
          <p><b>Price:</b> $${product.price}</p>
          <p><b>Tax:</b><span>$${Math.ceil(100/70) + '%'}</span></p>
          <p><b>Delivery fee:</b><span>$${ 0.5}</span></p>
        </div>`
    )
    .join("");

  // Create a container for the calculate button and total price display
  const calculateContainer = document.createElement("div");
  calculateContainer.style.marginTop = "20px";
  calculateContainer.style.textAlign = "center";

  // Add the button and total price display to the container
  calculateContainer.appendChild(calculateButton);
  calculateContainer.appendChild(totalPriceDiv);

  // Append the container to the rightBar
  rightBar.appendChild(calculateContainer);
};

// Toggle menu bar
menuLogo.addEventListener("click", () => {
  leftBar.style.display === "none" || leftBar.style.display === ""
    ? (leftBar.style.display = "flex")
    : (leftBar.style.display = "none");
});

// Toggle cart page
cartLogo.addEventListener("click", () => {
  rightBar.style.display === "none" || rightBar.style.display === ""
    ? (rightBar.style.display = "flex")
    : (rightBar.style.display = "none");
containerArray.style.display = 'none'
});

// Dark and light mode toggle
lightMode.addEventListener("click", () => {
  document.body.classList.remove("dark-theme");
  lightMode.classList.add("active");
  darkMode.classList.remove("active");
});

darkMode.addEventListener("click", () => {
  document.body.classList.add("dark-theme");
  darkMode.classList.add("active");
  lightMode.classList.remove("active");
});

// Assume 'products' is an array of product objects with 'image', 'name', 'price', and 'rating' properties
products.forEach((product) => {
  const newPrice = Math.ceil(product.price / 1500);
  const roundupNumber = Math.ceil((product.price * 20) / 100 / 1500);
  const newElement = document.createElement("div");
  
  newElement.innerHTML = `
    <div class="products-div" data-id="${product.id}" data-name="${product.name}" data-price="${newPrice}">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>
        <strong class="price">$${
          newPrice
        }</strong> 
        <small class="text-danger">-$${
          roundupNumber
        }</small>
      </p>
      <p><small class="rating">${product.rating.stars}</small></p>
      <button class="add-btn">Add</button>
      <div class="opaque" style="opacity: 0;">
        <p>Added</p>
      </div>
    </div>
  `;

  containerArray.appendChild(newElement);

  const addButton = newElement.querySelector(".add-btn");
  const addedMessage = newElement.querySelector(".opaque");

  // Add click event listener to 'Add' button
  addButton.addEventListener("click", () => {
    // Check if product already exists in cart
    const productExists = cartItems.find((item) => item.id === product.id);
    if (!productExists) {
      // Add product to cartItems array with correct price
      cartItems.push({
        id: product.id,
        name: product.name,
        price: newPrice, // Use calculated price
        image: product.image,
      });

      // Update UI with new cart count
      cartAmount++;
      cartCount.textContent = cartAmount;

      // Update cart preview
      updateCartPreview();

      // Show 'Added' message
      clearTimeout(timeOutIdShow);
      clearTimeout(timeOutIdHide);

      addedMessage.style.opacity = "1";
      timeOutIdHide = setTimeout(() => {
        addedMessage.style.opacity = "0";
      }, 3000);
    } else {
      alert("This product is already in the cart.");
    }
  });
});

// Calculate total price on button click
calculateButton.addEventListener("click", () => {
  const total = cartItems.reduce((sum, product) => sum + parseFloat(product.price), 0) ;
  const taxPercent = Math.ceil(total * 100/70)
  totalPriceDiv.textContent = `Total Price(including 2% tax and delivery fee): $${total + taxPercent + 0.5} `;
  totalPriceDiv.style.color = 'red'
  
});

//creating the search tab
const searchMessage = function () {
  const val = searchInput.value.toLowerCase();
  const productElements = container.querySelectorAll(".products-div"); // Query all product elements
  productElements.forEach((product) => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = name.indexOf(val) !== -1 ? "block" : "none";
  });
};
// Attach event listener to search input
searchInput.addEventListener("input", searchMessage);
