import { baseUrl } from "./api/api.js";
import { displayMessage } from "./components/displayMessage.js";
import { renderProducts } from "./components/renderProducts.js";
import { filterProducts } from "./components/filterProducts.js";
import { handleClick } from "./storage/cart/addToCart.js";
import { numberOfProducts } from "./storage/cart/numberOfProducts.js";
import { dropdown } from "./components/dropdown.js";

dropdown();
numberOfProducts();

const productsUrl = baseUrl + "/products";

async function fetchProducts() {
    const loading = document.querySelector(".loading-container");

    try{
        const response = await fetch(productsUrl)
        const json = await response.json();

        console.log(json);

        if(json){
            loading.innerHTML = "";
        }   

        renderProducts(json);
        filterProducts(json);

        const addToCart = document.querySelectorAll(".btn-add-to-cart");

        addToCart.forEach((button) => {
            button.addEventListener("click", handleClick);
        });                
    }

    catch(error){
        console.log(error);
        displayMessage("error", error, ".message-container");
    }
}
fetchProducts()

