const { Enigma, Rotor, plugboardSwap, alphabet, ROTORS, REFLECTOR } = require('./enigma');

describe('Enigma Machine Tests', () => {
  // Test basic encryption/decryption
  test('Basic encryption and decryption should work', () => {
    const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    
    const message = 'HELLOWORLD';
    const encrypted = enigma1.process(message);
    const decrypted = enigma2.process(encrypted);
    
    expect(decrypted).toBe(message);
  });

  // Test rotor stepping
  test('Right rotor should step for each character', () => {
    const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const spy = jest.spyOn(enigma.rotors[2], 'step');
    
    enigma.process('ABC');
    expect(spy).toHaveBeenCalledTimes(3);
  });

  // Test double stepping mechanism
  test('Middle rotor should step when right rotor is at notch', () => {
    // Set right rotor to position just before notch (V for Rotor III)
    const enigma = new Enigma([0, 1, 2], [0, 0, 20], [0, 0, 0], []);
    const middleSpy = jest.spyOn(enigma.rotors[1], 'step');
    
    // Process enough characters to ensure the rotor reaches its notch
    enigma.process('ABCDEF');
    expect(middleSpy).toHaveBeenCalled();
  });

  // Test plugboard
  test('Plugboard should swap letters correctly', () => {
    const pairs = [['A', 'B'], ['C', 'D']];
    expect(plugboardSwap('A', pairs)).toBe('B');
    expect(plugboardSwap('B', pairs)).toBe('A');
    expect(plugboardSwap('C', pairs)).toBe('D');
    expect(plugboardSwap('E', pairs)).toBe('E');
  });

  // Test rotor wiring
  test('Rotor forward and backward pass should work correctly', () => {
    const rotor = new Rotor(ROTORS[0].wiring, ROTORS[0].notch);
    const input = 'A';
    const forward = rotor.forward(input);
    expect(alphabet.includes(forward)).toBe(true);
    
    const backward = rotor.backward(forward);
    expect(alphabet.includes(backward)).toBe(true);
  });

  // Test ring settings
  test('Ring settings should affect encryption', () => {
    const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [1, 0, 0], []);
    
    const message = 'TEST';
    expect(enigma1.process(message)).not.toBe(enigma2.process(message));
  });

  // Test reflector
  test('Reflector should be symmetric', () => {
    for (let i = 0; i < alphabet.length; i++) {
      const char = alphabet[i];
      const reflected = REFLECTOR[alphabet.indexOf(char)];
      const backReflected = REFLECTOR[alphabet.indexOf(reflected)];
      expect(backReflected).toBe(char);
    }
  });

  // Test non-alphabetic characters
  test('Non-alphabetic characters should pass through unchanged', () => {
    const enigma = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const message = 'HELLO, WORLD! 123';
    const encrypted = enigma.process(message);
    
    expect(encrypted).toMatch(/[A-Z]+, [A-Z]+! 123/);
  });

  // Test case insensitivity
  test('Input should be case insensitive', () => {
    const enigma1 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const enigma2 = new Enigma([0, 1, 2], [0, 0, 0], [0, 0, 0], []);
    const upper = 'HELLO';
    const lower = 'hello';
    
    const encrypted1 = enigma1.process(upper);
    const encrypted2 = enigma2.process(lower);
    expect(encrypted1).toBe(encrypted2);
  });
}); 