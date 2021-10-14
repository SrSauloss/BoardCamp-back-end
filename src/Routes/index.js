import categoriesRoutes from "./Categories/routes.js";
import gamesRoutes from "./Games/routes.js";

const routes = (app) => {
    categoriesRoutes(app);
    gamesRoutes(app);
}

export default routes;