import { Board } from '../Board.js';
import { Ship } from '../Ship.js';

describe('Board', () => {
    let board;

    beforeEach(() => {
        board = new Board(10);
    });

    test('should create a board with correct dimensions', () => {
        expect(board.grid.length).toBe(10);
        expect(board.grid[0].length).toBe(10);
        expect(board.grid[0][0]).toBe('~');
    });

    test('should validate positions correctly', () => {
        expect(board.isValidPosition(0, 0)).toBe(true);
        expect(board.isValidPosition(9, 9)).toBe(true);
        expect(board.isValidPosition(-1, 0)).toBe(false);
        expect(board.isValidPosition(10, 0)).toBe(false);
    });

    test('should place ships correctly', () => {
        const ship = new Ship(['00', '01', '02'], 3);
        board.placeShip(ship, true);
        expect(board.ships).toContain(ship);
        expect(board.grid[0][0]).toBe('S');
        expect(board.grid[0][1]).toBe('S');
        expect(board.grid[0][2]).toBe('S');
    });

    test('should handle attacks correctly', () => {
        const ship = new Ship(['00', '01', '02'], 3);
        board.placeShip(ship, true);

        const hit = board.receiveAttack('00');
        expect(hit.valid).toBe(true);
        expect(hit.hit).toBe(true);
        expect(board.grid[0][0]).toBe('X');

        const miss = board.receiveAttack('99');
        expect(miss.valid).toBe(true);
        expect(miss.hit).toBe(false);
        expect(board.grid[9][9]).toBe('O');
    });

    test('should detect invalid attacks', () => {
        const result = board.receiveAttack('910');
        expect(result.valid).toBe(false);
    });

    test('should detect repeated attacks', () => {
        const ship = new Ship(['00'], 1);
        board.placeShip(ship, true);
        
        board.receiveAttack('00');
        const repeat = board.receiveAttack('00');
        expect(repeat.valid).toBe(false);
        expect(repeat.message).toBe('Already hit this position');
    });

    test('should detect sunken ships', () => {
        const ship = new Ship(['00'], 1);
        board.placeShip(ship, true);
        
        const result = board.receiveAttack('00');
        expect(result.sunk).toBe(true);
        expect(result.message).toBe('Ship sunk!');
    });

    test('should generate correct string representation', () => {
        const expected = '  0 1 2 3 4 5 6 7 8 9 \n' +
                        '0 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '1 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '2 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '3 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '4 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '5 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '6 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '7 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '8 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~\n' +
                        '9 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~';
        expect(board.toString()).toBe(expected);

        // Test with a ship
        const ship = new Ship(['00', '01', '02'], 3);
        board.placeShip(ship, true);

        // When hideShips is false, ships should be visible
        expect(board.toString(false)).toContain('S');

        // When hideShips is true, ships should be hidden
        expect(board.toString(true)).not.toContain('S');
    });
}); 