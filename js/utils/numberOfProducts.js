import { getCart } from "./cartfunctions.js";

export function numberOfProducts() {
    const products = getCart();
    
    const quantity = document.querySelector(".in-cart");

    quantity.innerHTML = `${products.length}`;
}

