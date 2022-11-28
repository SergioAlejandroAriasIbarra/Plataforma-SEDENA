const admin = require('firebase-admin')

var serviceAccount = require("../sedena-e5-firebase-adminsdk-gvksw-7383559e3c.json");



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sedena-e5-default-rtdb.firebaseio.com/"
})

const db = admin.firestore();
const dbEsp32 = admin.database(admin);


async function UpdateRTDBwithidCardValid(idcard) {
    let prueba= `{"${idcard}": true}`
    const data = await dbEsp32.ref('UsersData').update(JSON.parse(prueba))
    console.log("se escribió en Real Time Database")
    
}

async function ValueSensor(usersData,child) {
    const data = await new Promise(res => {
        dbEsp32.ref(usersData).child(child).on('value', (snap) => {
            res(snap.val());
        })
    });
    return data
}

function parseDatefun(fecha,status) {
    console.log("entro a parseDate ");
    let date = new Date();
    let date2 = new Date(fecha)
    console.log(date2.getHours())
    console.log(date2.getMinutes());
    
    if(status == 0 && (date2.getHours()<8)){
        console.log("entra a verdeee")
        return {status: 1,
        color:1}
    }
    if(status == 0 && (date2.getHours()>=8)){
        return {
            status: 1,
            color: 2
        }
    }
    if(status == 1 && (date2.getHours()>=8 && date2.getHours()<=20)){
        return{
            status: 0,
            color: 0
        }
    }

}

async function getidCardandUpdate(unidad,usersData,child) {
    let person;
    let newCheck = new Array();
    let exist;
 
    let data = await ValueSensor(usersData,child);

    person = await getExistidCardPerson(unidad, data.RFID_CARD);
    
    if (person != false && person.check[0] != data.DATE_TIME) {
        newCheck = person.check;
        newCheck.unshift(data.DATE_TIME ? data.DATE_TIME : 0);
        person.check = newCheck;
        
        let otro = parseDatefun(data.DATE_TIME,person.status)
        console.log(otro)
        person.status = otro.status;
        person.color = otro.color;
        console.log("se paso por aqui")
        exist = await db.collection(unidad).doc(data.RFID_CARD).update(person)

    }
    let user = await new Promise(res => {
        db.collection(unidad).get().then((snapchot) => {
            let arr = new Array();
            snapchot.docs.forEach(doc => {
                arr.push(doc.data())

            })
            res(arr)
        })
    })
    return user;

}

async function addNewPersonalwithIdCard(unidad,data, usersData,child) {

    let dataCard = await ValueSensor(usersData,child);
    console.log("//////////////////////////////")
    console.log(dataCard)
    let exist = await getExistidCardPerson(unidad,dataCard.RFID_CARD);
    
    console.log(exist);
    if(exist==false){
        console.log("otroooo");
        data.check.unshift(dataCard.DATE_TIME ? dataCard.DATE_TIME : 0)
        person.idcard = dataCard.RFID_CARD;
        await UpdateRTDBwithidCardValid(dataCard.RFID_CARD)
        const res = await db.collection(unidad).doc(dataCard.RFID_CARD).set(data);
        return true
    }
    
    return false
}

async function getExistidCardPerson(unidad, cardPersona) {
    let get;
    get = await db.collection(unidad).doc(cardPersona).get();
    
    if (!get.exists) {
        return false
    }
    return get.data()

}

async function deleteidCard(unidad,idcard) {
    //console.log(unidad)
    //console.log(idcard);
    try {
        const del = await db.collection(unidad).doc(idcard).delete();
        console.log("se elminino dato"+idcard)
        return true
    } catch (error) {
        console.log("no se hizo nada ")
        return false
    }
    
    
}


    
//TODO configuracion para firestore 
/*async function GetPersonal() {
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
}*/



/*async function loginStatus(email, password) {
    let user = await client.db(dbName).collection(collectionName).findOne(
        { email: `${email}`, password: `${password}` }
    );
    if (user)
        return user
    else
        return null
}*/
async function SendData(dataBody) {
    console.log(dataBody)
    let data = await db.ref('usuario').push(dataBody)
    return dataBody
}




module.exports = {
    deleteidCard:deleteidCard,
    addNewPersonalwithIdCard:addNewPersonalwithIdCard,
    SendData: SendData,
    getidCardandUpdate: getidCardandUpdate,


}
