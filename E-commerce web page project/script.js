document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll("#categories button");
  const productsContainer = document.getElementById("products");
  const cartItems = document.querySelector("#cart-items");
  const cartTotal = document.querySelector("#cart-total");
  const cartCounter = document.querySelector("#cart-counter"); // Add this line

  // Initialize cart as an empty array
  const cart = [];

  // Define products
  const products = [
      { category: "Frontend", name: "Html", price: 500, image: "./img/html.jpg" },
      { category: "Frontend", name: "CSS", price: 500, image: "./img/css.jpg" },
      { category: "Frontend", name: "JAVASCRIPT", price: 500, image: "./img/javascript.jpg" },
      { category: "Frontend", name: "BOOTSTRAP", price: 500, image: "./img/Bootstrap.jpg" },
      { category: "Frontend", name: "REACT.JS", price: 500, image: "./img/React.jpg" },
      { category: "Backend", name: "ANGULAR.JS", price: 720, image: "./img/angular.jpg" },
      { category: "Backend", name: "JQUERY", price: 720, image: "./img/jquery.jpg" },
      { category: "Backend", name: "NODE.JS", price: 720, image: "./img/node.jpg" },
      { category: "Backend", name: "NOSQL", price: 720, image: "./img/nosql.png" },
      { category: "programming", name: "PYTHON", price: 810, image: "./img/python.jpg" },
      { category: "programming", name: "C++", price: 810, image: "./img/c.jpg" },
      { category: "programming", name: "JAVA", price: 810, image: "./img/java.jpg" },
      { category: "programming", name: "VUE.JS", price: 810, image: "./img/vuejs.jpg" },
      { category: "computing", name: "SOLUTION ARCHITECT", price: 580, image: "./img/solution.jpg" },
      { category: "computing", name: "SECURITY ARCHITECT", price: 580, image: "./img/Security.jpg" },
      { category: "computing", name: "CLOUD SYSTEMS ADMINISTRATOR", price: 580, image: "./img/cloud-systems-administrator.jpg" },
      { category: "computing", name: "CLOUD SECURITY", price: 580, image: "./img/cloudsecurity.jpg" },
      { category: "computing", name: "CLOUD ENGINEERING", price: 580, image: "./img/CloudEng.jpg" },
      { category: "computing", name: "CLOUD ARCHITECTURE", price: 580, image: "./img/Cloud-Architecture.jpg" },
  ];

  // Add event listener to category buttons to filter products
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Remove all products
      productsContainer.innerHTML = "";

      // Filter and display products in the selected category
      products.forEach((product) => {
        if (category === "all" || category === product.category) {
          displayProduct(product);
        }
      });
    });
  });

  // Display a product card
  function displayProduct(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
    `;

    const addToCartButton = productCard.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
      // Add the product to the cart array
      cart.push({ name: product.name, price: product.price });

      // Update the cart display, total, and counter
      displayCartItems();
      calculateTotal();
      updateCartCounter();
    });

    productsContainer.appendChild(productCard);
  }

  // Display the cart items
  function displayCartItems() {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        // Remove the item from the cart array
        cart.splice(index, 1);

        // Update the cart display, total, and counter
        displayCartItems();
        calculateTotal();
        updateCartCounter();
      });
      li.appendChild(deleteButton);
      cartItems.appendChild(li);
    });
  }

  // Calculate and display the cart total
  function calculateTotal() {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
  }

  // Update the cart counter based on the number of items in the cart
  function updateCartCounter() {
    cartCounter.textContent = cart.length;
  }

  // Initial product display (all products)
  products.forEach((product) => {
    displayProduct(product);
  });

  // Initialize the cart counter
  updateCartCounter();
});