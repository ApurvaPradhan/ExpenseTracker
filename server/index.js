const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const { db } = require("./db/db");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
// readdirSync("./routes").map((route) =>
//   app.use("api/v1", require("./routes/" + route))
// );

readdirSync("./routes").forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(`./routes/${file}`);
    app.use("/api/v1", route);
  }
});
const server = () => {
  db();

  app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
  });
};
server();
