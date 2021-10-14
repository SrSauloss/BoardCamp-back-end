import addGame from "./addGame.js"
import listGames from "./listGames.js";

const gamesRoutes = (app) => {
    app.get("/games", listGames);
    app.post("/games", addGame);
}

export default gamesRoutes;