const axios = require("axios");
require('dotenv').config();
const { URL_BASE, APY_KEY } = process.env;
const { Dog, Temperament } = require("../db/db");





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


module.exports =getBreeds;