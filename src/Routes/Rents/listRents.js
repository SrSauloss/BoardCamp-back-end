import connection from "../../Bd/connection.js";

const listRents = async (req, res) => {

    const customerId = req.query.customerId;
    const gameId = req.query.gameId;

    const query = `
        SELECT rentals.*,
        jsonb_build_object('id', customers.id, 'name', customers.name) AS customer,
        jsonb_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        JOIN categories ON categories.id = games."categoryId"
    `;
    
    let where = "";
    let values = [];

    if(customerId && gameId) {
        where = `WHERE rentals."customerId" = $1 AND rentals."gameId" = $2`;
        values.push(customerId, gameId);
    }else if (gameId) {
        where = `WHERE rentals."gameId" = $1`;
        values.push(gameId);
    }else if (customerId) {
        where = `WHERE rentals."customerId" = $1`;
        values.push(customerId);
    }

    const resul = await connection.query(query+where, values);
    res.send(resul.rows);
}

export default listRents;