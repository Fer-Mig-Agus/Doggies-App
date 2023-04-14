const axios = require("axios");
//const { EmptyResultError } = require("sequelize");
require('dotenv').config();
const { URL_BASE, APY_KEY } = process.env;
const { Dog, Temperament } = require("../db/db");



//important: Este trae los datos de las razas RUTA: /dogs (get)
const getBreeds = async (req, res) => {

    try {
        //document: Esto busca en la API
        const razas = await axios.get(`${URL_BASE}/v1/breeds?key=${APY_KEY}`)
        const razasOnly = razas.data.map((raza) => {
            return {
                id: raza.id,
                name: raza.name,
                height: raza.height.imperial,
                weight: raza.weight.imperial,
                life_span: raza.life_span,
                image: raza.image.url,
                temperament: raza.temperament
            }
        })
        //document: Esto trae los datos de la BDD
        const dogs = await Dog.findAll({
            include: [{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        });

        const response = [...dogs, ...razasOnly]

        res.json(response).status(200);

    } catch (error) {
        console.log(error.message);
    }
}


//important: Este trae todos los datos de una determinada raza RUTA: /dogs/names (get)
const getBreedsId = async (req, res) => {

    const { idRaza } = req.params;

    console.log(idRaza);

    const source = isNaN(idRaza) ? "db" : "api";

    try {

        if (source === "api") {

            const razas = await axios.get(`${URL_BASE}/v1/breeds?key=${APY_KEY}`)

            const OneRaza = razas.data.find((raza) => raza.id == idRaza);

            const razasOnly = {
                id: OneRaza.id,
                name: OneRaza.name,
                height: OneRaza.height.imperial,
                weight: OneRaza.weight.imperial,
                life_span: OneRaza.life_span,
                temperament: OneRaza.temperament,
                image: OneRaza.image.url,
            }

            return res.status(200).json(razasOnly);

        }

        const razaDogs = await Dog.findByPk(idRaza, {
            include: [{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        });

        (res.status(400).json(razaDogs));

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


//important: Trae todos los nombres de las razas ROUTE: /dogs/names (get)

const getBreedsName = async (req, res) => {

    //document: nombre:  Afghan Hound



    const { name } = req.query;
    console.log(name);

    const nameOnly = name.toUpperCase();
    console.log(nameOnly)

    try {


        const razaDogs = await Dog.findAll({
            include: [{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        });

        const dogOne = razaDogs.find((dog) => dog.name.toUpperCase() == nameOnly);

        if (dogOne) return res.status(400).json(dogOne);



        const razas = await axios.get(`${URL_BASE}/v1/breeds?key=${APY_KEY}`)

        const OneRaza = razas.data.find((raza) => raza.name.toUpperCase() == nameOnly);

        const razasOnly = {
            id: OneRaza.id ? OneRaza.id : undefined,
            name: OneRaza.name,
            height: OneRaza.height.imperial,
            weight: OneRaza.weight.imperial,
            life_span: OneRaza.life_span,
            temperament: OneRaza.temperament,
            image: OneRaza.image.url,
        }

        res.status(200).json(razasOnly);
    

    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}


//important: Crear un nuevo perro  RUTA: /dogs (post)
const createNewDog = async (req, res) => {

    //document: Preguntar por los datos que faltan

    try {
        const { name, height, weight, life_span, image, temperament } = req.body;

        const dog = await Dog.create({ name, height, weight, life_span, image });


        dog.addTemperament(temperament);


        res.json(dog).status(200);

    } catch (error) {

        console.log(error.message);

    }

}


//important: Obtiene todos los temperamentos existentes. RUTA: /temperaments (get)

const createTemperament = async (req, res) => {
    try {

        const { data } = await axios.get(
            `${URL_BASE}/v1/breeds?key=${APY_KEY}`
        );

        const temperament = await Temperament.findByPk(124)


        if (!temperament) {

            for (const element of data) {
                if (element.temperament) {

                    const clean = element.temperament.split(",");

                    for (const item of clean) {
                        const [temperament, created] = await Temperament.findOrCreate({
                            where: {
                                name: item.trim(),
                            },
                        });
                    }
                }
            }
            res.json(temperament).status(200)
        }

        const temperaments = await Temperament.findAll()

        res.json(temperaments).status(200)


    } catch (error) {
        console.log(error.message);
    }
}


//important: Aqui exporto todas las funciones

module.exports = {
    getBreeds,
    getBreedsId,
    getBreedsName,
    createNewDog,
    createTemperament

}


