const products = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
let total = document.getElementById("totalAmout");
const searchKeyWord = document.getElementById("searchInput").value;
const searchBtn = document.getElementById("searchButton");

//Display all products when the page loads
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        const li = document.createElement("li");
        li.classList.add("items");
        li.innerHTML = `<div id="liContainer">
        <div id="imgContainer">
          <img src="${product.image}"/>
        </div>
        <p>${product.title}</p>
        <p class="price">Price: Ksh ${product.price}</p>
        <p class="addToCart">Add To Cart</p>
        </div>
        `;
        products.appendChild(li);

        //add items to cart
        const addToCartBtn = li.querySelectorAll(".addToCart");
        addToCartBtn.forEach((btn) => {
          btn.addEventListener("click", () => {
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
            <div class="cartItemsContainer">
              <img src="${product.image}" id="cartItemImage">
              <div class="itemDetails">
                <p>${product.title}</p> 
                <p class="price">Price: ${product.price}</p>
              </div>
            </div>
            `;
            cartItems.appendChild(cartItem);
            const cartItemsList =
              cartItems.getElementsByClassName("cartItemsContainer");
            total.textContent = `Ksh: ${getTotal()}`;

            //function to calculate the total of the cart items
            function getTotal() {
              let total = 0;
              for (let i = 0; i < cartItemsList.length; i++) {
                const item = cartItemsList[i];
                const priceEl = item.querySelector(".price");
                const price = parseInt(priceEl.textContent.split(":")[1]);
                total += price;
              }
              return total;
            }
          });
        });
      });
    });
});
