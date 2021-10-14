import addCategories from "./addCategorie.js";
import listCategories from "./listCategories.js";

const categoriesRoutes = (app) => {
    app.get("/categories", listCategories);
    app.post("/categories", addCategories);
}

export default categoriesRoutes;