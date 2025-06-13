import { BaseValidator, ValidationResult } from "../validator";

/**
 * Validator for boolean values
 */
export class BooleanValidator extends BaseValidator<boolean> {
  /**
   * Validates a boolean value
   */
  validate(value: unknown): ValidationResult<boolean> {
    if (typeof value !== "boolean") {
      return {
        isValid: false,
        errors: [this.createError("Value must be a boolean")],
      };
    }

    return {
      isValid: true,
      value,
    };
  }
}
