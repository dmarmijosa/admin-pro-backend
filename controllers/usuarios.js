const { response } = require("express");
const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  // const usuarios = await Usuario.find({}, "nombre email role google")
  //   .skip(desde)
  //   .limit(5);
  // const total = await Usuario.count();
  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.count(),
  ]);

  res.json({
    ok: true,
    usuarios,
    total,
  });
};

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const exiteEmail = await Usuario.findOne({ email });
    if (exiteEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo esta registrado",
      });
    }

    const usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar contraseña
    await usuario.save();
    const token = await generarJWT(usuario.id);
    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "ERROR INESPERADO.. REVISAR LOS LOGS",
    });
  }
};
const actualizarUsusario = async (req, res) => {
  //TODO: Validar token y comprobar si es el ususario correcto
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro al usuario",
      });
    }

    //actualizar la bd
    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya exsiste un usuario con ese correo",
        });
      }
    }

    if (!usuarioDB.google) {
      campos.email = email;
    }else if(usuarioDB.email !== email){
      return res.status(404).json({
        ok: false,
        msg: "Usuarios de google no pueden cambiar su correo",
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "ERROR AL ACTUALIZAR",
    });
  }
};

const borrarUsusario = async (req, res) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese ID",
      });
    }
    await Usuario.findByIdAndRemove(uid);

    res.json({
      ok: true,
      msg: "Usuario Eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar ususario",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsusario,
  borrarUsusario,
};
