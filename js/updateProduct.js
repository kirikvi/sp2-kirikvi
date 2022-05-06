import { displayMessage } from "./components/displayMessage.js";
import { createMenu } from "./components/admin/createMenu.js";
import { getToken} from "./utils/storage.js";
import { baseUrl} from "./settings/api.js";
import deleteProduct from "./components/admin/deleteButton.js";
import { numberOfProducts } from "./utils/numberOfProducts.js";
import { dropdown } from "./components/navigation.js";
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

const form = document.querySelector("#update-product");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const image = document.querySelector(".form-image");
const featuredInput = document.querySelector("#featured");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading-container");

(async function () {
    try{
        const response = await fetch(productUrl);
        const details = await response.json();

        title.value = details.title;
        price.value = details.price;
        description.value = details.description;
        idInput.value = details.id;
        featuredInput.checked = details.featured;
        const imageUrl = baseUrl + details.image.url;
        console.log(imageUrl);
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

    if(titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    updateProduct(idValue);
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
        const json = await response.json();
        console.log(json);

        if(json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch(error) {
        console.log(error);
    }
}
