const express = require('express')
const router = express.Router()
const db = require('../database/db.database')

 


router.get("/getupdate", async (req, res, next)=>{
    
    const idcard = await db.getidCardandUpdate();
    //console.log(idcard);
    res.send(idcard)
    //const usuarios = await db.GetPersonal()
    //res.status(200).send(usuarios)

})

router.post("/post", async (req, res, next)=>{
    //console.log(req.body.email)
    //console.log(req.body.password)
    try {
        const sl = await db.addNewPersonalwithIdCard('unidad1',":v","realtimedatabase","hijodelrealtime")
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