# Sample Outputs

This document contains example runs of the AI-Powered Product Search Tool demonstrating different user requests and their corresponding outputs.

## Sample Run 1: Electronics Under $200

**User Input:**

```
I need electronics under $200
```

**Expected Output:**

```
============================================================
AI-Powered Product Search Tool
============================================================

This tool uses AI to understand your preferences and find matching products.
You can ask for products in natural language, for example:
- 'I need electronics under $200'
- 'Show me fitness equipment with high ratings'
- 'Find kitchen appliances that are in stock'
- 'I want books about programming'
- 'Clothing items under $50'

Loaded 50 products from database.

============================================================

Enter your product search request (or 'quit' to exit): I need electronics under $200

Analyzing your request: 'I need electronics under $200'
Searching products using AI...
Waiting for AI response...

Filtered Products (8 found):
------------------------------------------------------------
1. Wireless Headphones - $99.99, Rating: 4.5, In Stock
2. Smart Watch - $199.99, Rating: 4.6, In Stock
3. Bluetooth Speaker - $49.99, Rating: 4.4, In Stock
4. Gaming Mouse - $59.99, Rating: 4.3, In Stock
5. External Hard Drive - $89.99, Rating: 4.4, In Stock
6. Portable Charger - $29.99, Rating: 4.2, In Stock
```

## Sample Run 2: High-Rated Fitness Equipment

**User Input:**

```
Show me fitness equipment with high ratings
```

**Expected Output:**

```
============================================================
AI-Powered Product Search Tool
============================================================

This tool uses AI to understand your preferences and find matching products.
You can ask for products in natural language, for example:
- 'I need electronics under $200'
- 'Show me fitness equipment with high ratings'
- 'Find kitchen appliances that are in stock'
- 'I want books about programming'
- 'Clothing items under $50'

Loaded 50 products from database.

============================================================

Enter your product search request (or 'quit' to exit): Show me fitness equipment with high ratings

Analyzing your request: 'Show me fitness equipment with high ratings'
Searching products using AI...
Waiting for AI response...

Filtered Products (4 found):
------------------------------------------------------------
1. Dumbbell Set - $149.99, Rating: 4.7, In Stock
2. Exercise Bike - $499.99, Rating: 4.5, In Stock
3. Foam Roller - $24.99, Rating: 4.5, In Stock
4. Pull-up Bar - $59.99, Rating: 4.4, In Stock
```

## Sample Run 3: Kitchen Appliances Under $100 in Stock

**User Input:**

```
Find kitchen appliances under $100 that are in stock
```

**Expected Output:**

```
============================================================
AI-Powered Product Search Tool
============================================================

This tool uses AI to understand your preferences and find matching products.
You can ask for products in natural language, for example:
- 'I need electronics under $200'
- 'Show me fitness equipment with high ratings'
- 'Find kitchen appliances that are in stock'
- 'I want books about programming'
- 'Clothing items under $50'

Loaded 50 products from database.

============================================================

Enter your product search request (or 'quit' to exit): Find kitchen appliances under $100 that are in stock

Analyzing your request: 'Find kitchen appliances under $100 that are in stock'
Searching products using AI...
Waiting for AI response...

Filtered Products (6 found):
------------------------------------------------------------
1. Blender - $49.99, Rating: 4.2, In Stock
2. Air Fryer - $89.99, Rating: 4.6, In Stock
3. Coffee Maker - $79.99, Rating: 4.3, In Stock
4. Toaster - $29.99, Rating: 4.1, In Stock
5. Electric Kettle - $39.99, Rating: 4.4, In Stock
6. Rice Cooker - $59.99, Rating: 4.3, In Stock
```

## Sample Run 4: Programming Books

**User Input:**

```
I want books about programming
```

**Expected Output:**

```
============================================================
AI-Powered Product Search Tool
============================================================

This tool uses AI to understand your preferences and find matching products.
You can ask for products in natural language, for example:
- 'I need electronics under $200'
- 'Show me fitness equipment with high ratings'
- 'Find kitchen appliances that are in stock'
- 'I want books about programming'
- 'Clothing items under $50'

Loaded 50 products from database.

============================================================

Enter your product search request (or 'quit' to exit): I want books about programming

Analyzing your request: 'I want books about programming'
Searching products using AI...
Waiting for AI response...

Filtered Products (1 found):
------------------------------------------------------------
1. Programming Guide - $49.99, Rating: 4.7, In Stock
```

## Sample Run 5: No Results Found

**User Input:**

```
Find electronics under $10
```

**Expected Output:**

```
============================================================
AI-Powered Product Search Tool
============================================================

This tool uses AI to understand your preferences and find matching products.
You can ask for products in natural language, for example:
- 'I need electronics under $200'
- 'Show me fitness equipment with high ratings'
- 'Find kitchen appliances that are in stock'
- 'I want books about programming'
- 'Clothing items under $50'

Loaded 50 products from database.

============================================================

Enter your product search request (or 'quit' to exit): Find electronics under $10

Analyzing your request: 'Find electronics under $10'
Searching products using AI...
Waiting for AI response...

No products found matching your criteria.
```

## Notes on AI Function Calling

The application uses OpenAI's function calling feature to:

1. **Analyze Natural Language**: The AI model understands user intent from natural language queries
2. **Apply Filters**: Determines appropriate filtering criteria (category, price, rating, stock)
3. **Return Structured Data**: Uses a predefined function schema to return matching product names
4. **Display Results**: The application then finds the actual product objects and displays them

### Function Schema Used:

```json
{
  "name": "filter_products",
  "description": "Filter products based on user preferences and return matching products",
  "parameters": {
    "type": "object",
    "properties": {
      "category": {
        "type": "string",
        "description": "Product category filter",
        "enum": ["Electronics", "Fitness", "Kitchen", "Books", "Clothing", null]
      },
      "max_price": {
        "type": "number",
        "description": "Maximum price filter"
      },
      "min_rating": {
        "type": "number",
        "description": "Minimum rating filter"
      },
      "in_stock_only": {
        "type": "boolean",
        "description": "Whether to show only in-stock items"
      },
      "matching_products": {
        "type": "array",
        "description": "List of product names that match the criteria",
        "items": {
          "type": "string"
        }
      }
    },
    "required": ["matching_products"]
  }
}
```

This approach demonstrates how AI can replace traditional filtering logic with intelligent, natural language understanding while maintaining structured, reliable output.
