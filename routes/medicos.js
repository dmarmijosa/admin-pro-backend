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
  getMedicoById,
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
    check("hospital", "El id del hospital es necesario").isMongoId(),
    validarCampos,
  ],
  postMedicos
);
router.put(
  "/:id",
  [
    validarJwt,
    check("nombre", "El nombre del medico es necesario").notEmpty(),
    check("hospital", "El id del hospital es necesario").isMongoId(),
    validarCampos,
  ],
  putMedicos
);
router.delete("/:id", validarJwt, deleteMedicos);
router.get("/:id", validarJwt, getMedicoById);

module.exports = router;
