import connection from "../../Bd/connection.js";
import dayjs from 'dayjs';

const terminateRent = async (req, res) => {

    try{
        const id = req.params.id;
        const rental = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);

        if(!rental.rows[0]) return res.sendStatus(404);
        if(rental.rows[0].returnDate)  return res.sendStatus(400);

        const rentDate = dayjs(rental.rows[0].rentDate).format('YYYY-MM-DD');
        const returnDate = dayjs().format('YYYY-MM-DD');
        const daysRented = rental.rows[0].daysRented;
        const pricePerDay = rental.rows[0].originalPrice / daysRented;
        const daysDiff = dayjs(returnDate).diff(rentDate, 'hour') / 24;
        const delayFee =  daysDiff > daysRented ? (daysDiff - daysRented) * pricePerDay : 0;
        
        await connection.query(`
            UPDATE rentals 
            SET "returnDate" = $1, "delayFee" = $2 
            WHERE id = $3`
            , [returnDate, delayFee, id]);
        res.sendStatus(200);
    }catch{
        res.sendStatus(500);
    }
}

export default terminateRent;