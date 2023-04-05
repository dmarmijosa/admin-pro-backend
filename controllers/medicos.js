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

const putMedicos = async (req = request, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medicos.findById(id);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el medico en la base de datos",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medicos.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );

    //hospital.nombre = req.body.nombre;

    res.json({
      ok: true,
      hospital: medicoActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error al momento de actualizar el hospital",
    });
  }
};

const deleteMedicos = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const medico = await Medicos.findById(id);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el medico en la base de datos",
      });
    }

    await Medicos.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg:"Medico borrado"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error al momento de actualizar el hospital",
    });
  }
};

module.exports = {
  getMedicos,
  postMedicos,
  putMedicos,
  deleteMedicos,
};
