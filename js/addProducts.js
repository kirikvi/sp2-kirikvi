import { displayMessage } from "./components/displayMessage.js";
import { createMenu } from "./components/admin/createMenu.js";
import { getToken} from "./storage/storage.js";
import { baseUrl} from "./api/api.js";
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

const form = document.querySelector("#create-product");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");
const imageSelector = document.querySelector("#image");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();

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
        addProduct();
    }  
};

async function addProduct() {
    const url = baseUrl + "/products";

    const options = {
        method: "POST",
        body: prepareFormData(form),
        headers: {
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if(json.created_at) {
            displayMessage("success", "Product added", ".message-container");
            form.reset();
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch(error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
}
