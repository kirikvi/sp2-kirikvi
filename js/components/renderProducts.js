import { baseUrl } from "../settings/api.js";

export function renderProducts(productsToRender) {

    const container = document.querySelector(".products-container");
    container.innerHTML = "";

    productsToRender.forEach(function (product) {

        const imageUrl = baseUrl + product.image.url; 

        container.innerHTML += 
            `<div class="product-item">
                <a href="specificproduct.html?id=${product.id}">
                    <img src="${imageUrl}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p class="price">${product.price} NOK</p>
                </a>
                <p class="button-styled-link btn-add-to-cart dark" data-id="${product.id}" data-name="${product.title}" data-price="${product.price}" data-image="${imageUrl}">Add to cart</p>
            </div>`;  
    });
}