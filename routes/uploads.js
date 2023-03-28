/**
 * Hospitales
 * ruta: '/api/uploads'
 */
const ExpressfileUpload = require('express-fileupload');
const { Router } = require("express");
const { fileUpload, retornaImagen } = require("../controllers/uploads");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();
router.use(ExpressfileUpload());
router.put("/:tipo/:id", [validarJwt], fileUpload);
router.get("/:tipo/:foto", retornaImagen);
module.exports = router;
