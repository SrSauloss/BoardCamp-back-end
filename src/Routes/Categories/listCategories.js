import connection from "../../Bd/connection.js";

const listCategories = async (req, res) => {
    
    try{
        const   resul = await connection.query('SELECT * FROM categories');
       res.send(resul.rows);
    }catch{
        res.sendStatus(500);
    }
}

export default listCategories;