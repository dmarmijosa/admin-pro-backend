const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getUsuarios,
  crearUsuario,
  actualizarUsusario,
  borrarUsusario,
} = require("../controllers/usuarios");
const { validarJwt, validarAdmin_Role_And_User } = require("../middlewares/validar-jwt");
const router = Router();
router.get("/", validarJwt,getUsuarios );

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "El password es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);
router.put(
  "/:id",
  [
    validarJwt,
    validarAdmin_Role_And_User,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").notEmpty(),
    validarCampos
  ],
  actualizarUsusario
);
router.delete("/:id", validarJwt, borrarUsusario);

module.exports = router;
