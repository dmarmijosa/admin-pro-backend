const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require("path");
const fs  = require("fs");

const fileUpload = (req, res = response) => {
  const { tipo, id } = req.params;
  //validar que existea un archivo
  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo.",
    });
  }

  //Procesar imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  //validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extension permitida",
    });
  }
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un tipo conocido del sistema",
    });
  }

  //generar el nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
  //Path para almacenar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }
    // Aqui es donde se actualiza la db
    actualizarImagen(tipo, id, nombreArchivo);

    res.json({
      ok: true,
      msg: "Archivo Subido",
      nombreArchivo,
    });
  });
};

const retornaImagen = (req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  if(fs.existsSync(pathImg)){
    res.sendFile(pathImg);

  }else{
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);

  }
};
module.exports = {
  fileUpload,
  retornaImagen,
};
