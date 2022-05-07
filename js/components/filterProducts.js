import { renderProducts } from "./renderProducts.js";
import { displayMessage } from "./displayMessage.js";

export function filterProducts(product) {
    const filter = document.querySelector(".filter");

    filter.onkeyup = function(){
        const filterValue = event.target.value.trim().toLowerCase();
    
        //Filter products
        const filteredProducts = product.filter(function(productTitle){
            if(productTitle.title.toLowerCase().includes(filterValue)){
                return true;
            }     
        });

        // display a message if there are no results
        if(filteredProducts.length === 0) {
            const noResults = `No results for "${filterValue}".`;
            displayMessage("", noResults, ".message-container");
        } else{
            const noResults = "";
            displayMessage("", noResults, ".message-container");
        }

        //display the filtered products
        renderProducts(filteredProducts);
    }
}

filterProducts()