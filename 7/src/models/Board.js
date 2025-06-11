import { Ship } from './Ship.js';

export class Board {
    constructor(size = 10) {
        this.size = size;
        this.grid = Array(size).fill().map(() => Array(size).fill('~'));
        this.ships = [];
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    placeShip(ship, isPlayerBoard = false) {
        this.ships.push(ship);
        if (isPlayerBoard) {
            ship.locations.forEach(loc => {
                const [row, col] = loc.split('').map(Number);
                this.grid[row][col] = 'S';
            });
        }
    }

    receiveAttack(position) {
        if (position.length !== 2) {
            return { valid: false, message: 'Invalid position format' };
        }

        const [row, col] = position.split('').map(Number);
        if (!this.isValidPosition(row, col)) {
            return { valid: false, message: 'Invalid position' };
        }

        for (const ship of this.ships) {
            if (ship.isHitAt(position)) {
                return { valid: false, message: 'Already hit this position' };
            }
            if (ship.hit(position)) {
                this.grid[row][col] = 'X';
                return {
                    valid: true,
                    hit: true,
                    sunk: ship.isSunk(),
                    message: ship.isSunk() ? 'Ship sunk!' : 'Hit!'
                };
            }
        }

        this.grid[row][col] = 'O';
        return { valid: true, hit: false, message: 'Miss!' };
    }

    getCell(row, col) {
        return this.grid[row][col];
    }

    toString() {
        let header = '  ';
        for (let h = 0; h < this.size; h++) header += h + ' ';
        let result = [header];

        for (let i = 0; i < this.size; i++) {
            let row = `${i} ${this.grid[i].join(' ')}`;
            result.push(row);
        }

        return result.join('\n');
    }
} 