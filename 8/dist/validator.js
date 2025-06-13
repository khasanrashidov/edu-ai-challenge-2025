"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidator = void 0;
/**
 * Base validator class that implements common validation functionality
 */
class BaseValidator {
    /**
     * Sets a custom error message for this validator
     */
    withMessage(message) {
        this.customMessage = message;
        return this;
    }
    /**
     * Creates a validation error with the given message
     */
    createError(message) {
        return {
            path: "",
            message: this.customMessage || message,
        };
    }
}
exports.BaseValidator = BaseValidator;
