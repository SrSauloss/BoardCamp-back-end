import listCategories from "./listCategories.js";

const categoriesRoutes = (app) => {
    app.get("/categories", listCategories);
}

export default categoriesRoutes;