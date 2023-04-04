const products = document.getElementById("products");
const cartItems = document.getElementById("cartItems");

//Display all products when the page loads
window.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        const li = document.createElement("li");
        li.classList.add("items");
        li.innerHTML = `<div id="liContainer>
        <div id="imgContainer">
          <img src="${product.image}"/>
        </div>
        <p>${product.title}</p>
        <p id="price">Price: Ksh ${product.price}</p>
        <p class="addToCart">Add To Cart</p>
        </div>
        `;
        products.appendChild(li);

        const addToCartBtn = li.querySelectorAll(".addToCart");
        addToCartBtn.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            console.log(e);
            const cartLi = document.createElement("li");
            cartLi.innerHTML = `
            <div class="cartItemsContainer">
              <img src="${product.image}" id="cartItemImage">
              <p>${product.title}</p>
              <p>${product.price}</p>
            </div>
            `;
            cartItems.appendChild(cartLi);
          });
        });
      });
    });
});
