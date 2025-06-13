import { Schema } from "../schema";

describe("Schema", () => {
  describe("string validator", () => {
    const stringSchema = Schema.string()
      .minLength(2)
      .maxLength(10)
      .pattern(/^[a-z]+$/);

    it("should validate a valid string", () => {
      const result = stringSchema.validate("hello");
      expect(result.isValid).toBe(true);
      expect(result.value).toBe("hello");
    });

    it("should reject a string that is too short", () => {
      const result = stringSchema.validate("a");
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("at least 2 characters");
    });

    it("should reject a string that is too long", () => {
      const result = stringSchema.validate("helloworld123");
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors?.[0].message).toContain("at most 10 characters");
      expect(result.errors?.[1].message).toContain("pattern");
    });

    it("should reject a string that does not match the pattern", () => {
      const result = stringSchema.validate("Hello123");
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("pattern");
    });
  });

  describe("number validator", () => {
    const numberSchema = Schema.number().min(0).max(100).integer();

    it("should validate a valid number", () => {
      const result = numberSchema.validate(42);
      expect(result.isValid).toBe(true);
      expect(result.value).toBe(42);
    });

    it("should reject a number that is too small", () => {
      const result = numberSchema.validate(-1);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("at least 0");
    });

    it("should reject a number that is too large", () => {
      const result = numberSchema.validate(101);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("at most 100");
    });

    it("should reject a non-integer number", () => {
      const result = numberSchema.validate(42.5);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("integer");
    });
  });

  describe("boolean validator", () => {
    const booleanSchema = Schema.boolean();

    it("should validate a valid boolean", () => {
      const result = booleanSchema.validate(true);
      expect(result.isValid).toBe(true);
      expect(result.value).toBe(true);
    });

    it("should reject a non-boolean value", () => {
      const result = booleanSchema.validate("true");
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("boolean");
    });
  });

  describe("array validator", () => {
    const arraySchema = Schema.array(Schema.string()).minLength(1).maxLength(3);

    it("should validate a valid array", () => {
      const result = arraySchema.validate(["a", "b"]);
      expect(result.isValid).toBe(true);
      expect(result.value).toEqual(["a", "b"]);
    });

    it("should reject an empty array", () => {
      const result = arraySchema.validate([]);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("at least 1 items");
    });

    it("should reject an array that is too long", () => {
      const result = arraySchema.validate(["a", "b", "c", "d"]);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("at most 3 items");
    });

    it("should reject an array with invalid items", () => {
      const result = arraySchema.validate(["a", 123, "c"]);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors?.[0].message).toContain("string");
    });
  });

  describe("object validator", () => {
    const userSchema = Schema.object({
      name: Schema.string().minLength(2),
      age: Schema.number().min(0).max(120),
      email: Schema.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      tags: Schema.array(Schema.string()).optional(),
    });

    it("should validate a valid object", () => {
      const result = userSchema.validate({
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        tags: ["user", "admin"],
      });
      expect(result.isValid).toBe(true);
      expect(result.value).toEqual({
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        tags: ["user", "admin"],
      });
    });

    it("should reject an object with invalid fields", () => {
      const result = userSchema.validate({
        name: "J",
        age: -1,
        email: "invalid-email",
        tags: [123],
      });
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(4);
    });

    it("should allow optional fields to be undefined", () => {
      const result = userSchema.validate({
        name: "John Doe",
        age: 30,
        email: "john@example.com",
      });
      expect(result.isValid).toBe(true);
      expect(result.value).toEqual({
        name: "John Doe",
        age: 30,
        email: "john@example.com",
      });
    });
  });

  describe("date validator", () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const dateSchema = Schema.date().min(yesterday).max(tomorrow);

    it("should validate a valid date object", () => {
      const result = dateSchema.validate(now);
      expect(result.isValid).toBe(true);
      expect(result.value?.toISOString()).toBe(now.toISOString());
    });

    it("should validate a valid date string", () => {
      const result = dateSchema.validate(now.toISOString());
      expect(result.isValid).toBe(true);
      expect(result.value?.toISOString()).toBe(now.toISOString());
    });

    it("should reject a date before min", () => {
      const result = dateSchema.validate(new Date(yesterday.getTime() - 1000));
      expect(result.isValid).toBe(false);
      expect(result.errors?.[0].message).toContain("on or after");
    });

    it("should reject a date after max", () => {
      const result = dateSchema.validate(new Date(tomorrow.getTime() + 1000));
      expect(result.isValid).toBe(false);
      expect(result.errors?.[0].message).toContain("on or before");
    });

    it("should reject an invalid date string", () => {
      const result = dateSchema.validate("not-a-date");
      expect(result.isValid).toBe(false);
      expect(result.errors?.[0].message).toContain("valid date");
    });

    it("should allow optional date to be undefined", () => {
      const result = Schema.date().optional().validate(undefined);
      expect(result.isValid).toBe(true);
      expect(result.value).toBeUndefined();
    });
  });
});
