import addRent from "./addRent.js";
import deleteRent from "./deleteRent.js";
import listRents from "./listRents.js";
import terminateRent from "./terminateRent.js";

const rentRoutes = (app) => {
    
    app.get("/rentals", listRents);
    app.post("/rentals", addRent);
    app.post("/rentals/:id/return", terminateRent);
    app.delete("/rentals/:id", deleteRent);
}

export default rentRoutes;