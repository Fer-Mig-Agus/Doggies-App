const { Router } = require('express');
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


require('dotenv').config();
const { URL_BASE, APY_KEY } = process.env;


const { getBreeds,getBreedsId,getBreedsName, createNewDog, createTemperament } =require("../controllers/dogsControllersAll");

//important:  Son en total 264 razas en la API

const router = Router();

//router("/dogtemeperament",tablaRelacional)


// 

router.get("/dogs", getBreeds );

router.get("/dogs/names", getBreedsName);


router.get("/dogs/:idRaza", getBreedsId);

router.post("/dogs", createNewDog)

router.get("/temperaments", createTemperament);


// router.delete("/dogs/:idDog",(req,res)=>{
//     try {
//         res.status(204).json({msj:"Entro al delete"});
//     } catch (error) {
//         res.status(404).json({error:error.message});
//     }

// })




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




module.exports = router;
