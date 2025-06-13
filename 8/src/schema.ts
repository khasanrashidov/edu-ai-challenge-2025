import { Validator } from "./validator";
import { StringValidator } from "./validators/string.validator";
import { NumberValidator } from "./validators/number.validator";
import { BooleanValidator } from "./validators/boolean.validator";
import { ArrayValidator } from "./validators/array.validator";
import { ObjectValidator } from "./validators/object.validator";
import { DateValidator } from "./validators/date.validator";

/**
 * Schema class that provides factory methods for creating validators
 */
export class Schema {
  /**
   * Creates a string validator
   */
  static string(): StringValidator {
    return new StringValidator();
  }

  /**
   * Creates a number validator
   */
  static number(): NumberValidator {
    return new NumberValidator();
  }

  /**
   * Creates a boolean validator
   */
  static boolean(): BooleanValidator {
    return new BooleanValidator();
  }

  /**
   * Creates an array validator
   */
  static array<T>(itemValidator: Validator<T>): ArrayValidator<T> {
    return new ArrayValidator<T>(itemValidator);
  }

  /**
   * Creates an object validator
   */
  static object<T extends Record<string, any>>(
    schema: Record<string, Validator<any>>
  ): ObjectValidator<T> {
    return new ObjectValidator<T>(schema);
  }

  /**
   * Creates a date validator
   */
  static date(): DateValidator {
    return new DateValidator();
  }
}
