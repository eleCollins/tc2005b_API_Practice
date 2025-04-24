import express from "express";
import indexRoutes from "./routes/index.routes.js"

const app = express();

app.use(indexRoutes);

const port = 6001;

app.listen(port, console.log("http://localhost:" + port));