require('dotenv').config();
const express = require('express');
const {dbConnection}=require('./database/config');
var cors = require('cors');

//crear el servidor express
const app = express();

//CONFIGURAR CORS
app.use(cors());

//BASE DE DATOS
dbConnection();

//Rutas 
app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg: 'HOLA mundo'
    })
});

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en ${process.env.PORT}`);
})