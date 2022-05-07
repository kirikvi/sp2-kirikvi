import { displayMessage } from "./components/displayMessage.js";
import { createMenu } from "./components/admin/createMenu.js";
import { getToken} from "./storage/storage.js";
import { baseUrl} from "./api/api.js";
import deleteProduct from "./components/admin/deleteButton.js";
import { numberOfProducts } from "./storage/cart/numberOfProducts.js";
import { dropdown } from "./components/dropdown.js";
import { prepareFormData } from "./components/admin/form.js";

const token = getToken();

if(!token) {
    location.href = "/";
}

dropdown();
numberOfProducts();
createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if(!id) {
    document.location.href = "/adminpage.html";
}

const productUrl = baseUrl + "/products/" + id;

const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading-container");
//Form inputs
const form = document.querySelector("#update-product");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const featuredInput = document.querySelector("#featured");
//The current image
const image = document.querySelector(".form-image");

// Fetch the current product details in the form
(async function () {
    try{
        const response = await fetch(productUrl);
        const details = await response.json();

        const imageUrl = baseUrl + details.image.url;

        title.value = details.title;
        price.value = details.price;
        description.value = details.description;
        idInput.value = details.id;
        featuredInput.checked = details.featured;
        image.src = `${imageUrl}`;

        deleteProduct(id);

    } catch(error){
        console.log(error);

    } finally {
        loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event){
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const idValue = idInput.value;
    const imageSelector = document.querySelector("#image");

    // Form input validations
    if(titleValue.length === 0){
        title.className = "warning-border";
        displayMessage("warning", "Please fill in the required fields", ".message-container");
    } else {
        title.className = "success-border";
    }

    if(priceValue === 0 || isNaN(priceValue)){
        price.className = "warning-border";
        displayMessage("warning", "Please fill in the required fields", ".message-container");
    } else {
        price.className = "success-border";
    }    

    if(descriptionValue.length === 0){
        description.className = "warning-border";
        displayMessage("warning", "Please fill in the required fields", ".message-container");
    } else {
        description.className = "success-border";
    }
    
    if(imageSelector.files.length === 0){
        imageSelector.className = "warning-border";
        displayMessage("warning", "Please fill in the required fields", ".message-container");
    } else {
        imageSelector.className = "success-border";
    }

    if(!titleValue.length === 0 || !priceValue === 0 || !isNaN(priceValue) || !descriptionValue.length === 0 || !imageSelector.files.length === 0) {
        updateProduct(idValue);
    }    
}

async function updateProduct(id) {
    const url = baseUrl + "/products/" + id;
    const options = {
        method: "PUT",
        body: prepareFormData(form),
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        console.log(response);
        const json = await response.json();
        

        if(json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");

        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch(error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
}
