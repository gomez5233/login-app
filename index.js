require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE usuario=? AND password=?",
    [usuario, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.json({
          ok: true,
          mensaje: "Ingreso autorizado",
        });
      }

      return res.json({
        ok: false,
        mensaje: "No existe el usuario",
      });
    }
  );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo");
});
