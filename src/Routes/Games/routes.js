import addGame from "./addGame.js"

const gamesRoutes = (app) => {
    app.post("/games", addGame);
}

export default gamesRoutes;