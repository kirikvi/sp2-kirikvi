import { baseUrl } from "./settings/api.js";
import { displayMessage } from "./components/displayMessage.js";
import { renderProducts } from "./components/renderProducts.js";
import { filterProducts } from "./components/filterProducts.js";
import { handleClick } from "./utils/addtocart.js";
import { numberOfProducts } from "./utils/numberOfProducts.js";
import { dropdown } from "./components/navigation.js";

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

