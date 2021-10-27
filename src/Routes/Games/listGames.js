import connection from "../../Bd/connection.js";

const listGames = async (req, res) => {

    try{
        const params = req.query;
        if(params.name) {
            const resul = await connection.query('SELECT * FROM games WHERE LOWER(name) LIKE $1', [params.name + "%"]);
            return res.send(resul.rows);
        }

        const resul = await connection.query('SELECT * FROM games');

        res.send(resul.rows);
    }catch {
        res.sendStatus(500);
    }
}

export default listGames;