const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
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
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token incorrecto'
        })
    }
}

const validarAdmin_Role = async(req,res,next)=>{
    const uid = req.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'Usuario no existe'
            });
        }
        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg: 'No tiene privilengios de Admin'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
}
const validarAdmin_Role_And_User = async(req,res,next)=>{
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'Usuario no existe'
            });
        }
        if(usuarioDB.role !== 'ADMIN_ROLE' && uid !== id){
            return res.status(403).json({
                ok:false,
                msg: 'No tiene privilengios de Admin'
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
}

module.exports = {
    validarJwt,
    validarAdmin_Role,
    validarAdmin_Role_And_User
}