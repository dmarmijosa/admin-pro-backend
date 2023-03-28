/**
 * Hospitales
 * ruta: '/api/todo:busqueda'
 */

const { Router } = require("express");
const { getBusqueda, getDocumentosColeccion } = require("../controllers/busquedas");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();
router.get("/:busqueda", validarJwt, getBusqueda);
router.get("/coleccion/:tabla/:busqueda", validarJwt, getDocumentosColeccion);
module.exports = router;
