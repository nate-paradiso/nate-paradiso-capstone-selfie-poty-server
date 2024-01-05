import express from "express";
import cors from "cors";
import "dotenv/config";

// import { cloudinaryConfig } from "./config/cloudinaryConfig.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.static("./public"));
app.use(express.json());
// app.use("*", cloudinaryConfig);

import homeRoutes from "./routes/home-routes.js";

import userRoutes from "./routes/user-routes.js";

app.use("/", homeRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
