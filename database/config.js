const mongoose = require('mongoose');
const dbConnection = async()=>{
    try {
        
        await mongoose.connect(process.env.DB_CNN);
        console.info('DB ONLINE')
    } catch (error) {
        console.error('ERROR AL CONECTAR LA BD', error);
    }
}
module.exports={
    dbConnection
}