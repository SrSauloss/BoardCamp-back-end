import categoriesRoutes from "./Categories/routes.js";
import clientsRoutes from "./Clients/routes.js";
import gamesRoutes from "./Games/routes.js";

const routes = (app) => {
    categoriesRoutes(app);
    gamesRoutes(app);
    clientsRoutes(app);
}

export default routes;