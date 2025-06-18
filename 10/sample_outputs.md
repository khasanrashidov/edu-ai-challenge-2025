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
- 'I want a smartphone if it's in stock'

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
- 'I want a smartphone if it's in stock'

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
- 'I want a smartphone if it's in stock'

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
- 'I want a smartphone if it's in stock'

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

## Sample Run 5: Specific Product - Smartphone (Any Stock Status)

**User Input:**

```
I want a good smartphone with great camera
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
- 'I want a smartphone if it's in stock'

Loaded 50 products from database.

============================================================

Enter your product search request (or 'quit' to exit): I want a good smartphone with great camera

Analyzing your request: 'I want a good smartphone with great camera'
Searching products using AI...
Waiting for AI response...
AI returned: ['Smartphone']
Specific product requested: Smartphone

Filtered Products (1 found):
------------------------------------------------------------
1. Smartphone - $799.99, Rating: 4.5, Out of Stock
```

## Sample Run 6: Specific Product - Smartphone (Stock Required)

**User Input:**

```
I want a smartphone if it's in stock
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
- 'I want a smartphone if it's in stock'

Loaded 50 products from database.

============================================================

Enter your product search request (or 'quit' to exit): I want a smartphone if it's in stock

Analyzing your request: 'I want a smartphone if it's in stock'
Searching products using AI...
Waiting for AI response...
AI returned: ['Smartphone']
Specific product requested: Smartphone
In stock only: True
Safety check: Smartphone is out of stock, removing from results

No products found matching your criteria.
```

## Sample Run 7: No Results Found

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
- 'I want a smartphone if it's in stock'

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
3. **Handle Specific Products**: Distinguishes between general category requests and specific product requests
4. **Respect Stock Requirements**: Properly handles stock availability constraints with safety checks
5. **Return Structured Data**: Uses a predefined function schema to return matching product names
6. **Display Results**: The application then finds the actual product objects and displays them

### Function Schema Used:

```json
{
  "name": "filter_products",
  "description": "Filter products based on user preferences and return matching products. CRITICAL: If user asks for a specific product 'if it's in stock' and that product is out of stock, return empty array.",
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
      "specific_product": {
        "type": "string",
        "description": "If user asks for a specific product, put the product name here"
      },
      "matching_products": {
        "type": "array",
        "description": "List of product names that match the criteria. CRITICAL: If user asks for specific product 'if it's in stock' and that product is out of stock, return empty array.",
        "items": {
          "type": "string"
        }
      }
    },
    "required": ["matching_products"]
  }
}
```

### Key Features Demonstrated:

- **Debug Output**: Shows what the AI returned and the reasoning behind it
- **Specific Product Handling**: Correctly identifies when user asks for a specific product vs. general category
- **Stock Availability Logic**: When users ask for a specific product "if it's in stock", the AI correctly returns no results if that product is out of stock
- **Safety Checks**: Additional validation ensures out-of-stock products are removed when stock availability is required
- **Clear Rules**: The prompt includes explicit rules for handling different types of requests
- **Consistent Behavior**: Low temperature (0.1) ensures reliable and predictable results

### Debug Information:

The application provides debug output showing:

- `AI returned: [product_names]` - What products the AI selected
- `Specific product requested: ProductName` - When a specific product is identified
- `In stock only: True/False` - Whether stock availability is required
- `Safety check: Product is out of stock, removing from results` - When the safety check intervenes

This approach demonstrates how AI can replace traditional filtering logic with intelligent, natural language understanding while maintaining structured, reliable output and properly handling edge cases like stock availability for specific products.
