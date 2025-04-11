const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "backend on" });
});

app.listen(PORT, () => {
  console.log(`server rodando em http://localhost:${PORT}`);
});
