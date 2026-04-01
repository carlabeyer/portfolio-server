const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server läuft ✅");
});

/* 🔥 FORMULAR ROUTE */
app.post("/api/contact", upload.none(), (req, res) => {
  console.log("📩 Formular erhalten:");
  console.log(req.body);

  res.json({ message: "Daten angekommen ✅" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server läuft");
});