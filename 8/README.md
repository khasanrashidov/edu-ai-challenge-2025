# Data Validation Library

A type-safe data validation library for TypeScript.

## Features

- Type-safe validation for primitive types (string, number, boolean, date)
- Support for complex types (arrays, objects)
- Custom validation rules
- Optional fields
- Nested object validation
- Comprehensive test coverage

## Installation

Since this is a local development package, you don't need to install it from npm. Simply:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the project

## Usage

```typescript
import { Schema } from "./src/schema";

// Create a string validator
const stringSchema = Schema.string()
  .minLength(2)
  .maxLength(10)
  .pattern(/^[a-z]+$/);

// Validate a string
const result = stringSchema.validate("hello");
if (result.isValid) {
  console.log("Valid string:", result.value);
} else {
  console.log("Validation errors:", result.errors);
}
```

### Object Validation

```typescript
import { Schema } from "./src/schema";

// Define a user schema
const userSchema = Schema.object({
  name: Schema.string().minLength(2),
  age: Schema.number().min(0).max(120),
  email: Schema.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  tags: Schema.array(Schema.string()).optional(),
});

// Validate a user object
const userData = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
  tags: ["user", "admin"],
};

const result = userSchema.validate(userData);
if (result.isValid) {
  console.log("Valid user:", result.value);
} else {
  console.log("Validation errors:", result.errors);
}
```

### Array Validation

```typescript
import { Schema } from "./src/schema";

// Create an array validator
const arraySchema = Schema.array(Schema.string()).minLength(1).maxLength(3);

// Validate an array
const result = arraySchema.validate(["a", "b", "c"]);
if (result.isValid) {
  console.log("Valid array:", result.value);
} else {
  console.log("Validation errors:", result.errors);
}
```

### Date Validator

#### Methods

- `min(date: Date)` - Sets minimum date (inclusive)
- `max(date: Date)` - Sets maximum date (inclusive)
- `optional()` - Makes the date optional
- `withMessage(message: string)` - Sets a custom error message

### Example: Date Validation

```typescript
import { Schema } from "./src/schema";

const dateSchema = Schema.date()
  .min(new Date("2024-01-01"))
  .max(new Date("2024-12-31"));

const result = dateSchema.validate("2024-06-01T12:00:00Z");
if (result.isValid) {
  console.log("Valid date:", result.value);
} else {
  console.log("Validation errors:", result.errors);
}
```

## API Reference

### Schema

The main entry point for creating validators.

#### Methods

- `string()` - Creates a string validator
- `number()` - Creates a number validator
- `boolean()` - Creates a boolean validator
- `date()` - Creates a date validator
- `array<T>(itemValidator: Validator<T>)` - Creates an array validator
- `object<T>(schema: Record<string, Validator<any>>)` - Creates an object validator

### String Validator

#### Methods

- `minLength(length: number)` - Sets minimum length
- `maxLength(length: number)` - Sets maximum length
- `pattern(pattern: RegExp)` - Sets a regex pattern
- `optional()` - Makes the string optional
- `withMessage(message: string)` - Sets a custom error message

### Number Validator

#### Methods

- `min(value: number)` - Sets minimum value
- `max(value: number)` - Sets maximum value
- `integer()` - Requires the number to be an integer
- `optional()` - Makes the number optional
- `withMessage(message: string)` - Sets a custom error message

### Boolean Validator

#### Methods

- `optional()` - Makes the boolean optional
- `withMessage(message: string)` - Sets a custom error message

### Array Validator

#### Methods

- `minLength(length: number)` - Sets minimum length
- `maxLength(length: number)` - Sets maximum length
- `optional()` - Makes the array optional
- `withMessage(message: string)` - Sets a custom error message

### Object Validator

#### Methods

- `optional()` - Makes the object optional
- `withMessage(message: string)` - Sets a custom error message

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Run tests:

   ```bash
   npm test
   ```

4. Check test coverage:
   ```bash
   npm run test:coverage
   ```

## License

ISC
