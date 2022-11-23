const { spawn } = require('child_process');
const admin = require('firebase-admin')

var serviceAccount = require("../sedena-e5-firebase-adminsdk-gvksw-7383559e3c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sedena-e5-default-rtdb.firebaseio.com/"
})

const db = admin.firestore();
const dbEsp32 = admin.database(admin);


async function getidCardandUpdate() {
    //let idcard = await db.collection("UsersData").get();
    /*dbEsp32.ref('UsersData').on('value',(snap)=>{
        console.log(snap.val());
    })*/
    // let data = await dbEsp32.ref('UsersData').child('N0EGkw1oLIgnflKV4n3Jthevgtl2').get()
    // console.log(data);
    
    const data = await new Promise(res => {
        dbEsp32.ref('UsersData').child('N0EGkw1oLIgnflKV4n3Jthevgtl2').on('value', (snap)=>{
            //console.log('got val');
            res(snap.val());
        })
    });
    
    let fecha = await db.collection('unidad1').doc('29097FC2').update({fecha: "2223323232323"})
    
    //console.log(update)
    
    // const data = dbEsp32.ref('UsersData').child('N0EGkw1oLIgnflKV4n3Jthevgtl2').once('o')
    let user = await new Promise(res=>{
        db.collection('unidad1').get().then((snapchot)=>{
            //console.log(snapchot.docs)
            snapchot.docs.forEach(doc =>{
                res(doc.data())
            })
        })
    })
    
    
    return user;
    /*const contacts = idcard.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    return contacts*/
    //console.log(idcard)
}

//TODO configuracion para firestore 
async function GetPersonal() {
    let datos;
    let testing = await db.collection('unidad1').get().then((snapchot) => {
        snapchot.docs.forEach(doc => {
            datos = doc.data();
            console.log(doc.data())
        })
    })
    //let testing = await db.collection('modulo1').
    console.log("dato listo")
    return datos;
}



async function loginStatus(email, password) {
    let user = await client.db(dbName).collection(collectionName).findOne(
        { email: `${email}`, password: `${password}` }
    );
    if (user)
        return user
    else
        return null
}
async function SendData(dataBody) {
    console.log(dataBody)
    let data = await db.ref('usuario').push(dataBody)
    return dataBody
}


module.exports = {
    SendData: SendData,
    GetPersonal: GetPersonal,
    getidCardandUpdate: getidCardandUpdate,


}
