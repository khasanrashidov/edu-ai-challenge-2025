import { BaseValidator, ValidationResult } from "../validator";
/**
 * Validator for boolean values
 */
export declare class BooleanValidator extends BaseValidator<boolean> {
    /**
     * Validates a boolean value
     */
    validate(value: unknown): ValidationResult<boolean>;
}
