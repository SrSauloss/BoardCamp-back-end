import connection from "../../Bd/connection.js";
import Joi from "joi";

const updateClient = async (req, res) => {

    const id = req.params.id;
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

    const resul = await connection.query('SELECT * FROM customers WHERE id = $1', [id]);
    if(!resul.rows[0]) {
        res.sendStatus(404);
        return;
    }

    const schemaValidation = schema.validate({name, phone, cpf, birthday});
    if(schemaValidation.error) {
        res.sendStatus(400);
        return;
    }

    const existCpf = await connection.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
    if( existCpf.rows.length !== 0) {
        res.sendStatus(409);
        return;
    }

    connection.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5', [name, phone, cpf, birthday, id])
    .then(() => {
        res.sendStatus(200);
    })
}

export default updateClient;