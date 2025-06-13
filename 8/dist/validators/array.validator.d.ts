import { BaseValidator, ValidationResult, Validator } from "../validator";
/**
 * Validator for array values
 */
export declare class ArrayValidator<T> extends BaseValidator<T[]> {
    private itemValidator;
    private minLengthValue?;
    private maxLengthValue?;
    private isOptional;
    constructor(itemValidator: Validator<T>);
    /**
     * Sets the minimum length requirement
     */
    minLength(length: number): this;
    /**
     * Sets the maximum length requirement
     */
    maxLength(length: number): this;
    /**
     * Makes the array optional
     */
    optional(): this;
    /**
     * Validates an array value
     */
    validate(value: unknown): ValidationResult<T[]>;
}
