const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const { ref } = require('@hapi/joi');
const router = express.Router();
const {registerValidation, loginValidation} = require('../validation/validation');


//Firebase configuration
const serviceAccount = require('../panteras-project-management-firebase-adminsdk-ur5aj-92f8d0685a.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://panteras-project-management-default-rtdb.firebaseio.com/'
});
dataBase = admin.database();


// Register Route
router.post("/register", async (req,res)=>{
    var data

    // VALIDAMOS LA INFORMACION ANTES DE SUBIR UN USUARIO NUEVO A LA BASE DE DATOS   
    const { error } = registerValidation(req.body) 
    if (error) return res.status(400).send(error.details[0].message).end(); // Si el usuario no se valida correctamente no lo crea y manda el error

    //VERIFICAR SI EL USUARIO ESTA EN LA BASE DE DATOS, SE USA EL ID
    await dataBase.ref('Users').orderByChild('id').equalTo(req.body.id).on('value', async function(snapshot){
        data = snapshot.val();

    },(err)=>{console.log(err)});

    if(!data){
        //HASH CONTRASEÑA Y LO SUBIMOS A LA BASE DE DATOS
        const password = req.body.hash
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        //CARGAMOS EL USUARIO A LA BASE DE DATOS
        try{
            await dataBase.ref('Users').push({
                name: req.body.name,    
                id: req.body.id,
                email:req.body.id+"@up.edu.mx",
                hash:hash,
                carrera: req.body.carrera, 
                semestre: req.body.semestre

            });
            return res.status(200).send("Usuario Creado").end();
        }catch(err){
            return res.send(err);
        }
    }
    else{
        return res.status(400).send("El usuario ya existe")
    }  
});


//Login Route
router.post("/login",  async(req,res)=>{
    var data;

    const {error} = await loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    await dataBase.ref('Users').orderByChild('id').equalTo(req.body.id).on('value', async function(snapshot){
        data = snapshot.val();
        
    },(err)=>{console.log(err)})
    console.log(data)

    if(data){
        //Si existe el usuario -->

        //Guardamos la llave del usuario en k
        const key = Object.keys(data);
        const k = key[0];

        const validPass = await bcrypt.compare(req.body.hash, data[k].hash);
        if(!validPass) return res.status(400).send("Contraseña incorrecta");
        if(validPass) return res.status(200).send("Contraseña correcta");
    }
    else{
        //Si el usuario no existe 
        return res.status(400).send("CODE 400... Email or password dosent exist").end();
    }

});

module.exports = router;