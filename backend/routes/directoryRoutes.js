import express from "express";
import { readdir, stat } from "fs/promises";
import fs from "fs"
const router = express.Router();

router.get('/{*splat}', async (req, res) => {
    const rawPath = req.originalUrl.split('?')[0]; // remove query string
    const dirname = rawPath.replace(/^\/directory\/?/, '');

    console.log(dirname);
    const fullDirPath = `./storage/${dirname || ""}`;
    if (!fs.existsSync(fullDirPath)) {
        return res.status(404).json({ error: 'Directory not found' });
    }

    const filesList = await readdir(fullDirPath);
    console.log(fullDirPath);
    //   console.log(filesList)
    const resData = [];
    for (const item of filesList) {
        const stats = await stat(`${fullDirPath}/${item}`);
        resData.push({ fname: item, isDirectory: stats.isDirectory() });
    }
    res.json(resData);
});

export default router;