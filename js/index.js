import { fetchFeatured } from "./components/fetchFeatured.js";
import { dropdown } from "./components/navigation.js";
import { baseUrl } from "./settings/api.js";
import { handleClick } from "./utils/addtocart.js";
import { numberOfProducts } from "./utils/numberOfProducts.js";

dropdown();
numberOfProducts();

const productsUrl = baseUrl + "/products";

async function fetchIndexContent() {
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

