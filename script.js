const products = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("totalAmout");
const searchKeyWord = document.getElementById("searchInput");
const cart = document.querySelector(".cart");
const searchBtn = document.getElementById("searchButton");

//Function to delete item from server
function deleteItemFromServer(itemId) {
  fetch(`http://localhost:3000/products/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Item ${itemId} deleted from server`);
      } else {
        console.error(`Failed to delete item ${itemId} from server`);
      }
    })
    .catch((error) => console.error(error));
}

//Function to display all products. Encopanses everything
function displayProducts(data) {
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
    addToCartBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <div class="cartItemsContainer">
          <img src="${product.image}" id="cartItemImage">        
            <p>${product.title}</p> 
            <p class="price">Price: ${product.price}</p>        
          <button class="removeCartItem">Remove</button>
        </div>
        `;

        cartItems.appendChild(cartItem);

        total.textContent = `Ksh: ${getTotal()}`;

        //function to calculate the total of the cart items
        function getTotal() {
          const cartItemsList =
            cartItems.getElementsByClassName("cartItemsContainer");

          const total = Array.from(cartItemsList)
            .map((item) =>
              parseInt(item.querySelector(".price").textContent.split(":")[1])
            )
            .reduce((a, b) => a + b, 0);
          return total;
        }

        // add event listener to removeCartItem button
        const removeCartItemBtns =
          cartItems.querySelectorAll(".removeCartItem");
        removeCartItemBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            btn.parentElement.remove();
            total.textContent = `Ksh: ${getTotal()}`;
          });
        });
      });
    });
  });
}

//Display all products when the page loads
window.addEventListener("DOMContentLoaded", () => {
  filterProducts();
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
