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

    if(titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageSelector.files.length === 0) {
        displayMessage("warning", "Please supply proper values", ".message-container");
    } else { 
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
        console.log(response);
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
