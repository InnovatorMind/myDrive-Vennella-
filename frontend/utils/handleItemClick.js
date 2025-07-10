import { loadDirItem } from "./loadDirItem.js";

export function handleItemClick(uname, isDirectory) {
  if (isDirectory) {
    loadDirItem(uname); 
  } else {
    console.log("It's a file:", uname);
    // console.log(`http://localhost:4000/files/${uname}?action=open`);
    window.location.href = `http://localhost:4000/files/${uname}?action=open`;
    // window.open(`http://localhost:4000/files/${uname}`, "_blank"); 
  }
}