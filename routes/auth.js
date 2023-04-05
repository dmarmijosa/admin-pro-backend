//path : 'api/login'
const { Router } = require("express");
const { login, googleSignIn } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").notEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [
    check("token", "El token de google es obligatorio").notEmpty(),
    validarCampos,
  ],
  googleSignIn
);

module.exports = router;
