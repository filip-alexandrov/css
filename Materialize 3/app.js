const express = require("express");
const path = require("path");
const fs = require("fs");
const { type } = require("os");

const app = express();

app.use(express.json());

// Middleware for parsing requests
app.use(
  express.urlencoded({
    extended: true,
  })
);

// First search public folder (HTML automatically requests js/css files)
app.use(express.static(path.join(__dirname, "public")));

// Check login details
app.post("/submit-login-form", function (req, res) {
  console.log(req.body.email, req.body.password, req.body.checkbox);
  let email = req.body.email;
  let password = req.body.password;

  if (req.body.checkbox) {
    // Save email
    fs.writeFile("email.txt", email, function (err) {
      if (err) throw err;
    });
  } else if (req.body.checkbox == false) {
    fs.writeFile("email.txt", "", function (err) {
      if (err) throw err;
    });
  }

  let validity = false;
  data = fs.readFileSync("data.json");
  data = JSON.parse(data);
  if (data["password"] == password) {
    validity = true;
    console.log("in if");
  }
  console.log("sending");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(JSON.stringify({ title: "Checked", valid: validity }));
  return res.end();
});

// Send email autofill
app.get("/autofill-email", function (req, res) {
  fs.readFile("email.txt", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

// Start dev server on 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
