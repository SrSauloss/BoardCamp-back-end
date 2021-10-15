import addClient from "./addClient.js";
import listClient from "./listClient.js";
import listClients from "./listClients.js";
import updateClient from "./updateClient.js";


const clientsRoutes = (app) =>{

    app.get("/customers", listClients);
    app.get("/customers/:id", listClient);
    app.post("/customers", addClient);
    app.put("/customers/:id", updateClient);
}

export default clientsRoutes;