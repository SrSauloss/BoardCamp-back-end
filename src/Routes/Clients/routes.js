import addClient from "./addClient.js";
import listClients from "./listClients.js";


const clientsRoutes = (app) =>{

    app.get("/customers", listClients);
    app.post("/customers", addClient);
}

export default clientsRoutes;