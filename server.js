const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

console.log(`Hosting server on port ${PORT}`);
app.listen(PORT);