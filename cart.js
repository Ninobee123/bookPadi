


document.addEventListener("DOMContentLoaded", () => {
  const productCartContainer = document.getElementById("product-cart-container");

  // Retrieve the stored cart data from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length > 0) {
    // Iterate over each product and display it
    cartItems.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");

      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p><strong>Price: $${product.price}</strong></p>
        <small>Old Price: $${product.oldPrice}</small>
        <p>Rating: ${product.rating}</p>
      `;

      productCartContainer.appendChild(productDiv);
    });
  } else {
    productCartContainer.innerHTML = "<p>No products in the cart.</p>";
  }
});
