import categoriesRoutes from "./Categories/routes.js";
import clientsRoutes from "./Clients/routes.js";
import gamesRoutes from "./Games/routes.js";
import rentRoutes from "./Rents/routes.js";

const routes = (app) => {
    categoriesRoutes(app);
    gamesRoutes(app);
    clientsRoutes(app);
    rentRoutes(app);
}

export default routes;