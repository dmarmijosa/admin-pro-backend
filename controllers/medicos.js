const { request, response } = require("express");
const Medicos = require("../models/medicos");

const getMedicos = async (req = request, res = response) => {
  const medicos = await Medicos.find().populate("usuario", "nombre img")
                                      .populate("hospital", "nombre img");
  res.json({
    ok: true,
    medicos,
  });
};

const postMedicos = async (req = request, res = response) => {
  const uidUser = req.uid;
  const medico = new Medicos({
    usuario: uidUser,
    ...req.body,
  });
  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear medico",
    });
  }
};

const putMedicos = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "Put Medicos",
  });
};

const deleteMedicos = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "Delete Medicos",
  });
};

module.exports = {
  getMedicos,
  postMedicos,
  putMedicos,
  deleteMedicos,
};
