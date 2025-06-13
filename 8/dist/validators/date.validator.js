"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValidator = void 0;
const validator_1 = require("../validator");
/**
 * Validator for date values
 */
class DateValidator extends validator_1.BaseValidator {
    constructor() {
        super(...arguments);
        this.isOptional = false;
    }
    /**
     * Sets the minimum date (inclusive)
     */
    min(date) {
        this.minDate = date;
        return this;
    }
    /**
     * Sets the maximum date (inclusive)
     */
    max(date) {
        this.maxDate = date;
        return this;
    }
    /**
     * Makes the date optional
     */
    optional() {
        this.isOptional = true;
        return this;
    }
    /**
     * Validates a date value
     */
    validate(value) {
        if (value === undefined || value === null) {
            if (this.isOptional) {
                return { isValid: true, value: undefined };
            }
            return {
                isValid: false,
                errors: [this.createError("Value must be a date")],
            };
        }
        let dateValue;
        if (value instanceof Date) {
            dateValue = value;
        }
        else if (typeof value === "string" || typeof value === "number") {
            const parsed = new Date(value);
            if (!isNaN(parsed.getTime())) {
                dateValue = parsed;
            }
        }
        if (!dateValue) {
            return {
                isValid: false,
                errors: [this.createError("Value must be a valid date")],
            };
        }
        const errors = [];
        if (this.minDate && dateValue < this.minDate) {
            errors.push(this.createError(`Date must be on or after ${this.minDate.toISOString()}`));
        }
        if (this.maxDate && dateValue > this.maxDate) {
            errors.push(this.createError(`Date must be on or before ${this.maxDate.toISOString()}`));
        }
        return {
            isValid: errors.length === 0,
            value: errors.length === 0 ? dateValue : undefined,
            errors: errors.length > 0 ? errors : undefined,
        };
    }
}
exports.DateValidator = DateValidator;
