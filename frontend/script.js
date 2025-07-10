import { loadDirItem } from "./utils/loadDirItem.js"
import { handleItemClick } from "./utils/handleItemClick.js";
import { handleDelete } from "./utils/handleDelete.js";
import { renameFile } from "./utils/renameFile.js";
import { uploadFile } from "./utils/uploadFile.js";
import { saveFilename }  from "./utils/saveFilename.js"; 


loadDirItem();

const folderDiv = document.getElementById("folderDiv");


document.getElementById('folderDiv').addEventListener('click', function (e) {
  const target = e.target;

  // Handle Rename / Save / Delete buttons
  if (target.matches('button.rename')) {
    const fileName = target.dataset.name;
    renameFile(fileName);
    console.log('Rename clicked:', fileName);
    // rename logic here
  } else if (target.matches('button.save')) {
    const fileName = target.dataset.name;
    saveFilename(fileName);
    console.log('Save clicked:', fileName);
    // save logic here
  } else if (target.matches('button.delete')) {
    const fileName = target.dataset.name;
    handleDelete(fileName);
    console.log('Delete clicked:', fileName);
    // delete logic here
  }

  // Handle item div clicks (excluding button clicks)
 else if (target.closest('.item') && !target.closest('.controls')) {
  const itemDiv = target.closest('.item');
  const itemIndex = itemDiv.getAttribute('key');
  const itemName = itemDiv.querySelector('.item-main').textContent.trim();
  const isDirectory = itemDiv.dataset.isdir === 'true'; // it will be a string

  handleItemClick(itemName, isDirectory);

  console.log(`Clicked on item ${itemIndex}: ${itemName}, isDirectory: ${isDirectory}`);
}

});


document.querySelector("#submitFile").addEventListener("click", () => {
  uploadFile();
  console.log("Clicked on upload!!!");
});
