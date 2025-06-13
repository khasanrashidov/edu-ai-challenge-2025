/**
 * Base interface for all validators
 */
export interface Validator<T> {
    validate(value: unknown): ValidationResult<T>;
}
/**
 * Validation result type
 */
export interface ValidationResult<T> {
    isValid: boolean;
    value?: T;
    errors?: ValidationError[];
}
/**
 * Validation error type
 */
export interface ValidationError {
    path: string;
    message: string;
}
/**
 * Base validator class that implements common validation functionality
 */
export declare abstract class BaseValidator<T> implements Validator<T> {
    protected customMessage?: string;
    /**
     * Sets a custom error message for this validator
     */
    withMessage(message: string): this;
    /**
     * Creates a validation error with the given message
     */
    protected createError(message: string): ValidationError;
    /**
     * Abstract method that must be implemented by all validators
     */
    abstract validate(value: unknown): ValidationResult<T>;
}
