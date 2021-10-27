import connection from "../../Bd/connection.js";
import Joi from "joi";

const addClient = async (req, res) =>{

    try{
        const {name, phone, cpf, birthday} = req.body;
        const schema = Joi.object({
            name: Joi.string()
                .required(),
            phone: Joi.string()
                .regex(/^[0-9]+$/)
                .min(10)
                .max(11)
                .required(),
            cpf: Joi.string()
                .alphanum()
                .min(11)
                .max(11)
                .required(),
            birthday: Joi.date()
                .required()
        });

        const schemaValidation = schema.validate({name, phone, cpf, birthday});
        if(schemaValidation.error) return res.sendStatus(400);

        const existCpf = await connection.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
        if( existCpf.rows.length !== 0) return res.sendStatus(409);

        await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
    
        res.sendStatus(201);
    }catch{
        res.sendStatus(500);
    }

}

export default addClient;