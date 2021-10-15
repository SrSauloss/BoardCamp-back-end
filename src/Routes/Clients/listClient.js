import connection from "../../Bd/connection.js";

const listClient = async (req, res) => {

    const id = req.params.id;
    const resul = await connection.query('SELECT id, name, phone, cpf, TO_CHAR(birthday, $1) AS birthday FROM customers WHERE id = $2', ["YYYY-MM-DD", id]);
    if(!resul.rows[0]) {
        res.sendStatus(404);
        return;
    }

    res.send(resul.rows[0]);
}

export default listClient;