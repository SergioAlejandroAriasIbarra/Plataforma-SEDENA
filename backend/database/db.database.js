const admin = require('firebase-admin')

var serviceAccount = require("../sedena-e5-firebase-adminsdk-gvksw-7383559e3c.json");



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sedena-e5-default-rtdb.firebaseio.com/"
})

const db = admin.firestore();
const dbEsp32 = admin.database(admin);

async function ValueSensor(usersData,child) {
    const data = await new Promise(res => {
        dbEsp32.ref('UsersData').child('N0EGkw1oLIgnflKV4n3Jthevgtl2').on('value', (snap) => {
            res(snap.val());
        })
    });
    return data
}


async function getidCardandUpdate(unidad, cardPersona,usersData,child) {
    let person;
    let newCheck = new Array();
    let exist;

    let data = await ValueSensor(usersData,child);

    person = await getExistidCardPerson('unidad1', '29097FC2');

    if (person != false && person.check[0] != data.DATE_TIME) {
        newCheck = person.check;
        newCheck.unshift(data.DATE_TIME ? data.DATE_TIME : 0);
        person.check = newCheck;
        //if(person.sensor == data.sensor)person.status = 4;
        exist = await db.collection('unidad1').doc('29097FC2').update({ check: person.check })

    }
    let user = await new Promise(res => {
        db.collection('unidad1').get().then((snapchot) => {
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

    let prueba ={
        lugar: 'unidad 1',
        check: [],
        img: '',
        lname: 'Gonzalez Vazquez',
        matricula: 'C-11121231',
        status: 1,
        puesto: 'Cavo',
        fname: 'Daniel'
      }
    let dataCard = await ValueSensor(usersData,child);
    console.log(dataCard)
    let exist = await getExistidCardPerson(unidad,dataCard.RFID_CARD);
    console.log(exist);
    if(exist==false){
        prueba.check.unshift(dataCard.DATE_TIME ? dataCard.DATE_TIME : 0)
        const res = await db.collection(unidad).doc(dataCard.RFID_CARD).set(prueba);
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
    addNewPersonalwithIdCard:addNewPersonalwithIdCard,
    SendData: SendData,
    getidCardandUpdate: getidCardandUpdate,


}
