import { getUsername } from "../../utils/storage.js";
import logout from "./logoutButton.js";

export function createMenu() {
    const { pathname } = document.location;
    const menuContainer = document.querySelector(".admin-menu");
    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

    if (username) {
        authLink = `<a href="addproduct.html" class="${pathname === "/addproduct.html" ? "active" : ""}">Add product</a>
        <div><span id="loggedin-user">Logged in as: ${username}</span>
        <button id="logout">Log out</button></div>`;
    }

    menuContainer.innerHTML = `<a href="/adminpage.html" class="${pathname === "/" || pathname === "/adminpage.html" ? "active" : ""}">Admin page</a>
                                ${authLink}`;

    logout();
}
