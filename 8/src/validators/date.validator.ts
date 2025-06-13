import { BaseValidator, ValidationResult, ValidationError } from "../validator";

/**
 * Validator for date values
 */
export class DateValidator extends BaseValidator<Date> {
  private minDate?: Date;
  private maxDate?: Date;
  private isOptional = false;

  /**
   * Sets the minimum date (inclusive)
   */
  min(date: Date): this {
    this.minDate = date;
    return this;
  }

  /**
   * Sets the maximum date (inclusive)
   */
  max(date: Date): this {
    this.maxDate = date;
    return this;
  }

  /**
   * Makes the date optional
   */
  optional(): this {
    this.isOptional = true;
    return this;
  }

  /**
   * Validates a date value
   */
  validate(value: unknown): ValidationResult<Date> {
    if (value === undefined || value === null) {
      if (this.isOptional) {
        return { isValid: true, value: undefined };
      }
      return {
        isValid: false,
        errors: [this.createError("Value must be a date")],
      };
    }

    let dateValue: Date | undefined;
    if (value instanceof Date) {
      dateValue = value;
    } else if (typeof value === "string" || typeof value === "number") {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        dateValue = parsed;
      }
    }

    if (!dateValue) {
      return {
        isValid: false,
        errors: [this.createError("Value must be a valid date")],
      };
    }

    const errors: ValidationError[] = [];
    if (this.minDate && dateValue < this.minDate) {
      errors.push(
        this.createError(
          `Date must be on or after ${this.minDate.toISOString()}`
        )
      );
    }
    if (this.maxDate && dateValue > this.maxDate) {
      errors.push(
        this.createError(
          `Date must be on or before ${this.maxDate.toISOString()}`
        )
      );
    }

    return {
      isValid: errors.length === 0,
      value: errors.length === 0 ? dateValue : undefined,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
