import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(express.json());

import homeRoutes from "./routes/home-routes.js";

import userRoutes from "./routes/user-routes.js";

app.use("/", homeRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
