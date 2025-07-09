import express from "express"
import { readdir, rename, rm } from "fs/promises";
import { createWriteStream } from "fs"
import cors from "cors"

const app = express();
const PORT = 4000;

app.use(express.json())

app.use(cors({
  origin: '*',
  methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', async (req, res) => {
    const folderData = await readdir("./storage", { withFileTypes: true });
    const data = folderData.map((item) => {
        return { fitem: item.name, isdirectory : item.isDirectory()}
    })
    res.json(data);
});


// Get Logic
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

// Upload File 
app.post('/:filename', (req, res) => {
    // console.log(req.headers)
    const { filename } = req.params;
    console.log("--> ", filename);
    const writeStream = createWriteStream(`./storage/${filename}`);
    req.pipe(writeStream);
    res.end("Data received");
});

// Rename logic
app.patch('/:filename', async (req, res) => {
    const { filename } = req.params;
    // console.log("Filename: ", filename);
    // console.log("newFileName: ", req.body.newFileName);
    // console.log("extName: ", filename.split(".")[1]);
    const fileExt = "hello.png".split(".")[1];
    // console.log(req.body.newFileName);
    await rename(`./storage/${filename}`, `./storage/${req.body.newFileName}.${filename.split(".")[1]}`); // PascalCase `newFilename`
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
