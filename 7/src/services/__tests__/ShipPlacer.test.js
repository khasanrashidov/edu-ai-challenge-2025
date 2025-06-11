import { ShipPlacer } from '../ShipPlacer.js';
import { Board } from '../../models/Board.js';
import { Ship } from '../../models/Ship.js';

describe('ShipPlacer', () => {
    let board;

    beforeEach(() => {
        board = new Board(10);
    });

    test('should place all ships successfully', () => {
        const success = ShipPlacer.placeShipsRandomly(board, 3, 3);
        expect(success).toBe(true);
        expect(board.ships.length).toBe(3);
    });

    test('should generate valid ship locations', () => {
        const locations = ShipPlacer.generateShipLocations(10, 3, 'horizontal');
        expect(locations.length).toBe(3);
        
        const [row] = locations[0].split('').map(Number);
        locations.forEach(loc => {
            const [r, c] = loc.split('').map(Number);
            expect(r).toBe(row); // Same row for horizontal
            expect(c).toBeLessThan(10);
        });
    });

    test('should validate placement correctly', () => {
        const locations = ['00', '01', '02'];
        expect(ShipPlacer.isValidPlacement(board, locations)).toBe(true);

        board.grid[0][0] = 'S';
        expect(ShipPlacer.isValidPlacement(board, locations)).toBe(false);
    });

    test('should handle vertical ship placement', () => {
        const locations = ShipPlacer.generateShipLocations(10, 3, 'vertical');
        expect(locations.length).toBe(3);
        
        const [, col] = locations[0].split('').map(Number);
        locations.forEach(loc => {
            const [r, c] = loc.split('').map(Number);
            expect(c).toBe(col); // Same column for vertical
            expect(r).toBeLessThan(10);
        });
    });

    test('should not generate locations outside board boundaries', () => {
        // Test horizontal placement at edge
        const horizontalLocations = ShipPlacer.generateShipLocations(5, 3, 'horizontal');
        if (horizontalLocations) {
            horizontalLocations.forEach(loc => {
                const [r, c] = loc.split('').map(Number);
                expect(r).toBeLessThan(5);
                expect(c).toBeLessThan(5);
            });
        }

        // Test vertical placement at edge
        const verticalLocations = ShipPlacer.generateShipLocations(5, 3, 'vertical');
        if (verticalLocations) {
            verticalLocations.forEach(loc => {
                const [r, c] = loc.split('').map(Number);
                expect(r).toBeLessThan(5);
                expect(c).toBeLessThan(5);
            });
        }
    });

    test('should handle placement conflicts', () => {
        // Place first ship
        const locations1 = ['00', '01', '02'];
        const ship1 = new Ship(locations1, 3);
        board.placeShip(ship1, true);

        // Try to place conflicting ship
        const locations2 = ['00', '10', '20'];
        expect(ShipPlacer.isValidPlacement(board, locations2)).toBe(false);
    });
}); 