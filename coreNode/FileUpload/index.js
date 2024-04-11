const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

const upload = multer({ dest: "uploads/" });

app.set("view engine", "ejs");
app.set("views", path.resolve("./FileUploadView"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/')
});

app.listen(8088, () => {
  console.log("Server is running on port 8088");
});

//multer is used to upload the file
//npm i multer
