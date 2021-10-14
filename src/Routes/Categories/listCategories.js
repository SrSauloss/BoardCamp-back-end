import connection from "../../Bd/connection.js";

const listCategories = (req, res) => {
    const promise = connection.query('SELECT * FROM categories');
    promise.then(resul => {
        res.send(resul.rows);
        console.log("listando");
    })
}

export default listCategories;