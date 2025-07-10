const URL = "http://localhost:4000/";

export function saveFilename(uname) {
    console.log("download file");
    console.log(uname);
    // window.location.href = `${URL}files/${uname}?action=download`;
    window.open(`http://localhost:4000/files/${uname}?action=download`, "_blank"); 
}

export default saveFilename
