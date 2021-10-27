import connection from "../../Bd/connection.js";

const listClient = async (req, res) => {

    try{
        const id = req.params.id;
        const resul = await connection.query(`
            SELECT id, name, phone, cpf, TO_CHAR(birthday, $1) AS birthday 
            FROM customers WHERE id = $2`
            , ["YYYY-MM-DD", id]);

        if(!resul.rows[0]) return res.sendStatus(404);

        res.send(resul.rows[0]);
    }catch{
        res.sendStatus(500);
    }
}

export default listClient;