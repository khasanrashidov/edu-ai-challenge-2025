# Enigma Machine Bug Fix

## Bug Description

The original implementation of the rotor stepping mechanism in the `stepRotors()` method did not correctly implement the Enigma machine's double-stepping mechanism. This caused incorrect rotor advancement and therefore incorrect encryption/decryption results.

### Original Implementation

```javascript
stepRotors() {
  if (this.rotors[2].atNotch()) this.rotors[1].step();
  if (this.rotors[1].atNotch()) this.rotors[0].step();
  this.rotors[2].step();
}
```

The original code had these issues:

1. It didn't implement the double-stepping mechanism where the middle rotor would step both when the right rotor was at its notch AND when the middle rotor itself was at its notch
2. The stepping sequence was incorrect - it checked conditions before stepping the right rotor, which could miss notch positions

## Fix

The corrected implementation properly handles the double-stepping mechanism:

```javascript
stepRotors() {
  // Check if middle rotor will step
  const willMiddleStep = this.rotors[1].atNotch() || this.rotors[2].atNotch();

  // If middle rotor is at notch, step the left rotor
  if (this.rotors[1].atNotch()) {
    this.rotors[0].step();
  }

  // Step middle rotor if conditions are met
  if (willMiddleStep) {
    this.rotors[1].step();
  }

  // Always step the right rotor
  this.rotors[2].step();
}
```

### Fix Explanation

1. We first determine if the middle rotor should step (either due to right rotor at notch or middle rotor at notch)
2. We check if the middle rotor is at its notch to step the left rotor
3. We step the middle rotor if conditions are met
4. Finally, we always step the right rotor

This implementation correctly reproduces the mechanical behavior of the original Enigma machine, including the double-stepping mechanism where the middle rotor can step twice in consecutive operations.
