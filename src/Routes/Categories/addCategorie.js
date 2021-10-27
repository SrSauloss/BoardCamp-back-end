import connection from "../../Bd/connection.js";
import Joi from "joi";

const addCategories = async (req, res) => {

    try{
        
        const name = req.body.name;
        const schema = Joi.object({
            name: Joi.string()
                .required()
        });  

        const schemaValidation = schema.validate({name});
        if(schemaValidation.error) return res.sendStatus(400); 

        const existCategorie = await connection.query('SELECT * FROM categories WHERE name = $1 LIMIT 1', [name]);
        if(existCategorie.rows.length !== 0) return res.sendStatus(409); 

        await connection.query('INSERT INTO categories (name) VALUES ($1)', [name])
        res.sendStatus(201);
    }catch{
        res.sendStatus(500);
    }

}

export default addCategories;