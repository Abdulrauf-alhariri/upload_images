const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, path.resolve(__dirname, "./images/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.patch("/upload", upload.array("image"), (req, res) => {
  // console.log(req.body, "hi");
  console.log(req.files);
  const { title } = req.body;
  console.log(title);
  res.send({ data: req.files });
});

app.get("/get-data", (req, res) => {
  res.send("data");
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is now live on port 3000");
  }
});
