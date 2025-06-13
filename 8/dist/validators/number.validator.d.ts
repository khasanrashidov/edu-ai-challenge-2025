import { BaseValidator, ValidationResult } from "../validator";
/**
 * Validator for number values
 */
export declare class NumberValidator extends BaseValidator<number> {
    private minValue?;
    private maxValue?;
    private isInteger?;
    /**
     * Sets the minimum value requirement
     */
    min(value: number): this;
    /**
     * Sets the maximum value requirement
     */
    max(value: number): this;
    /**
     * Requires the number to be an integer
     */
    integer(): this;
    /**
     * Validates a number value
     */
    validate(value: unknown): ValidationResult<number>;
}
