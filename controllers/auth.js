const { response } = require("express");
const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const login = async (req, res = response) => {
    const {email, password} = req.body;
  try {
    const usuarioDB = await Usuario.findOne({email});
    //verficiar email
    if(!usuarioDB){
        return res.status(404).json({
            ok:false,
            msg:'Correo no valido'
        })
    }
    //verificar pass
    const validarPassword = bcrypt.compareSync(password,usuarioDB.password);
    if(!validarPassword){
        return res.status(400).json({
            ok:false, 
            msg:'Password incorrecto'
        })
    }

    const token = await generarJWT(usuarioDB.id);
    res.json({
        ok:true,
        token
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error en el login",
    });
  }
};
module.exports={
    login
}