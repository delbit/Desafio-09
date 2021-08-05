import express from 'express';
import Producto from './../class/producto.js';
import { contenido } from './../module/app.js';

const router = express.Router();

/**
 * DATOS A MANIPULAR
 */
const productos = [];

//Creando algunos Productos para pruebas
//Comentar para verificar el error de no existen productos.
for (let i = 0; i < 2; i++) {
  const objDatos = contenido();
  const objProducto = new Producto(
    objDatos.title,
    objDatos.price,
    objDatos.thumbnail,
    i + 1
  );
  productos.push(objProducto);
}

/**
 * DEFINICION RUTAS BASICAS
 */

//Ruta para Listar todos los producto existentes
router.get('/productos/listar', (req, res) => {
  if (productos.length < 1) {
    return res.status(400).json({
      error: 'No hay productos cargados',
    });
  }

  res.json({
    productos,
  });
});

//Ruta para listar un producto especifico por su id
router.get('/productos/listar/:id', (req, res) => {
  const id = parseInt(req.params.id) - 1;

  if (id < 0 || id >= productos.length) {
    return res.status(400).json({
      error: 'Producto no encontrado',
    });
  }

  const product = productos[id];
  res.json({
    product,
  });
});

//Ruta para guardar un producto nuevo si se cumplen los parámetros necesarios.
router.post('/guardar', (req, res) => {
  const body = req.body;
  const errorGuardar = () => {
    return res.status(400).json({
      error: 'Parámetros no validos',
    });
  };

  if (body.title === undefined) {
    errorGuardar();
  }

  if (body.price === undefined) {
    errorGuardar();
  }

  if (isNaN(parseFloat(body.price))) {
    errorGuardar();
  }

  if (body.thumbnail === undefined) {
    errorGuardar();
  }

  const objProducto = new Producto(
    body.title,
    body.price,
    body.thumbnail,
    productos.length + 1
  );

  productos.push(objProducto);

  res.json({
    objProducto,
  });
});

//Ruta para guardar un producto nuevo si se cumplen los parámetros necesarios.
router.put('/productos/actualizar/:id', (req, res) => {
  const id = parseInt(req.params.id) - 1;
  const body = req.body;
  const errorGuardar = () => {
    return res.status(400).json({
      error: 'Parámetros no validos',
    });
  };

  if (id < 0 || id >= productos.length) {
    errorGuardar();
  }

  if (body.title === undefined) {
    errorGuardar();
  }

  if (body.price === undefined) {
    errorGuardar();
  }

  if (isNaN(parseFloat(body.price))) {
    errorGuardar();
  }

  if (body.thumbnail === undefined) {
    errorGuardar();
  }

  productos[id].title = body.title;
  productos[id].price = body.price;
  productos[id].thumbnail = body.thumbnail;
  const objProducto = productos[id];

  res.json({
    objProducto,
  });
});

//Ruta encargada de eliminar un producto
router.delete('/productos/borrar/:id', (req, res) => {
  const id = parseInt(req.params.id) - 1;

  if (id < 0 || id >= productos.length) {
    return res.status(400).json({
      error: 'Producto no encontrado',
    });
  }
  const product = productos[id];
  productos.splice(id, 1);
  res.json({
    product,
  });
});

export default router;
