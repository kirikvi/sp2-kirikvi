export function dropdown(){
    const dropdownButton = document.querySelector(".expand-dropdown");

    //Show dropdown menu
    dropdownButton.onclick = function() {
        const dropdownMenu = document.querySelector("#dropdown");
        dropdownMenu.classList.toggle("show-dropdown");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(dropdown) {
        if (!dropdown.target.matches('.expand-dropdown')) {
            const dropdownMenu = document.querySelector("#dropdown");
        if (dropdownMenu.classList.contains('show-dropdown')) {
            dropdownMenu.classList.remove('show-dropdown');
        }
        }
    }
}