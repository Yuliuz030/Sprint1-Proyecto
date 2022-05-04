const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();
const mysql = require("mysql");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join("frontend")));
app.set("frontend", path.join(__dirname, "../frontend/"));

const connection = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.NAME_DB,
});

// traer todos los registros
app.get("/marca/", (req, res) => {
  connection.query("SELECT * FROM marca", (e, data) => {
    if (e) {
      throw e;
    } else {
      res.send(data);
    }
  });
});

// traer solo un registro
app.get("/marca/:id", (req, res) => {
  connection.query(
    "SELECT * FROM marca WHERE id = ?",
    [req.params.id],
    (e, data) => {
      if (e) {
        throw e;
      } else {
        res.send(data);
      }
    }
  );
});

//Crear una marca
app.post("/marca/", (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  connection.query(
    "INSERT INTO marca set ?",
    { nombre, descripcion, estado },
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send(results);
      }
    }
  );
});

// editar una marca
app.put("/marca/:id", (req, res) => {
  let id = req.params.id;
  const { nombre, descripcion, estado } = req.body;
  let sql =
    "UPDATE marca SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?";
  connection.query(sql, [nombre, descripcion, estado, id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results);
    }
  });
});

// Borrar una marca
app.delete("/marca/:id", (req, res) => {
  connection.query(
    "DELETE FROM marca WHERE id =?",
    [req.params.id],
    (error, data) => {
      if (error) {
        throw error;
      } else {
        res.send(data);
      }
    }
  );
});

app.get("/vehiculo", (req, res) => {
  res.sendFile("./index.html", { "process.env.USER_DB": "index.html" });
});

app.get("/linea", (req, res) => {
  res.sendFile("./linea_vehiculo.html", { "process.env.USER_DB": "frontend/" });
});

app.get("/marca", (req, res) => {
  res.sendFile("./marca.html", { "process.env.USER_DB": "frontend/" });
});

const port = process.env.PORT || 4100;
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
