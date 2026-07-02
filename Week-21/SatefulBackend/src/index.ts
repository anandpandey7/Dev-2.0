import { gameManager } from "./store.js";
import { startLogger } from "./logger.js";


startLogger();

setInterval(() => {
    gameManager.addGame(Math.random().toString())
}, 5000)
