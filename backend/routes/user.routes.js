const express = require('express')
const router = express.Router()
const db = require('../database/db.database')
 

router.get("/getallusers", async (req, res, next)=>{
    const usuarios = await db.getAllUsers()
    res.send(usuarios)
 })


router.post("/post", async (req, res, next)=>{
    //console.log(req.body.email)
    //console.log(req.body.password)
    try {
        const sl = await db.SendData(req.body);
        res.send(sl)
    } catch (error) {
        console.log('error')
        res.sendStatus(404)
    }
})


/*router.post('/post', (req, rest)=>{
    console.log(req.body)
    db.ref('usuario').push(req.body)
    rest.send('respuesta')
})*/

/*
    Tablas:
    Usuarios -> ID(INT), Nombre(STRING), Apellido(STRING), Fecha de nacimiento(DATE), Activo(bool), 
    ID tarjeta(STRING), Fecha Ingreso(DATE)


*/


module.exports = router;