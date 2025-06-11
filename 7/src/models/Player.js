export class Player {
    constructor(isComputer = false) {
        this.isComputer = isComputer;
        this.guesses = new Set();
        this.mode = 'hunt';
        this.targetQueue = [];
    }

    addGuess(position) {
        this.guesses.add(position);
    }

    hasGuessed(position) {
        return this.guesses.has(position);
    }

    generateComputerGuess(boardSize) {
        if (this.mode === 'target' && this.targetQueue.length > 0) {
            const guess = this.targetQueue[0];
            if (!this.hasGuessed(guess)) {
                this.targetQueue.shift();
                return guess;
            }
            this.targetQueue.shift();
            if (this.targetQueue.length === 0) {
                this.mode = 'hunt';
            }
            return this.generateComputerGuess(boardSize);
        }

        this.mode = 'hunt';
        let row, col, guess;
        do {
            row = Math.floor(Math.random() * boardSize);
            col = Math.floor(Math.random() * boardSize);
            guess = `${row}${col}`;
        } while (this.hasGuessed(guess));

        return guess;
    }

    handleHit(position, boardSize) {
        if (this.isComputer && this.mode !== 'target') {
            this.mode = 'target';
            const [row, col] = position.split('').map(Number);
            
            const adjacent = [
                { row: row - 1, col },
                { row: row + 1, col },
                { row, col: col - 1 },
                { row, col: col + 1 }
            ];

            for (const pos of adjacent) {
                if (pos.row >= 0 && pos.row < boardSize && 
                    pos.col >= 0 && pos.col < boardSize) {
                    const newGuess = `${pos.row}${pos.col}`;
                    if (!this.hasGuessed(newGuess) && !this.targetQueue.includes(newGuess)) {
                        this.targetQueue.push(newGuess);
                    }
                }
            }
        }
    }

    handleSunk() {
        if (this.isComputer) {
            this.mode = 'hunt';
            this.targetQueue = [];
        }
    }
} 