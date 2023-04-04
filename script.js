const products = document.getElementById("products");

//Display all products when the page loads
window.addEventListener("DOMContentLoaded", () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((product) => {
        console.log(product);
        const li = document.createElement("li");
        li.setAttribute("id", "items");
        li.innerHTML = `
        <img src="${product.image}"/>
        <p>${product.title}</p>
        <p>${product.price}</p>
        <p id="addToCart">Add To Cart</p>
        `;
        products.appendChild(li);
      });
    });

  //Function to display products
});
