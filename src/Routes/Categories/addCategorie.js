import connection from "../../Bd/connection.js";
import Joi from "joi";

const addCategories = (req, res) => {

    const name = req.body.name;
    
    const schema = Joi.object({
        name: Joi.string()
            .required()
    });  
    const schemaValidation = schema.validate({name});

    if(schemaValidation.error) {
        res.sendStatus(400); 
        return;
    }

    const existCategorie = connection.query('SELECT * FROM categories WHERE name = $1 LIMIT 1', [name]);
    existCategorie.then( resu => {
        
        if(resu.rows.length !== 0) {
            res.sendStatus(409); 
            return;
        }

        connection.query('INSERT INTO categories (name) VALUES ($1)', [name])
        .then(resul => {
            res.sendStatus(201);
            console.log("incluindo categoria");
        });
    })
}

export default addCategories;