import connection from "../../Bd/connection.js";

const listCategories = (req, res) => {

    connection.query('SELECT * FROM categories')
    .then(resul => {
        res.send(resul.rows);
    })
}

export default listCategories;