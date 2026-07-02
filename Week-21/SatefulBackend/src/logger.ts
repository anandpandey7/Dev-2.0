import { GameManager } from "./store.js";
import { gameManager } from "./store.js";



export function startLogger() {
    setInterval(() =>{
        console.log(gameManager.getGames());
    }, 5000)
}