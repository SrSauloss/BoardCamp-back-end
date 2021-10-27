import connection from "../../Bd/connection.js";
import dayjs from 'dayjs';

const terminateRent = async (req, res) => {

    const id = req.params.id;

    const rent = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);
    if(!rent.rows[0]) return res.sendStatus(404);

    if(rent.rows[0].returnDate)  return res.sendStatus(400);

    const rentDate = dayjs(rent.rows[0].rentDate).format('YYYY-MM-DD');
    const returnDate = dayjs().format('YYYY-MM-DD');
    const daysRented = rent.rows[0].daysRented;
    const pricePerDay = rent.rows[0].originalPrice / daysRented;
    const daysDiff = dayjs(returnDate).diff(rentDate, 'hour') / 24;
    const delayFee =  daysDiff > daysRented ? (daysDiff - daysRented) * pricePerDay : 0;
    
    await connection.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3', [returnDate, delayFee, id]);
    res.sendStatus(200);
}

export default terminateRent;