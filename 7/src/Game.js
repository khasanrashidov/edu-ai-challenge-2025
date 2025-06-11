import { createInterface } from 'readline';
import { Board } from './models/Board.js';
import { Player } from './models/Player.js';
import { ShipPlacer } from './services/ShipPlacer.js';

export class Game {
    constructor(boardSize = 10, numShips = 3, shipLength = 3) {
        this.boardSize = boardSize;
        this.numShips = numShips;
        this.shipLength = shipLength;

        this.playerBoard = new Board(boardSize);
        this.cpuBoard = new Board(boardSize);
        
        this.player = new Player(false);
        this.cpu = new Player(true);

        this.rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async initialize() {
        console.log('Initializing game...');
        
        // Place ships
        ShipPlacer.placeShipsRandomly(this.playerBoard, this.numShips, this.shipLength);
        ShipPlacer.placeShipsRandomly(this.cpuBoard, this.numShips, this.shipLength);

        console.log("\nLet's play Sea Battle!");
        console.log(`Try to sink the ${this.numShips} enemy ships.`);
        
        await this.gameLoop();
    }

    displayBoards() {
        console.log('\n   --- OPPONENT BOARD ---          --- YOUR BOARD ---');
        const cpuDisplay = this.cpuBoard.toString();
        const playerDisplay = this.playerBoard.toString();

        const cpuLines = cpuDisplay.split('\n');
        const playerLines = playerDisplay.split('\n');

        for (let i = 0; i < cpuLines.length; i++) {
            console.log(cpuLines[i] + '    ' + playerLines[i]);
        }
        console.log('\n');
    }

    async getPlayerGuess() {
        return new Promise((resolve) => {
            this.rl.question('Enter your guess (e.g., 00): ', (answer) => {
                if (!answer || answer.length !== 2) {
                    console.log('Please enter exactly two digits (e.g., 00, 34, 98).');
                    resolve(null);
                    return;
                }

                const [row, col] = answer.split('').map(Number);
                if (isNaN(row) || isNaN(col) || !this.cpuBoard.isValidPosition(row, col)) {
                    console.log(`Please enter valid coordinates between 0 and ${this.boardSize - 1}.`);
                    resolve(null);
                    return;
                }

                if (this.player.hasGuessed(answer)) {
                    console.log('You already guessed that position!');
                    resolve(null);
                    return;
                }

                resolve(answer);
            });
        });
    }

    processCPUTurn() {
        const guess = this.cpu.generateComputerGuess(this.boardSize);
        console.log(`\nCPU guesses: ${guess}`);
        
        const result = this.playerBoard.receiveAttack(guess);
        this.cpu.addGuess(guess);

        if (result.hit) {
            console.log('CPU HIT!');
            this.cpu.handleHit(guess, this.boardSize);
            if (result.sunk) {
                console.log('CPU sunk your battleship!');
                this.cpu.handleSunk();
            }
        } else {
            console.log('CPU MISS!');
        }

        return result;
    }

    async gameLoop() {
        this.displayBoards();

        // Player's turn
        const playerGuess = await this.getPlayerGuess();
        if (!playerGuess) {
            await this.gameLoop();
            return;
        }

        this.player.addGuess(playerGuess);
        const playerResult = this.cpuBoard.receiveAttack(playerGuess);

        if (playerResult.hit) {
            console.log('PLAYER HIT!');
            if (playerResult.sunk) {
                console.log('You sunk an enemy battleship!');
                if (this.cpuBoard.ships.every(ship => ship.isSunk())) {
                    console.log('\n*** CONGRATULATIONS! You sunk all enemy battleships! ***');
                    this.displayBoards();
                    this.rl.close();
                    return;
                }
            }
        } else {
            console.log('PLAYER MISS!');
        }

        // CPU's turn
        const cpuResult = this.processCPUTurn();
        if (cpuResult.sunk && this.playerBoard.ships.every(ship => ship.isSunk())) {
            console.log('\n*** GAME OVER! The CPU sunk all your battleships! ***');
            this.displayBoards();
            this.rl.close();
            return;
        }

        await this.gameLoop();
    }
} 