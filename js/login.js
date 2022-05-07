import { displayMessage } from "./components/displayMessage.js"
import { saveToken, saveUser } from "./storage/storage.js";
import { baseUrl } from "./api/api.js";
import { numberOfProducts } from "./storage/cart/numberOfProducts.js";
import { dropdown } from "./components/dropdown.js";

dropdown();
numberOfProducts();

const form = document.querySelector(".login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event){
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue.length === 0 || passwordValue.length === 0){
        return displayMessage("warning", "Please enter username and password", ".message-container")
    }

    doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password){
    const url = baseUrl + "/auth/local";
    const data = JSON.stringify({identifier: username, password: password});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try{
        const response = await fetch (url, options);
        const json = await response.json();

        if(json.user){
            displayMessage("success", "logged in", ".message-container");

            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "/adminpage.html";
        }
        if(json.error){
            displayMessage("error", "Invalid username and/or password", ".message-container");
        }
    } 
    catch(error) {
        console.log("catch");
    }
} 
