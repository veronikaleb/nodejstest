import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router as fighterRoutes } from "./routes/fighterRoutes.js";
import { responseMiddleware } from "./middlewares/response.middleware.js";
import { initRoutes } from "./routes/routes.js";
import "./config/db.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(responseMiddleware);

app.use("/api/fighters", fighterRoutes);
initRoutes(app);

app.use("/", express.static("./client/build"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
