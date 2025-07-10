import { loadDirItem } from "./loadDirItem.js";

const URL = "http://localhost:4000/";

export async function renameFile(oldFileName) { 
    // console.log(oldFileName);
    if (!inputField.value) { alert("enter new file name"); return }
    await fetch(`${URL}files/${oldFileName}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            newFileName: inputField.value,
        })
    })
    loadDirItem();
 }