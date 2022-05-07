import { fetchFeatured } from "./components/fetchFeatured.js";
import { dropdown } from "./components/dropdown.js";
import { baseUrl } from "./api/api.js";
import { handleClick } from "./storage/cart/addToCart.js";
import { numberOfProducts } from "./storage/cart/numberOfProducts.js";
import { createHero } from "./components/heroBanner.js";


dropdown();
numberOfProducts();

const productsUrl = baseUrl + "/products";

async function fetchIndexContent() {
    createHero();
    const loading = document.querySelector(".loading-container");

    try{
        const response = await fetch(productsUrl)
        const json = await response.json();

        if(json){
            loading.innerHTML = "";
        }   

        fetchFeatured(json);

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
fetchIndexContent()

