import express from "express"
import cors from "cors";
import directoryRoutes from "./routes/directoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";


const app = express();
const PORT = 4000;

app.use(express.json())
// app.use(cors());
app.use(cors({
  origin: 'http://127.0.0.1:5501',
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
//    allowedHeaders: ['Content-Type', 'Authorization']
}),
(req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
        // console.log("handledFavicon");
        return res.status(204).end();
    }
    next();
});

app.use("/files", fileRoutes);
app.use("/directory", directoryRoutes);



app.all('/{*hi}', (req, res) => {
  res.status(404).send('Page not found!');
});


app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})
