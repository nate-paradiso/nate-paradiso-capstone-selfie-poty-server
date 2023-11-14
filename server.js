const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const homeRoutes = require("./routes/home-routes.js");

const userRoutes = require("./routes/user-routes");

app.use(express.json());

app.use("/", homeRoutes);

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
