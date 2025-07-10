import { loadDirItem } from "./loadDirItem.js";
const URL = "http://localhost:4000/";

export async function handleDelete(filename) {
     await fetch(`${URL}files/${filename}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    console.log(filename);
    loadDirItem();
}