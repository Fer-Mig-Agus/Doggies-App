const axios = require("axios");
require('dotenv').config();
const { URL_BASE, APY_KEY } = process.env;
const { Dog, Temperament } = require("../db/db");


//important: Este trae los ids de los temperamentos de la BDD RUTA:/dogs/temperamets (get)

const getAllIdsTemperaments = async (req, res) => {
    const { listTemperaments } = req.body;
    const newListTemp = [];
    try {
        for (let i = 0; i < listTemperaments.length; i++) {
            const temp = await Temperament.findOne({ where: { name: listTemperaments[i] } });
            newListTemp.push(temp.id);
        }
        res.status(200).json(newListTemp);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



//important: Este trae los datos de las razas RUTA: /dogs (get)
const getBreeds = async (req, res) => {
    try {
        const razas = await axios.get(`${URL_BASE}/v1/breeds?key=${APY_KEY}`)
        const razasOnly = razas.data.map((raza) => {
            return {
                id: raza.id,
                name: raza.name,
                height: raza.height.imperial,
                weight: raza.weight.imperial,
                life_span: raza.life_span,
                image: raza.image.url,
                temperaments: raza.temperament,
                //temperament: raza.temperament?.split(",").map(elemt => { return { name: elemt } }),

            }
        })
        const dogs = await Dog.findAll({
            include: [{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        });

        const cleanDogs = dogs.map((raza) => {
            return {
                id: raza.id,
                name: raza.name,
                height: raza.height,
                weight: raza.weight,
                life_span: raza.life_span,
                image: raza.image,
                temperaments: raza.temperaments.map(obj => obj.name).join(', '),

            }
        });

        const response = [...cleanDogs, ...razasOnly]

        res.json(response).status(200);

    } catch (error) {
        console.log(error.message);
    }
}




//important: Este trae todos los datos de una determinada raza RUTA: /dogs/:id (get)

const getBreedsId = async (req, res) => {

    const { idRaza } = req.params;
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
                temperaments: OneRaza.temperament,
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

        const cleanDogs = {
            id: razaDogs.id,
            name: razaDogs.name,
            height: razaDogs.height,
            weight: razaDogs.weight,
            life_span: razaDogs.life_span,
            image: razaDogs.image,
            temperaments: razaDogs.temperaments.map(obj => obj.name).join(', '),
        }
        res.status(200).json(cleanDogs);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}





//important: Trae todos los nombres de las razas ROUTE: /dogs/names (get)

const getBreedsName = async (req, res) => {

    let { name } = req.query;

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

        const cleanDogs = razaDogs.map((raza) => {
            return {
                id: raza.id,
                name: raza.name,
                height: raza.height,
                weight: raza.weight,
                life_span: raza.life_span,
                image: raza.image,
                temperaments: raza.temperaments.map(obj => obj.name).join(', '),
            }
        });
        const razas = await axios.get(`${URL_BASE}/v1/breeds?key=${APY_KEY}`)
        const razasOnly = razas.data.map(raza => {
            return {
                id: raza.id,
                name: raza.name,
                height: raza.height.imperial,
                weight: raza.weight.imperial,
                life_span: raza.life_span,
                temperaments: raza.temperament,
                image: raza.image.url,
            }
        })

        const response = [...cleanDogs, ...razasOnly];
        const responseClean = response.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
        res.status(200).json(responseClean);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }

}




//important: Crear un nuevo perro  RUTA: /dogs (post)

const createNewDog = async (req, res) => {

    const { name, height, weight, life_span, image, temperament } = req.body;

    try {
        const razas = await axios.get(`${URL_BASE}/v1/breeds?key=${APY_KEY}`)
        const razasOnly = razas.data.map((raza) => {
            return {
                id: raza.id,
                name: raza.name,
                height: raza.height.imperial,
                weight: raza.weight.imperial,
                life_span: raza.life_span,
                image: raza.image.url,
                temperaments: raza.temperament,

            }
        })

        const dogs = await Dog.findAll({
            include: [{
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        });

        const cleanDogs = dogs.map((raza) => {
            return {
                id: raza.id,
                name: raza.name,
                height: raza.height,
                weight: raza.weight,
                life_span: raza.life_span,
                image: raza.image,
                temperaments: raza.temperaments.map(obj => obj.name).join(', '),

            }
        });

        const response = [...cleanDogs, ...razasOnly]
        const verificarName = response.filter((dog) => dog.name.toLowerCase() === name.toLowerCase());
        if (verificarName.length !== 0) return res.status(400).json({ error: "Ya exite la raza" });

        const dog = await Dog.create({ name, height, weight, life_span, image });

        dog.addTemperament(temperament);
        res.status(200).json(dog);

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
    createTemperament,
    getAllIdsTemperaments

}








































