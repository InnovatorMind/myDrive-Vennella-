import express from "express"
import { readdir, rename, rm } from "fs/promises";
import { createWriteStream } from "fs"

const app = express();
const PORT = 4000;

app.use(express.json())

app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
    });
    //   console.log(req.body);
    next();
});

app.get('/', async (req, res) => {
    const folderData = await readdir("./storage", { withFileTypes: true });
    res.json(folderData);
})


// Get(Access Files) Logic
app.get('/:filename', (req, res) => {
    const { filename } = req.params;
    console.log(filename);
    if (req.query.action === "download") {
        res.set("Content-Disposition", "attachment");
    }
    res.sendFile(`${import.meta.dirname}\\storage\\${filename}`, (err) => {
        if (err) {
            console.error('File sending failed:', err.message);
            res.status(404).json({ error: 'File not found' });
        }
    });
});

// Add file
app.post('/:filename', (req, res) => {
    const { filename } = req.params;
    console.log("--> ", filename);
    const writeStream = createWriteStream(`./storage/${filename}`);
    req.pipe(writeStream);
    res.end("Data received");
});

// Rename logic
app.patch('/:filename', async (req, res) => {
    const { filename } = req.params;
    await rename(`./storage/${filename}`, `./storage/${req.body.newFileName}`); // PascalCase `newFilename`
    res.status(200).json({ message: "Renamed" });
});

// Delete file logic
app.delete('/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = `./storage/${filename}`;
    try {
        await rm(filePath);
        res.json({ message: "File Deleted Successfully" });
    } catch (err) {
        res.status(404).json({ message: "File Not Found!" });
    }
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})
