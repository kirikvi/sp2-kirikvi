export function prepareFormData(form){
    const formData = new FormData();
    const formElements = form.elements;

    const data = {};

    for (let i = 0; i < formElements.length; i++) {
        const currentElement = formElements[i];
        //check if the checkbox is checked or not
        if (currentElement.type === "checkbox"){
            data[currentElement.id] = currentElement.checked;
        } else if (!['submit', 'file'].includes(currentElement.type)) {
            data[currentElement.id] = currentElement.value;
        //upload the image/file
        } else if (currentElement.type === 'file') {
            const file = currentElement.files[0];
            formData.append(`files.${currentElement.name}`, file, file.name);
        }
    }

    formData.append("data", JSON.stringify(data));
    return formData;
}