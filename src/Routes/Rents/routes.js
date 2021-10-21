import addRent from "./addRent.js";

const rentRoutes = (app) => {

    app.post("/rentals", addRent);
}

export default rentRoutes;