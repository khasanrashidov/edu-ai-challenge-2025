"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const string_validator_1 = require("./validators/string.validator");
const number_validator_1 = require("./validators/number.validator");
const boolean_validator_1 = require("./validators/boolean.validator");
const array_validator_1 = require("./validators/array.validator");
const object_validator_1 = require("./validators/object.validator");
const date_validator_1 = require("./validators/date.validator");
/**
 * Schema class that provides factory methods for creating validators
 */
class Schema {
    /**
     * Creates a string validator
     */
    static string() {
        return new string_validator_1.StringValidator();
    }
    /**
     * Creates a number validator
     */
    static number() {
        return new number_validator_1.NumberValidator();
    }
    /**
     * Creates a boolean validator
     */
    static boolean() {
        return new boolean_validator_1.BooleanValidator();
    }
    /**
     * Creates an array validator
     */
    static array(itemValidator) {
        return new array_validator_1.ArrayValidator(itemValidator);
    }
    /**
     * Creates an object validator
     */
    static object(schema) {
        return new object_validator_1.ObjectValidator(schema);
    }
    /**
     * Creates a date validator
     */
    static date() {
        return new date_validator_1.DateValidator();
    }
}
exports.Schema = Schema;
