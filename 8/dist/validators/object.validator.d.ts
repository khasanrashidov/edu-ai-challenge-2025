import { BaseValidator, ValidationResult, Validator } from "../validator";
/**
 * Validator for object values
 */
export declare class ObjectValidator<T extends Record<string, any>> extends BaseValidator<T> {
    private schema;
    private isOptional;
    constructor(schema: Record<string, Validator<any>>);
    /**
     * Makes the object optional
     */
    optional(): this;
    /**
     * Validates an object value
     */
    validate(value: unknown): ValidationResult<T>;
}
