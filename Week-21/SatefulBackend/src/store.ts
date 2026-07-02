interface Game {
    id: string,
    whitePlayerName: string,
    blackPlayerName: string,
    moves: string[]; // array of string
}


// singleton
export class GameManager {
    private games: Game[] = [];
    private static instance: GameManager;
    private constructor(){
        this.games = [];
    }

    static getInstance(){
        // create a single instance of GameManager and return it
        if(!GameManager.instance){
            GameManager.instance = new GameManager();
        }
        const gameManager = new GameManager;
        return GameManager.instance;

    }

    public addGame(gameId: string){
        const game: Game = {
            id: gameId,
            whitePlayerName: 'Alice',
            blackPlayerName: 'Bob',
            moves: []
        }

        this.games.push(game);
    }

    public getGames(){
        return this.games;
    }

    public addMove(gameId: string, move: string){
        console.log(`Adding move ${move} to game ${gameId}`);
        const game = this.games.find(game => game.id === gameId);
        game?.moves.push(move)
    }
}

export const gameManager = GameManager.getInstance();