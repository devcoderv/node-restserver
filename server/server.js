require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/users', (req, res) => {
    res.json('get Users');
});

app.post('/users', (req, res) => {
    let body = req.body

    if(body.nombre === undefined){
        res.json({
            status: 400,
            message: 'El nombre es necesario'
        })
    }else{
        res.json({
            body
        });
    }

});

app.put('/users/:id', (req, res) => {

    let id = req.params.id
    res.json({
        id
    });
});

app.delete('/users', (req, res) => {
    res.json('delete Users');
});

app.listen(process.env.PORT , () => {
    console.log('Escuchando puerto 3000');
    
});