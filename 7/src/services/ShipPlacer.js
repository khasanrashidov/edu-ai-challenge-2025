import { Ship } from '../models/Ship.js';

export class ShipPlacer {
    static placeShipsRandomly(board, numShips, shipLength) {
        let placedShips = 0;
        const attempts = 100; // Prevent infinite loops
        let currentAttempt = 0;

        while (placedShips < numShips && currentAttempt < attempts) {
            currentAttempt++;
            const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            const shipLocations = this.generateShipLocations(board.size, shipLength, orientation);

            if (shipLocations && this.isValidPlacement(board, shipLocations)) {
                const ship = new Ship(shipLocations, shipLength);
                board.placeShip(ship, board === board);
                placedShips++;
                currentAttempt = 0;
            }
        }

        return placedShips === numShips;
    }

    static generateShipLocations(boardSize, shipLength, orientation) {
        const locations = [];
        let startRow, startCol;

        if (orientation === 'horizontal') {
            startRow = Math.floor(Math.random() * boardSize);
            startCol = Math.floor(Math.random() * (boardSize - shipLength + 1));
        } else {
            startRow = Math.floor(Math.random() * (boardSize - shipLength + 1));
            startCol = Math.floor(Math.random() * boardSize);
        }

        for (let i = 0; i < shipLength; i++) {
            const row = orientation === 'horizontal' ? startRow : startRow + i;
            const col = orientation === 'horizontal' ? startCol + i : startCol;
            
            if (row >= boardSize || col >= boardSize) {
                return null;
            }
            
            locations.push(`${row}${col}`);
        }

        return locations;
    }

    static isValidPlacement(board, locations) {
        return locations.every(loc => {
            const [row, col] = loc.split('').map(Number);
            return board.getCell(row, col) === '~';
        });
    }
} 