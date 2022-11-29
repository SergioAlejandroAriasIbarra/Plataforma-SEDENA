const express = require('express')
const router = express.Router()
const db = require('../database/db.database')

 


router.get("/getupdate", async (req, res, next)=>{
    
    const arrUnidad1 = await db.getidCardandUpdate("unidad1","UsersData","Base1");
    console.log("el primer si pasó")
    const arrUnidad2 = await db.getidCardandUpdate("unidad2","UsersData","Base2");
    //console.log(idcard);
    res.send(arrUnidad1.concat(arrUnidad2))
    //const usuarios = await db.GetPersonal()
    //res.status(200).send(usuarios)

})

router.post("/post", async (req, res, next)=>{
    //console.log(req.body);
    try {
        const sl = await db.addNewPersonalwithIdCard(req.body.origen,req.body,"UsersData","user_r")
        res.send(sl)
    } catch (error) {
        console.log('error')
        res.sendStatus(404)
    }
})

router.put("/delete",async(req,res)=>{
    console.log("entramos al request")
    try {
        console.log("entra aqui")
        console.log(req.body)
        await db.deleteidCard(req.body.origen, req.body.idcard);
        res.status(200).send("Elemento eliminado")
    } catch (error) {
        res.status(400).send("error al eliminar el dato")
    }
})

router.get("/getunidad1",async(req,res)=>{
    console.log("entra a este get")
    try {
        const arrUnidad1 = await db.getidCardandUpdate("unidad1","UsersData","Base1");
        res.send(arrUnidad1)
    } catch (err) {
        console.log(err)
    }
})
router.get("/getunidad2",async(req,res)=>{
    console.log("entra a este get")
    try {
        const arrUnidad1 = await db.getidCardandUpdate("unidad2","UsersData","Base1");
        res.send(arrUnidad1)
    } catch (err) {
        console.log(err)
    }
})
/*router.put("/prueba",async (req, res, next)=>{
    
    const idcard = await db.parseData();
    //console.log(idcard);
    res.send(true)
    //const usuarios = await db.GetPersonal()
    //res.status(200).send(usuarios)

})*/



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