require('dotenv').config();
const express = require('express');
const {dbConnection}=require('./database/config');
var cors = require('cors');

//crear el servidor express
const app = express();

//CONFIGURAR CORS
app.use(cors());

//Lectura y Parseo del body
app.use(express.json());

//BASE DE DATOS
dbConnection();

//Rutas 

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en ${process.env.PORT}`);
})