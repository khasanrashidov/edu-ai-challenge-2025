import { Ship } from '../Ship.js';

describe('Ship', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(['00', '01', '02'], 3);
    });

    test('should create a ship with correct locations and hits array', () => {
        expect(ship.locations).toEqual(['00', '01', '02']);
        expect(ship.hits).toEqual(['', '', '']);
    });

    test('should not be sunk initially', () => {
        expect(ship.isSunk()).toBe(false);
    });

    test('should register hits correctly', () => {
        expect(ship.hit('00')).toBe(true);
        expect(ship.hits[0]).toBe('hit');
    });

    test('should return false for misses', () => {
        expect(ship.hit('99')).toBe(false);
    });

    test('should be sunk when all positions are hit', () => {
        ship.hit('00');
        ship.hit('01');
        ship.hit('02');
        expect(ship.isSunk()).toBe(true);
    });

    test('should correctly identify hit positions', () => {
        ship.hit('00');
        expect(ship.isHitAt('00')).toBe(true);
        expect(ship.isHitAt('01')).toBe(false);
    });
}); 