import {
  BaseValidator,
  ValidationResult,
  ValidationError,
  Validator,
} from "../validator";

/**
 * Validator for object values
 */
export class ObjectValidator<
  T extends Record<string, any>
> extends BaseValidator<T> {
  private isOptional = false;

  constructor(private schema: Record<string, Validator<any>>) {
    super();
  }

  /**
   * Makes the object optional
   */
  optional(): this {
    this.isOptional = true;
    return this;
  }

  /**
   * Validates an object value
   */
  validate(value: unknown): ValidationResult<T> {
    if (value === undefined || value === null) {
      if (this.isOptional) {
        return { isValid: true, value: undefined };
      }
      return {
        isValid: false,
        errors: [this.createError("Value must be an object")],
      };
    }

    if (typeof value !== "object" || Array.isArray(value)) {
      return {
        isValid: false,
        errors: [this.createError("Value must be an object")],
      };
    }

    const errors: ValidationError[] = [];
    const validatedObject: Partial<T> = {};

    for (const [key, validator] of Object.entries(this.schema)) {
      const fieldValue = (value as any)[key];
      const result = validator.validate(fieldValue);

      if (!result.isValid) {
        if (result.errors) {
          errors.push(
            ...result.errors.map((error) => ({
              ...error,
              path: error.path ? `${key}.${error.path}` : key,
            }))
          );
        }
      } else if (result.value !== undefined) {
        validatedObject[key as keyof T] = result.value;
      }
    }

    return {
      isValid: errors.length === 0,
      value: errors.length === 0 ? (validatedObject as T) : undefined,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
