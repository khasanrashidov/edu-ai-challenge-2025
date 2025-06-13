import { BaseValidator, ValidationResult, ValidationError } from "../validator";

/**
 * Validator for number values
 */
export class NumberValidator extends BaseValidator<number> {
  private minValue?: number;
  private maxValue?: number;
  private isInteger?: boolean;

  /**
   * Sets the minimum value requirement
   */
  min(value: number): this {
    this.minValue = value;
    return this;
  }

  /**
   * Sets the maximum value requirement
   */
  max(value: number): this {
    this.maxValue = value;
    return this;
  }

  /**
   * Requires the number to be an integer
   */
  integer(): this {
    this.isInteger = true;
    return this;
  }

  /**
   * Validates a number value
   */
  validate(value: unknown): ValidationResult<number> {
    if (typeof value !== "number" || isNaN(value)) {
      return {
        isValid: false,
        errors: [this.createError("Value must be a valid number")],
      };
    }

    const errors: ValidationError[] = [];

    if (this.minValue !== undefined && value < this.minValue) {
      errors.push(this.createError(`Number must be at least ${this.minValue}`));
    }

    if (this.maxValue !== undefined && value > this.maxValue) {
      errors.push(this.createError(`Number must be at most ${this.maxValue}`));
    }

    if (this.isInteger && !Number.isInteger(value)) {
      errors.push(this.createError("Number must be an integer"));
    }

    return {
      isValid: errors.length === 0,
      value: errors.length === 0 ? value : undefined,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
