import { getToken } from "../../utils/storage.js";

const token = getToken();

document.getElementById("app").innerHTML = `
<h1>File Upload & FormData Example</h1>
<div>
<input type="file" id="fileInput" />
</div>
`;

const fileInput = document.querySelector("#fileInput");

const uploadFile = file => {
  console.log("Uploading file...");
  const API_ENDPOINT = "http://localhost:1337/products";
  const request = new XMLHttpRequest();
  const formData = new FormData();

  request.open("POST", API_ENDPOINT, true);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.responseText);
    }
  };
  formData.append(`files.${file.name}`, file, file.name);
  request.send(formData);
  return fetch(API_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
        Authorization: `Bearer ${token}`
    },
});
};

fileInput.addEventListener("change", event => {
  const files = event.target.files;
  uploadFile(files[0]);
});