const products = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("totalAmout");
const searchKeyWord = document.getElementById("searchInput");
const cart = document.querySelector(".cart");
const searchBtn = document.getElementById("searchButton");
const checkOut = document.getElementById("checkOut");

//Function to delete item from server
function deleteItemFromServer(itemId) {
  fetch(`http://localhost:3000/products/${itemId}`, {
    method: "DELETE",
  });
}

//Function to display all products. Encopanses everything
function displayProducts(data) {
  data.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("items");
    li.innerHTML = `<div id="liContainer">
    <div id="imgContainer">
      <img src="${product.image}" class="image"/>
    </div>
    <p class="itemTitle">${product.title}</p>
    <p class="price">Price: Ksh ${product.price}</p>
    <p class="quantity">SKU: ${product.quantity}</p>
    <p class="addToCart">Add To Cart</p>
    <button class="removeItem">Remove</button>
    </div>
    `;

    products.appendChild(li);

    //remove items from product list
    const removeBtn = li.querySelector(".removeItem");
    removeBtn.addEventListener("click", () => {
      li.remove();
      deleteItemFromServer(product.id);
    });

    //add items to cart
    const addToCartBtn = li.querySelectorAll(".addToCart");
    const quantity = li.querySelectorAll(".quantity");
    addToCartBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productEl = btn.parentElement;
        console.log(productEl);

        //add item to cart server

        const cartImg = productEl.querySelector(".image").src;
        const cartItemName = productEl.querySelector(".itemTitle").textContent;
        const cartItemPrice = productEl
          .querySelector(".price")
          .textContent.split(" ")[2];

        const cartData = {
          image: cartImg,
          title: cartItemName,
          price: cartItemPrice,
        };

        addItemToCartServer(cartData);

        //function to decrease product sku after adding to cart
        quantity.forEach(() => {
          product.quantity--;
          updateSku(product);
        });
      });
    });
  });
}

//Display all products when the page loads
window.addEventListener("DOMContentLoaded", () => {
  filterProducts();
  displayCartItems();
});

//Function to add search functionality
function filterProducts(category) {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      // filter products by category
      if (category) {
        data = data.filter((product) => product.category === category);
      }
      products.innerHTML = "";
      displayProducts(data);
    });
}

//Call the search
searchBtn.addEventListener("click", (e) => {
  const category = searchKeyWord.value.toLowerCase();
  filterProducts(category);
});

//Function to add a new product
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = new FormData(form);
  const data = Object.fromEntries(newProduct);
  console.log(data);
  fetch("http://localhost:3000/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
});

//funciton to change sku
function updateSku(product) {
  fetch(`http://localhost:3000/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}

// function to add item to cart in server
function addItemToCartServer(cartData) {
  fetch(`http://localhost:3000/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

//function to display cart items from the server
function displayCartItems() {
  fetch("http://localhost:3000/cart")
    .then((res) => res.json())
    .then((items) => {
      items.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
         <div class="cartItemsContainer">
         <img src="${item.image}" id="cartItemImage">        
         <p>${item.title}</p> 
         <p class="price">Price: ${item.price}</p>        
         <button class="removeCartItem">Remove</button>
         </div>
         `;

        cartItems.appendChild(cartItem);

        total.textContent = `Ksh: ${getTotal()}`;

        // add event listener to removeCartItem button
        const removeCartItemBtns =
          cartItems.querySelectorAll(".removeCartItem");

        removeCartItemBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            btn.parentElement.remove();
            deleteCartItem(item.id);
            total.textContent = `Ksh: ${getTotal()}`;
          });
        });
      });
    });
}

//function to calculate the total of the cart items
function getTotal() {
  const cartItemsList = cartItems.getElementsByClassName("cartItemsContainer");

  const total = Array.from(cartItemsList)
    .map((item) =>
      parseInt(item.querySelector(".price").textContent.split(":")[1])
    )
    .reduce((a, b) => a + b, 0);
  return total;
}

//function to delete cart item
function deleteCartItem(itemid) {
  fetch(`http://localhost:3000/cart/${itemid}`, {
    method: "DELETE",
  });
}

checkOut.addEventListener("click", (e) => {
  alert("Order confirmed, thank you for your purchase.");
  for (let i = 0; i < 20; i++) {
    deleteCartItem(i);
  }
});
