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


module.exports=getAllIdsTemperaments;