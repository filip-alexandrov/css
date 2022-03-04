let express = require("express");
let app = express();
port = 3001;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname, "public", "index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
