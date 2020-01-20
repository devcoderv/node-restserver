require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose.set('useCreateIndex', true);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/users') )





const connect = async () => {
    try {
        const db = await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('conectado a db')
        
    } catch (error) {
       throw error;
    }
    
}

connect()
    .then()
    .catch(error => console.log(error))




app.listen(process.env.PORT , () => {
    console.log('Escuchando puerto 3000');
    
});