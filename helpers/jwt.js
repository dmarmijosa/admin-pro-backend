const jwt = require("jsonwebtoken");
const generarJWT = (uid) => {
  return new Promise((res, rej) => {
    const payload = {
      uid,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("no se pudo generar el JWT correctamente");
        } else {
          res(token);
        }
      }
    );
  });
};

module.exports={
    generarJWT,
}