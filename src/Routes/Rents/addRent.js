import connection from "../../Bd/connection.js";

const addRent = async (req, res) => {

    const { customerId, gameId, daysRented } = req.body;

    if(daysRented <= 0) {
        res.sendStatus(400);
        return;
    }

    const client = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId]);
    //console.log(client.rows[0])
    if(!client.rows[0]) {
        res.sendStatus(400);
        return;
    }

    const game = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);
    //console.log(game.rows[0])
    if(!game.rows[0]) {
        res.sendStatus(400);
        return;
    }

    const rentDate = new Date();
    const originalPrice = daysRented * game.rows[0].pricePerDay;
    console.log(originalPrice);
 
    const ren = await connection.query('SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL', [gameId]);
    console.log(ren.rows);
    if(ren.rows.length >= game.rows[0].stockTotal) {
        res.sendStatus(400);
        return;
    }

    connection.query( 'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3,$4, $5, $6, $7)',
        [customerId, gameId, rentDate, daysRented, null, originalPrice, null])
    .then(resul => {
        res.sendStatus(201);
    });

    //customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee   




   // res.sendStatus(201);
}

export default addRent;