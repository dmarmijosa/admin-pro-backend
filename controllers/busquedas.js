const { response } = require("express");
const Usuario = require("../models/usuarios");
const Hospitales = require("../models/hospital");
const Medicos = require("../models/medicos");
const getBusqueda = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medicos.find({ nombre: regex }),
    Hospitales.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};
const getDocumentosColeccion = async (req, res = response) => {
  const { tabla, busqueda } = req.params;
  //   const tabla = req.paramas.tabla;
  //   const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medicos.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitales":
      data = await Hospitales.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "No se ha encontrado la tabla de búsqueda",
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getBusqueda,
  getDocumentosColeccion,
};
