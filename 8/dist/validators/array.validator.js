"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayValidator = void 0;
const validator_1 = require("../validator");
/**
 * Validator for array values
 */
class ArrayValidator extends validator_1.BaseValidator {
    constructor(itemValidator) {
        super();
        this.itemValidator = itemValidator;
        this.isOptional = false;
    }
    /**
     * Sets the minimum length requirement
     */
    minLength(length) {
        this.minLengthValue = length;
        return this;
    }
    /**
     * Sets the maximum length requirement
     */
    maxLength(length) {
        this.maxLengthValue = length;
        return this;
    }
    /**
     * Makes the array optional
     */
    optional() {
        this.isOptional = true;
        return this;
    }
    /**
     * Validates an array value
     */
    validate(value) {
        if (value === undefined || value === null) {
            if (this.isOptional) {
                return { isValid: true, value: undefined };
            }
            return {
                isValid: false,
                errors: [this.createError("Value must be an array")],
            };
        }
        if (!Array.isArray(value)) {
            return {
                isValid: false,
                errors: [this.createError("Value must be an array")],
            };
        }
        const errors = [];
        if (this.minLengthValue !== undefined &&
            value.length < this.minLengthValue) {
            errors.push(this.createError(`Array must have at least ${this.minLengthValue} items`));
        }
        if (this.maxLengthValue !== undefined &&
            value.length > this.maxLengthValue) {
            errors.push(this.createError(`Array must have at most ${this.maxLengthValue} items`));
        }
        const validatedItems = [];
        let hasItemErrors = false;
        for (let i = 0; i < value.length; i++) {
            const itemResult = this.itemValidator.validate(value[i]);
            if (!itemResult.isValid) {
                hasItemErrors = true;
                if (itemResult.errors) {
                    errors.push(...itemResult.errors.map((error) => ({
                        ...error,
                        path: `[${i}]${error.path}`,
                    })));
                }
            }
            else if (itemResult.value !== undefined) {
                validatedItems.push(itemResult.value);
            }
        }
        return {
            isValid: errors.length === 0,
            value: !hasItemErrors ? validatedItems : undefined,
            errors: errors.length > 0 ? errors : undefined,
        };
    }
}
exports.ArrayValidator = ArrayValidator;
