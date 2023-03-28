/**
 * Medicos
 * ruta: '/api/hospitales'
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMedicos,
  postMedicos,
  putMedicos,
  deleteMedicos,
} = require("../controllers/medicos");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();
router.get("/", validarJwt, getMedicos);

router.post(
  "/",
  [
    validarJwt,
    check("nombre", "El nombre del medico es necesario").notEmpty(),
    validarCampos,
  ],
  postMedicos
);
router.put("/:id", [], putMedicos);
router.delete("/:id", validarJwt, deleteMedicos);

module.exports = router;
