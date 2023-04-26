const axios = require("axios");
require('dotenv').config();
const { URL_BASE, APY_KEY } = process.env;
const { Dog, Temperament } = require("../db/db");

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

module.exports =getBreedsId;

