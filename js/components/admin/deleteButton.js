import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";

export default function deleteProduct(id) {
    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button type="button" class="delete-button">Delete product</button>`;

    const deleteButton = document.querySelector(".delete-button");

    deleteButton.onclick = async function() {
        //The product should only be deleted if the user confirms
        const doDelete = confirm("Delete this product");

        if(doDelete) {
            const url = baseUrl + "/products/" + id;
            const token = getToken();
    
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            try{
                const response = await fetch(url, options);
                const json = await response.json();
                console.log(json);
                
                //Redirect back to the admin page
                location.href = "/adminpage.html";
            } catch(error) {
                console.log(error);
            }
        }
    };
}