import { baseUrl } from "../api/api.js";

export async function createHero(){
    const hero = document.querySelector(".campaign-container");
    const heroUrl = "http://localhost:1337/home";

    try {
        const search = await fetch(heroUrl);
        const heroResult = await search.json();

        //Get the URL for the hero banner image
        const heroBanner = baseUrl + heroResult.hero_banner.url;
    
        // Create the hero banner content
        hero.innerHTML = `
            <div class="campaign-text">
                <h1>Campaign!</h1>
                <p>Get the HÚÐ hydrating kit for 30% off for a limited period</p>
                <p class="was price">Was 2 639 NOK</p>
                <p class="now price">Now 1 847 NOK</p>
                <a href="/specificproduct.html?id=10" class="button-styled-link dark">Get it now</a>
            </div>`;   
        
        // Make the Hero image the background image of the hero banner content
        hero.style.backgroundImage = `url("${heroBanner}")`;
        
    }
    catch(error) {
        console.log(error);
    }
    finally {
        console.log("finally");
    }
}




