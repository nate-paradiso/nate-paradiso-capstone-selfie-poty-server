import express from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8080;

// import homeRoutes from "./routes/home-routes.js";

import userRoutes from "./routes/user-routes.js";

app.use(express.json());

// app.use("/", homeRoutes);

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
