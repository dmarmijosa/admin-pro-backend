const { request, response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req = request, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");
  res.json({
    ok: true,
    hospitales,
  });
};

const postHospitales = async (req = request, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });
  try {
    const hospitalDb = await hospital.save();
    res.json({
      ok: true,
      hospital: hospitalDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear Hospital",
    });
  }
};

const putHospitales = async (req = request, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el hospital en la base de datos",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalAcualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    //hospital.nombre = req.body.nombre;

    res.json({
      ok: true,
      hospital: hospitalAcualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error al momento de actualizar el hospital",
    });
  }
};

const deleteHospitales = async (req = request, res = response) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el hospital en la base de datos",
      });
    }
    await Hospital.findOneAndDelete(id);


    res.json({
      ok: true,
      msg:"Hospital eliminado correctamente"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error al momento de eliminar el hospital",
    });
  }
};

module.exports = {
  getHospitales,
  postHospitales,
  putHospitales,
  deleteHospitales,
};
