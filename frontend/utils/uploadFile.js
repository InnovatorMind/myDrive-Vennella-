import { loadDirItem } from "./loadDirItem.js";

export function uploadFile() {
    const input = document.getElementById("inputFile");
    const file = input.files[0];

    const URL = "http://localhost:4000/";
    if (!file) { alert("No file selected") }
    if (file) {
        const xhr = new XMLHttpRequest();
        const progressBar = document.getElementById("progressBar");
        const percentLabel = document.getElementById("percentLabel");

        xhr.open("POST", `${URL}files/${file.name}`);
        xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");

        // Track upload progress
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                progressBar.value = percent;
                percentLabel.textContent = percent + "%";
            }
        };

        xhr.onload = function () {
            console.log("Response from server:", xhr.responseText);
            loadDirItem();
            progressBar.value = 0;
            percentLabel.textContent = 0;
        };

        xhr.onerror = function () {
            console.error("Upload failed");
        };

        xhr.send(file);
    }
    setTimeout(() => {

    }, 1000);
}

export default uploadFile
