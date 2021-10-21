import addRent from "./addRent.js";
import listRents from "./listRents.js";

const rentRoutes = (app) => {
    app.get("/rentals", listRents);
    app.post("/rentals", addRent);
}

export default rentRoutes;