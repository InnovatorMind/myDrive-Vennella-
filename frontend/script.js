
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
console.log(dirContents);
dirContents.map((item, i) => {
    // console.log(item)
   folderDiv.innerHTML += `
  <div key="${i}" 
       style="margin-bottom: 10px; cursor: pointer;" 
       onclick="handleItemClick('${item.fitem}', ${item.isdirectory})">
       
    <div>
      <img src="${item.isdirectory ? './public/open-folder.png' : './public/file.png'}" 
           alt="${item.isdirectory ? 'Folder' : 'File'}" 
           style="width: 20px; vertical-align: middle; margin-right: 5px;" />
      ${item.fitem}
    </div>
    
    ${
      !item.isdirectory
        ? `<div>
            <button onclick="event.stopPropagation(); renameFile('${item.fitem}')">Rename</button>
            <button onclick="event.stopPropagation(); saveFilename('${item.fitem}')">Save</button>
            <button onclick="event.stopPropagation(); handleDelete('${item.fitem}')">Delete</button>
          </div>`
        : ''
    }
  </div>
`;

})
window.handleItemClick = (name, isDirectory) => {
  const action = isDirectory ? 'open' : 'open';
  window.location.href = `${URL}${name}?action=${action}`;
}
window.saveFilename = (name, isDirectory) => {
  const action = isDirectory ? 'open' : 'open';
//   console.log(`${URL}${name}?action=download`)
  window.location.href = `${URL}${name}?action=download`;
}
// window.saveFilename = function (item) { console.log(item); }


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


window.handleDelete = async function (filename) {
    await fetch(`${URL}${filename}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    console.log(filename);
}

window.uploadFile = async function () {
    const input = document.getElementById("inputFile");
    const file = input.files[0];

    if (!file) { alert("No file selected") }
    if (file) {

        const xhr = new XMLHttpRequest();
        const progressBar = document.getElementById("progressBar");
        const percentLabel = document.getElementById("percentLabel");

        xhr.open("POST", `${URL}${file.name}`);
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
