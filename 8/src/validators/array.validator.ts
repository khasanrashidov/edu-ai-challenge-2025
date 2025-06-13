import {
  BaseValidator,
  ValidationResult,
  ValidationError,
  Validator,
} from "../validator";

/**
 * Validator for array values
 */
export class ArrayValidator<T> extends BaseValidator<T[]> {
  private minLengthValue?: number;
  private maxLengthValue?: number;
  private isOptional = false;

  constructor(private itemValidator: Validator<T>) {
    super();
  }

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
   * Makes the array optional
   */
  optional(): this {
    this.isOptional = true;
    return this;
  }

  /**
   * Validates an array value
   */
  validate(value: unknown): ValidationResult<T[]> {
    if (value === undefined || value === null) {
      if (this.isOptional) {
        return { isValid: true, value: undefined };
      }
      return {
        isValid: false,
        errors: [this.createError("Value must be an array")],
      };
    }

    if (!Array.isArray(value)) {
      return {
        isValid: false,
        errors: [this.createError("Value must be an array")],
      };
    }

    const errors: ValidationError[] = [];

    if (
      this.minLengthValue !== undefined &&
      value.length < this.minLengthValue
    ) {
      errors.push(
        this.createError(
          `Array must have at least ${this.minLengthValue} items`
        )
      );
    }

    if (
      this.maxLengthValue !== undefined &&
      value.length > this.maxLengthValue
    ) {
      errors.push(
        this.createError(`Array must have at most ${this.maxLengthValue} items`)
      );
    }

    const validatedItems: T[] = [];
    let hasItemErrors = false;

    for (let i = 0; i < value.length; i++) {
      const itemResult = this.itemValidator.validate(value[i]);
      if (!itemResult.isValid) {
        hasItemErrors = true;
        if (itemResult.errors) {
          errors.push(
            ...itemResult.errors.map((error) => ({
              ...error,
              path: `[${i}]${error.path}`,
            }))
          );
        }
      } else if (itemResult.value !== undefined) {
        validatedItems.push(itemResult.value);
      }
    }

    return {
      isValid: errors.length === 0,
      value: !hasItemErrors ? validatedItems : undefined,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
