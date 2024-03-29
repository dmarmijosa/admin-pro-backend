require('dotenv').config();
const express = require('express');
const path = require('path');
const {dbConnection}=require('./database/config');
var cors = require('cors');

//crear el servidor express
const app = express();

//CONFIGURAR CORS
app.use(cors());
//Carpeta publica 
app.use(express.static('public'));

//Lectura y Parseo del body
app.use(express.json());

//BASE DE DATOS
dbConnection();

//Rutas 

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en ${process.env.PORT}`);
})