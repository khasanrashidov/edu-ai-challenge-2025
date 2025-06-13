"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectValidator = void 0;
const validator_1 = require("../validator");
/**
 * Validator for object values
 */
class ObjectValidator extends validator_1.BaseValidator {
    constructor(schema) {
        super();
        this.schema = schema;
        this.isOptional = false;
    }
    /**
     * Makes the object optional
     */
    optional() {
        this.isOptional = true;
        return this;
    }
    /**
     * Validates an object value
     */
    validate(value) {
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
        const errors = [];
        const validatedObject = {};
        for (const [key, validator] of Object.entries(this.schema)) {
            const fieldValue = value[key];
            const result = validator.validate(fieldValue);
            if (!result.isValid) {
                if (result.errors) {
                    errors.push(...result.errors.map((error) => ({
                        ...error,
                        path: error.path ? `${key}.${error.path}` : key,
                    })));
                }
            }
            else if (result.value !== undefined) {
                validatedObject[key] = result.value;
            }
        }
        return {
            isValid: errors.length === 0,
            value: errors.length === 0 ? validatedObject : undefined,
            errors: errors.length > 0 ? errors : undefined,
        };
    }
}
exports.ObjectValidator = ObjectValidator;
