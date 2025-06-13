"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValidator = void 0;
const validator_1 = require("../validator");
/**
 * Validator for number values
 */
class NumberValidator extends validator_1.BaseValidator {
    /**
     * Sets the minimum value requirement
     */
    min(value) {
        this.minValue = value;
        return this;
    }
    /**
     * Sets the maximum value requirement
     */
    max(value) {
        this.maxValue = value;
        return this;
    }
    /**
     * Requires the number to be an integer
     */
    integer() {
        this.isInteger = true;
        return this;
    }
    /**
     * Validates a number value
     */
    validate(value) {
        if (typeof value !== "number" || isNaN(value)) {
            return {
                isValid: false,
                errors: [this.createError("Value must be a valid number")],
            };
        }
        const errors = [];
        if (this.minValue !== undefined && value < this.minValue) {
            errors.push(this.createError(`Number must be at least ${this.minValue}`));
        }
        if (this.maxValue !== undefined && value > this.maxValue) {
            errors.push(this.createError(`Number must be at most ${this.maxValue}`));
        }
        if (this.isInteger && !Number.isInteger(value)) {
            errors.push(this.createError("Number must be an integer"));
        }
        return {
            isValid: errors.length === 0,
            value: errors.length === 0 ? value : undefined,
            errors: errors.length > 0 ? errors : undefined,
        };
    }
}
exports.NumberValidator = NumberValidator;
