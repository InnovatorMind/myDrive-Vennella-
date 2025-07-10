export async  function loadDirItem(uname = "") {
  console.log(uname);
const URL = "http://localhost:4000/";
const folderDiv = document.getElementById("folderDiv");
let dirContents = [];

console.log(`${URL}directory/${uname}`)
try {
  const res = await fetch(`${URL}directory/${uname}`);
  dirContents = await res.json();
  console.log(dirContents)
} catch (err) {
  console.error("Failed to fetch directory contents:", err);
}

  folderDiv.innerHTML = ''; 

  dirContents.forEach((item, i) => {
  const itemHTML = `
    <div key="${i}" class="item" data-isdir="${item.isDirectory}" style="margin-bottom: 10px; cursor: pointer;">
      <div class="item-main">
        <img src="${item.isDirectory ? './public/open-folder.png' : './public/file.png'}"
             alt="${item.isDirectory ? 'Folder' : 'File'}"
             style="width: 20px; vertical-align: middle; margin-right: 5px;" />
        ${item.fname}
      </div>
      ${!item.isDirectory ? `
        <div class="controls">
          <button class="rename" data-name="${item.fname}">Rename</button>
          <button class="save" data-name="${item.fname}">Save</button>
          <button class="delete" data-name="${item.fname}">Delete</button>
        </div>` : ''}
    </div>
  `;

  folderDiv.innerHTML += itemHTML;
});

}