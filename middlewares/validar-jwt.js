const jwt = require('jsonwebtoken');

const validarJwt = (req,res,next)=>{
    //leer token
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"no hay token de petición"
        })
    }

    try {
        const {uid}= jwt.verify(token, process.env.JWT_SECRET);
        console.log(uid);
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token incorrecto'
        })
    }

    
}

module.exports = {
    validarJwt
}