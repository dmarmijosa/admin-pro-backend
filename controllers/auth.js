const { response } = require("express");
const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDB = await Usuario.findOne({ email });
    //verficiar email
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Correo no valido",
      });
    }
    //verificar pass
    const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    const token = await generarJWT(usuarioDB.id);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error en el login",
    });
  }
};

const googleSignIn = async( req, res = response ) => {

  try {
      const { email, name, picture } = await googleVerify( req.body.token );

      const usuarioDB = await Usuario.findOne({ email });
      let usuario;

      if ( !usuarioDB ) {
          usuario = new Usuario({
              nombre: name,
              email,
              password: '@@@',
              img: picture,
              google: true
          })
      } else {
          usuario = usuarioDB;
          usuario.google = true;
          // usuario.password = '@@';
      }

      // Guardar Usuario
      await usuario.save();

      // Generar el TOKEN - JWT
      const token = await generarJWT( usuario.id );


      res.json({
          ok: true,
          email, name, picture,
          token
      });
      
  } catch (error) {
      console.log(error);
      res.status(400).json({
          ok: false,
          msg: 'Token de Google no es correcto'
      });
  }
};
module.exports = {
  login,
  googleSignIn,
};
