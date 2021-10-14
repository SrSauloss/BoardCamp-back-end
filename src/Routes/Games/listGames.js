import connection from "../../Bd/connection.js";

const listGames = (req, res) => {

    const params = req.query;
    if(params.name) {
     
        connection.query('SELECT * FROM games WHERE LOWER(name) LIKE $1', [params.name + "%"])
        .then( resul => {
            console.log(resul.rows);
            res.send(resul.rows);
        });
     
        return;

        
    }else{
        console.log("nada");

    }
    const promise = connection.query('SELECT * FROM games');
    promise.then( resul => {

        //console.log(resul.rows);
        res.send(resul.rows);
    });

}

export default listGames;