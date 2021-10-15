import addClient from "./addClient.js";


const clientsRoutes = (app) =>{

    app.post("/customers", addClient);
}

export default clientsRoutes;