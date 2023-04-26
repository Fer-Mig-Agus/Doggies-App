const axios = require("axios");
require('dotenv').config();
const { URL_BASE, APY_KEY } = process.env;
const { Dog, Temperament } = require("../db/db");

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

module.exports =getBreedsName;

