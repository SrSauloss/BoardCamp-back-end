import connection from "../../Bd/connection.js";

const deleteRent = async (req, res) => {

    const id = req.params.id;
    const rental = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);

    if(!rental.rows[0]) return res.sendStatus(404);
    if(rental.rows[0].returnDate)  return res.sendStatus(400);

    await connection.query('DELETE FROM rentals WHERE id = $1', [id]);
    res.sendStatus(200);
}

export default deleteRent;