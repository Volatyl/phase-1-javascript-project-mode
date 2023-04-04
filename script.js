const products = document.getElementById("products");
const cartItems = document.getElementById("cartItems");

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
            const cartLi = document.createElement("li");
            cartLi.innerHTML = `
            <div class="cartItemsContainer">
              <img src="${product.image}" id="cartItemImage">
              <div class="itemDetails"
                <p>${product.title}</p> 
                <p class="price">Price: ${product.price}</p>
              </div>
            </div>
            `;
            cartItems.appendChild(cartLi);
            const cartLiItems = cartLi.getElementsByTagName("li");
            console.log(getTotal());

            //function to calculate the total of the cart items
            function getTotal() {
              let total = 0;
              for (let i = 0; i < cartLiItems.length; i++) {
                const item = cartLiItems[i];
                const priceEl = item.querySelector(".price");
                const price = parseInt(priceEl.textConten.split(":")[1]);
                total += price;
              }
              return total;
            }
          });
        });
      });
    });
});
