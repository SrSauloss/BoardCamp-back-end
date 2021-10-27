import addRent from "./addRent.js";
import listRents from "./listRents.js";
import terminateRent from "./terminateRent.js";

const rentRoutes = (app) => {
    app.get("/rentals", listRents);
    app.post("/rentals", addRent);
    app.post("/rentals/:id/return", terminateRent);
}

export default rentRoutes;