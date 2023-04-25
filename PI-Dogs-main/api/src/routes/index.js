const { Router } = require('express');
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const { getBreeds, getBreedsId, getBreedsName, createNewDog, createTemperament, getAllIdsTemperaments } =require("../controllers/dogsControllersAll");

//important:  Son en total 264 razas en la API

const router = Router();


router.get("/dogs", getBreeds );

router.put("/dogs/temperaments", getAllIdsTemperaments)

router.get("/dogs/names", getBreedsName);


router.get("/dogs/:idRaza", getBreedsId);

router.post("/dogs", createNewDog)

router.get("/temperaments", createTemperament);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
