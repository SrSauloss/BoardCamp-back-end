import connection from "../../Bd/connection.js";
import Joi from "joi";

const addGame = async (req, res) => {

    try{
        const { 
            name, 
            image, 
            stockTotal, 
            categoryId, 
            pricePerDay
        } = req.body;

        const schema = Joi.object({
            name: Joi.string()
                .required(),
            stockTotal: Joi.number()
                .integer()
                .min(1)
                .required(),
            pricePerDay: Joi.number()
                .integer()
                .min(1)
                .required()
        });

        const schemaValidation = schema.validate({name, stockTotal, pricePerDay});
        if(schemaValidation.error) return res.sendStatus(400);

        const existId = await connection.query('SELECT * FROM categories WHERE id = $1 LIMIT 1', [categoryId]);    
        if(existId.rows.length === 0) return res.sendStatus(400); 

        const existGame = await connection.query('SELECT * FROM games WHERE name = $1 LIMIT 1', [name]);
        if(existGame.rows.length !== 0) return res.sendStatus(409); 
                    
        await connection.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES ($1, $2, $3, $4, $5)`
            , [name, image, stockTotal, categoryId, pricePerDay]);
    
        res.sendStatus(201);
    }catch{
        res.sendStatus(500);
    }
}

export default addGame;