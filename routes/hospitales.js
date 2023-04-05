/**
 * Hospitales
 * ruta: '/api/hospitales'
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getHospitales,
  postHospitales,
  putHospitales,
  deleteHospitales,
} = require("../controllers/hospitales");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();
router.get("/", validarJwt, getHospitales);

router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre del hospital es obligatorio.").notEmpty(),
    validarCampos,
  ],
  postHospitales
);
router.put(
  "/:id",
  [
    validarJwt,
    check("nombre", "El nombre del hospital es obligatorio.").notEmpty(),
    validarCampos,
  ],
  putHospitales
);
router.delete("/:id", validarJwt, deleteHospitales);

module.exports = router;
