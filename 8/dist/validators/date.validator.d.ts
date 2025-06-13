import { BaseValidator, ValidationResult } from "../validator";
/**
 * Validator for date values
 */
export declare class DateValidator extends BaseValidator<Date> {
    private minDate?;
    private maxDate?;
    private isOptional;
    /**
     * Sets the minimum date (inclusive)
     */
    min(date: Date): this;
    /**
     * Sets the maximum date (inclusive)
     */
    max(date: Date): this;
    /**
     * Makes the date optional
     */
    optional(): this;
    /**
     * Validates a date value
     */
    validate(value: unknown): ValidationResult<Date>;
}
