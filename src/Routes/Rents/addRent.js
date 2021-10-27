import connection from "../../Bd/connection.js";
import dayjs from "dayjs";

const addRent = async (req, res) => {

    try{
        const { customerId, gameId, daysRented } = req.body;
        if(daysRented <= 0) return res.sendStatus(400);

        const client = await connection.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        if(!client.rows[0]) return res.sendStatus(400);

        const game = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);
        if(!game.rows[0]) return res.sendStatus(400);
    
        const rentDate = dayjs(new Date()).format("YYYY-MM-DD");
        const originalPrice = daysRented * game.rows[0].pricePerDay;
       
        const rental = await connection.query('SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL', [gameId]);
        if(rental.rows.length >= game.rows[0].stockTotal) return res.sendStatus(400);

        await connection.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") 
            VALUES ($1, $2, $3,$4, $5)`
            ,[customerId, gameId, rentDate, daysRented, originalPrice]);
            
        res.sendStatus(201);
    }catch{
        res.sendStatus(500);
    }
}

export default addRent;