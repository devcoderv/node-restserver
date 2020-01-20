const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const Users = require('../models/users')
const app = express();

const error = err =>{
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        });  
    }
}
app.get('/users', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = Number(req.query.limite) || 0; 

    Users.find({estado:true}, 'name email role estatus google img')
         .skip(desde)
         .limit(limite)
         .exec((err, users) =>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });  
            }

            Users.count({ estado:true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count
                });
            });
         });
});

app.post('/users', (req, res) => {
    let body = req.body



    let user = new Users({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });

    user.save( (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });  
        }

        res.json({
            ok:true,
            user: userDB
        })
    });
});

app.put('/users/:id', (req, res) => {

    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    Users.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });  
        }
        res.json({
            user: userDB
        });

    });
});

app.delete('/users/:id', (req, res) => {
    
    let id = req.params.id;
    let changeEstado = {
        estado: false
    }

    Users.findByIdAndUpdate( id, changeEstado, {new: true}, (err, userRemove) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });  
        };

        if(!userRemove){
            return res.status(400).json({
                ok:true,
                err: {
                    message: 'Usueario no encontrado'
                }
            })
        }
        
        res.json({
            ok:true,
            user: userRemove
        })
    });



});

module.exports = app