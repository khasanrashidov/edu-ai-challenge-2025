"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanValidator = void 0;
const validator_1 = require("../validator");
/**
 * Validator for boolean values
 */
class BooleanValidator extends validator_1.BaseValidator {
    /**
     * Validates a boolean value
     */
    validate(value) {
        if (typeof value !== "boolean") {
            return {
                isValid: false,
                errors: [this.createError("Value must be a boolean")],
            };
        }
        return {
            isValid: true,
            value,
        };
    }
}
exports.BooleanValidator = BooleanValidator;
