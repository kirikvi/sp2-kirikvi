import { createMenu } from "./components/admin/createMenu.js";
import { displayMessage } from "./components/displayMessage.js";
import { dropdown } from "./components/dropdown.js";
import { baseUrl } from "./api/api.js";
import { numberOfProducts } from "./storage/cart/numberOfProducts.js";
import { getToken } from "./storage/storage.js";

const token = getToken();

if(!token) {
    location.href = "login.html";
}

dropdown();
numberOfProducts();
createMenu();

const productsUrl = baseUrl + "/products";

(async function () {
    const container = document.querySelector(".products-container");
    const loading = document.querySelector(".loading-container");

    try{
        const response = await fetch(productsUrl);
        const json = await response.json();

        container.innerHTML = "";

        if(json){
            loading.innerHTML = "";
        }   

        json.forEach(function (product) {
            const imageUrl = baseUrl + product.image.url; 
    
            container.innerHTML += `
                <a class="product-item admin-item" href="updateproduct.html?id=${product.id}">
                    <img src="${imageUrl}" alt="${product.title}"/>
                    <h3>${product.title}</h3>
                    <p class="price">${product.price} NOK</p>
                </a>`  
        });
    }catch(error){
        console.log(error);
        displayMessage("error", error, ".products-container");
    }
})();