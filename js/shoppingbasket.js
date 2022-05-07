import { dropdown } from "./components/dropdown.js";
import { getCart } from "./storage/cart/cartfunctions.js";
import { numberOfProducts } from "./storage/cart/numberOfProducts.js";
dropdown();
numberOfProducts();

const cartContainer = document.querySelector(".shopping-basket");
const subTotal = document.querySelector(".subtotal");

let total = 0;
const products = getCart();

// Display a message if the cart is empty
if(products.length === 0){
    cartContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
}

products.forEach(inCart => {
    // Get the total price
    total += parseFloat(inCart.productPrice);

    cartContainer.innerHTML += 
            `<div class="shopping-basket-item">
                <a href="specificproduct.html?id=${inCart.id}" class="product-in-basket">
                    <img src="${inCart.image}" alt="${inCart.title}">
                    <h2>${inCart.title}</h2>
                </a>
                <div style="display: flex;">
                    <p class="price">${inCart.productPrice} NOK</p>
                </div>
            </div>`;
});

// Display the total price
subTotal.innerHTML = `TOTAL ${total} NOK`;

