const admin = require('firebase-admin')
var serviceAccount = require("../sedena-e5-firebase-adminsdk-gvksw-7383559e3c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore();

async function GetPersonal() {
    let datos;
    let testing = await db.collection('modulo1').get().then((snapchot)=>{
        snapchot.docs.forEach(doc =>{
            datos = doc.data();
            console.log(doc.data())
        })
    })
    //let testing = await db.collection('modulo1').
    console.log("dato listo")
    return datos
}



async function loginStatus(email, password){
    let user = await client.db(dbName).collection(collectionName).findOne(
        { email: `${email}`, password: `${password}` }
    );
    if(user)
        return user
    else
        return null
}
async function SendData(dataBody){
    console.log(dataBody)
    let data = await db.ref('usuario').push(dataBody)
    return dataBody
}


module.exports = {
    SendData: SendData,
    GetPersonal:GetPersonal
}
