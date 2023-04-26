const axios = require("axios");
require('dotenv').config();
const { URL_BASE, APY_KEY } = process.env;
const { Dog, Temperament } = require("../db/db");


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
            return res.json(temperament).status(200)
        }

        const temperaments = await Temperament.findAll()
        res.json(temperaments).status(200)

    } catch (error) {
        console.log(error.message);
    }
}


module.exports =createTemperament;