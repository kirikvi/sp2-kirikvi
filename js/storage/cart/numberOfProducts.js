import { getCart } from "./cartFunctions.js";

export function numberOfProducts() {
    const products = getCart();
    
    const quantity = document.querySelector(".in-cart");

    // show the amount of products in cart as long as it's not empty
    if(products.length === 0) {
        quantity.style.display = "none";
    } else {
        quantity.innerHTML = `${products.length}`;
    }
}

