import { displayMessage } from "./components/displayMessage.js";
import { dropdown } from "./components/dropdown.js";
import { baseUrl } from "./api/api.js";
import { handleClick } from "./storage/cart/addToCart.js";
import { numberOfProducts } from "./storage/cart/numberOfProducts.js";

dropdown();
numberOfProducts();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const product = document.querySelector(".specific-product-container");
const breadcrumbs = document.querySelector(".breadcrumbs");
const title = document.querySelector("title");

const productUrl = baseUrl + "/products/" + id;

async function fetchProduct(){
    try {
        const search = await fetch(productUrl);
        const productResult = await search.json();

        const imageUrl = baseUrl + productResult.image.url; 

        title.innerHTML = "HUD | " + productResult.title;

        product.innerHTML = `
            <div class="specific-product-container">
                <img src="${imageUrl}">
                <div class="specific-product-content">
                    <h1>${productResult.title}</h1>
                    <p class="specific-product-information">${productResult.description}</p>
                    <p class="price">${productResult.price} NOK</p>
                    <p class="button-styled-link btn-add-to-cart dark" data-id="${productResult.id}" data-name="${productResult.title}" data-price="${productResult.price}" data-image="${imageUrl}">Add to cart</p>
                </div>
            </div>`;

        breadcrumbs.innerHTML = `
                    <a href="index.html">Home</a>|
                    <a href="products.html">Products</a>|
                    <a class="active">${productResult.title}</a>`; 

        const addToCart = document.querySelectorAll(".btn-add-to-cart");

        addToCart.forEach((button) => {
            button.addEventListener("click", handleClick);
        }); 
    }
    catch(error) {
        console.log(error);
        displayMessage("error", error, ".message-container");
    }
    finally {
        console.log("finally");
    }
}
fetchProduct();


    

