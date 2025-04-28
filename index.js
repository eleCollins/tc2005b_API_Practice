import "dotenv/config";
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use(usersRoutes);

const port = process.env.PORT || 6001;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});