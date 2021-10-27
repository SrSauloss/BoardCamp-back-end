import connection from "../../Bd/connection.js";

const listClients = async (req, res) => {

    try{
        const params = req.query;
        if(params.cpf) {
            const resul = await connection.query(`
                SELECT id, name, phone, cpf, TO_CHAR(birthday, $1) AS birthday 
                FROM customers 
                WHERE cpf LIKE $2`
                , ["YYYY-MM-DD",params.cpf+"%"]);

            return res.send(resul.rows);
        }

        const resul = await connection.query(`
            SELECT id, name, phone, cpf, TO_CHAR(birthday, $1) AS birthday 
            FROM customers`
            , ["YYYY-MM-DD"]);
       
        res.send(resul.rows);     
    }catch{
        res.sendStatus(500);
    }
}

export default listClients;