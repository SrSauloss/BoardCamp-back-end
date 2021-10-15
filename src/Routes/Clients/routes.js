import addClient from "./addClient.js";
import listClient from "./listClient.js";
import listClients from "./listClients.js";


const clientsRoutes = (app) =>{

    app.get("/customers", listClients);
    app.get("/customers/:id", listClient);
    app.post("/customers", addClient);
}

export default clientsRoutes;