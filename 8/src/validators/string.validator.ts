import { BaseValidator, ValidationResult, ValidationError } from "../validator";

/**
 * Validator for string values
 */
export class StringValidator extends BaseValidator<string> {
  private minLengthValue?: number;
  private maxLengthValue?: number;
  private patternValue?: RegExp;

  /**
   * Sets the minimum length requirement
   */
  minLength(length: number): this {
    this.minLengthValue = length;
    return this;
  }

  /**
   * Sets the maximum length requirement
   */
  maxLength(length: number): this {
    this.maxLengthValue = length;
    return this;
  }

  /**
   * Sets a regex pattern that the string must match
   */
  pattern(pattern: RegExp): this {
    this.patternValue = pattern;
    return this;
  }

  /**
   * Validates a string value
   */
  validate(value: unknown): ValidationResult<string> {
    if (typeof value !== "string") {
      return {
        isValid: false,
        errors: [this.createError("Value must be a string")],
      };
    }

    const errors: ValidationError[] = [];

    if (
      this.minLengthValue !== undefined &&
      value.length < this.minLengthValue
    ) {
      errors.push(
        this.createError(
          `String must be at least ${this.minLengthValue} characters long`
        )
      );
    }

    if (
      this.maxLengthValue !== undefined &&
      value.length > this.maxLengthValue
    ) {
      errors.push(
        this.createError(
          `String must be at most ${this.maxLengthValue} characters long`
        )
      );
    }

    if (this.patternValue && !this.patternValue.test(value)) {
      errors.push(
        this.createError("String does not match the required pattern")
      );
    }

    return {
      isValid: errors.length === 0,
      value: errors.length === 0 ? value : undefined,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
