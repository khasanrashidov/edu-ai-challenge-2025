import { BaseValidator, ValidationResult } from "../validator";
/**
 * Validator for string values
 */
export declare class StringValidator extends BaseValidator<string> {
    private minLengthValue?;
    private maxLengthValue?;
    private patternValue?;
    /**
     * Sets the minimum length requirement
     */
    minLength(length: number): this;
    /**
     * Sets the maximum length requirement
     */
    maxLength(length: number): this;
    /**
     * Sets a regex pattern that the string must match
     */
    pattern(pattern: RegExp): this;
    /**
     * Validates a string value
     */
    validate(value: unknown): ValidationResult<string>;
}
