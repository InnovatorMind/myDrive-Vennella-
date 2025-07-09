
let dirContents = [];
const URL = "http://localhost:4000/";
try {
    const dirContent = await fetch(URL);
    const data = await dirContent.json();
    // console.log(data[1].name); // <-- This will show the actual JSON response
    dirContents = data;
} catch (error) {
    console.error("Failed to fetch data:", error);
}

const folderDiv = document.getElementById("folderDiv");
dirContents.map((item, i) => {
    folderDiv.innerHTML += `
                <div key="${i}">
                    <div>
                  ${item.name} 
                  <a href="${URL}${item.name}?action=open">Open</a>
                  <a href="${URL}${item.name}?action=download">Download</a>
                  </div>
                  <div>
                    <button onclick="renameFile('${item.name}')">Rename</button>
                    <button onclick="saveFilename('${item.name}')">Save</button>
                    <button onclick="handleDelete('${item.name}')">Delete</button>
                  </ div>
                  <br />
                </div>
                `
})

const inputField = document.getElementById("inputField");
window.renameFile = async function (oldFileName) {
    if (!inputField.value) { alert("enter new file name"); return }
    await fetch(`${URL}${oldFileName}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            newFileName: inputField.value,
        })
    })
}

window.saveFilename = function (item) { console.log(item); }

window.handleDelete = async function (filename) {
    await fetch(`${URL}${filename}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    console.log(item);
}

window.uploadFile = async function () {
    const input = document.getElementById("inputFile");
    const file = input.files[0];

    if (!file) { alert("No file selected") }
    if (file) {

        const xhr = new XMLHttpRequest();
        const progressBar = document.getElementById("progressBar");
        const percentLabel = document.getElementById("percentLabel");

        xhr.open("POST", `http://localhost:4000/${file.name}`);
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
        };

        xhr.onerror = function () {
            console.error("Upload failed");
        };

        xhr.send(file);
    }
}
