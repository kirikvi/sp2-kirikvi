import { clearStorage } from "../../storage/storage.js";

export default function logout() {
    const logoutButton = document.querySelector("#logout");

    if(logoutButton){
        logoutButton.onclick = function() {
            const doLogout = confirm("Are you sure?");

            if(doLogout) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                location.href = "/";
            }
        }
    }
}


