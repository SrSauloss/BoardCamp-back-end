import connection from "../../Bd/connection.js";

const listClients = (req, res) => {

    const params = req.query;
    if(params.cpf) {
        connection.query('SELECT id, name, phone, cpf, TO_CHAR(birthday, $1) AS birthday FROM customers WHERE cpf LIKE $2', ["YYYY-MM-DD",params.cpf+"%"])
        .then(resul => {
            res.send(resul.rows);
        });
        return;
    }

    connection.query('SELECT id, name, phone, cpf, TO_CHAR(birthday, $1) AS birthday FROM customers', ["YYYY-MM-DD"])
    .then(resul => {
        res.send(resul.rows);
    });
}

export default listClients;