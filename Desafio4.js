const express = require("express");
const app = express();

const { Router } = express;
const router = Router();

app.use("/api", router);
app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let productos = [
  { title: "Notebook", price: 500, thumbnail: "url", id: "1" },
  { title: "Tablet", price: 300, thumbnail: "url", id: "2" },
  { title: "Celular", price: 150, thumbnail: "url", id: "3" },
];

router.get("/productos", (req, res) => {
  const allProducts = [];
  for (const dato of productos) {
    allProducts.push(dato.title);
  }
  console.log(`Los archivos presentes son: ${allProducts}`);
  res.send(`Los archivos presentes son: ${allProducts}`);
});

router.get("/productos/:id", (req, res) => {
  const { params } = req;
  const byId = productos.find((producto) => producto.id == req.params.id);
  if (byId) {
    console.log(`El producto ${byId.title} corresponde al ID: ${req.params.id}`);
    res.send(`El producto ${byId.title} corresponde al ID: ${req.params.id}`);
  } else {
    console.log(`No existe un producto con ese ID`);
    res.send(`No existe un producto con ese ID`);
  }
});

router.post("/productos", (req, res) => {
  productos.push(req.body);
  // const contadorId = [];
  // let ultimoId;
  // for (const dato of productos) {
  //   ultimoId = contadorId.push(dato.title);
  // }
  // ultimoId++;
  // console.log(contadorId.length);
  // console.log(ultimoId);

  console.log(productos);
  console.log(req.body);
  res.send(`POST Ok. El producto asignado fue: . ID: `);
});

router.delete("/productos/:id", (req, res) => {
  const { params } = req;
  const deleteId = productos.find((producto) => producto.id == req.params.id);
  if (deleteId) {
    const deleteIndex = productos.findIndex((producto) => producto.id == req.params.id);
    productos.splice(deleteIndex, 1);
    console.log(`El producto ${deleteId.title} ha sido eliminado`);
    console.log(productos);
    res.send(`El producto ${deleteId.title} ha sido eliminado`);
  } else {
    console.log(`No existe un producto con ese ID`);
    res.send(`No existe un producto con ese ID`);
  }
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
