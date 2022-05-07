import { getCart } from "./cartFunctions.js";

export function handleClick() {
    const id = this.dataset.id;
    const image = this.dataset.image;
    const title = this.dataset.name;
    const productPrice = this.dataset.price;
    
    const productsToBuy = getCart();

    // Check if the product is in the cart...
    const productInCart = productsToBuy.find(function(productToBuy){
        return productToBuy.id === id;
    });
   
    if(!productInCart) {  // ... if the product is not in the cart, save clicked product in localStorage 
        const product = { id, title, productPrice, image};
        productsToBuy.push(product);
        saveProducts(productsToBuy);

        //Change the style of the button to indicate to the user that the product was added to cart
        const addToCart = document.querySelectorAll(".btn-add-to-cart");
        addToCart.forEach(function(addToCartButton) {
            addToCartButton.addEventListener("click", function(){
                addToCartButton.classList.add("added");
                addToCartButton.innerHTML = `Added to cart <i class="fas fa-check"></i>`;
                // Undo the changes after a set time
                setTimeout(function(){
                    addToCartButton.classList.remove("added");
                    addToCartButton.innerHTML = "Add to cart";
                }, 2000);
                });
            });

    } else { // if it already is in the cart, remove the product from the cart
        const newProducts = productsToBuy.filter(productToBuy => productToBuy.id !== id);
        saveProducts(newProducts);
    }
}

function saveProducts(inCart) {
    localStorage.setItem("inCart", JSON.stringify(inCart));
}
