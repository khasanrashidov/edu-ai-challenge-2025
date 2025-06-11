import { Player } from '../Player.js';

describe('Player', () => {
    let player;
    let cpu;

    beforeEach(() => {
        player = new Player(false);
        cpu = new Player(true);
    });

    test('should initialize correctly', () => {
        expect(player.isComputer).toBe(false);
        expect(player.guesses.size).toBe(0);
        expect(player.mode).toBe('hunt');
        expect(player.targetQueue).toEqual([]);
    });

    test('should track guesses correctly', () => {
        player.addGuess('00');
        expect(player.hasGuessed('00')).toBe(true);
        expect(player.hasGuessed('01')).toBe(false);
    });

    test('CPU should generate valid guesses', () => {
        const guess = cpu.generateComputerGuess(10);
        expect(guess.length).toBe(2);
        expect(parseInt(guess[0])).toBeLessThan(10);
        expect(parseInt(guess[1])).toBeLessThan(10);
    });

    test('CPU should not repeat guesses', () => {
        const guesses = new Set();
        for (let i = 0; i < 10; i++) {
            const guess = cpu.generateComputerGuess(10);
            expect(guesses.has(guess)).toBe(false);
            guesses.add(guess);
        }
    });

    test('CPU should switch to target mode on hit', () => {
        cpu.handleHit('44', 10);
        expect(cpu.mode).toBe('target');
        expect(cpu.targetQueue.length).toBe(4);
    });

    test('CPU should add adjacent positions to target queue', () => {
        cpu.handleHit('11', 10);
        expect(cpu.targetQueue).toContain('01');
        expect(cpu.targetQueue).toContain('21');
        expect(cpu.targetQueue).toContain('10');
        expect(cpu.targetQueue).toContain('12');
    });

    test('CPU should not add invalid positions to target queue', () => {
        cpu.handleHit('00', 10);
        expect(cpu.targetQueue.length).toBe(2);
        expect(cpu.targetQueue).toContain('01');
        expect(cpu.targetQueue).toContain('10');
    });

    test('CPU should reset on sunk ship', () => {
        cpu.handleHit('44', 10);
        expect(cpu.mode).toBe('target');
        expect(cpu.targetQueue.length).toBeGreaterThan(0);

        cpu.handleSunk();
        expect(cpu.mode).toBe('hunt');
        expect(cpu.targetQueue.length).toBe(0);
    });

    test('CPU should use target queue for guesses', () => {
        cpu.handleHit('44', 10);
        const targetPosition = cpu.targetQueue[0];
        const guess = cpu.generateComputerGuess(10);
        expect(guess).toBe(targetPosition);
    });
}); 