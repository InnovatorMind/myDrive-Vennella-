import express from "express";
import { rm, rename} from "node:fs/promises";
import  { createWriteStream} from "node:fs"

const router = express.Router();


// Get Logic
router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    console.log(filename);
    if (req.query.action === "download") {
        res.set("Content-Disposition", "attachment");
    }
    res.sendFile(`${process.cwd()}/storage/${filename}`);
});

router.post('/:filename', (req, res) => {
    // console.log(req.headers)
    const { filename } = req.params;
    console.log("--> ", filename);
    const writeStream = createWriteStream(`./storage/${filename}`);
    req.pipe(writeStream);
    res.end("Data received");
});


// Rename logic
router.patch('/:filename', async (req, res) => {
    const { filename } = req.params;
    const fileExt = "hello.png".split(".")[1];
    await rename(`./storage/${filename}`, `./storage/${req.body.newFileName}.${filename.split(".")[1]}`); // PascalCase `newFilename`
    res.status(200).json({ message: "Renamed" });
});

// Delete file logic
router.delete('/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = `./storage/${filename}`;
    try {
        await rm(filePath);
        res.json({ message: "File Deleted Successfully" });
    } catch (err) {
        res.status(404).json({ message: "File Not Found!" });
    }
});

export default router;;{process.cwd()}