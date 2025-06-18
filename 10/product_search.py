import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key
API_KEY = os.getenv("OPENAI_API_KEY")
API_URL = "https://api.openai.com/v1/chat/completions"


def load_products():
    """Load products from the JSON file."""
    try:
        with open("products.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print("Error: products.json file not found!")
        return []
    except json.JSONDecodeError:
        print("Error: Invalid JSON in products.json file!")
        return []


def search_products(user_query, products):
    """Use OpenAI function calling to search products based on user preferences."""
    print(f"\nAnalyzing your request: '{user_query}'")
    print("Searching products using AI...")

    # Define the function schema for product filtering
    function_schema = {
        "name": "filter_products",
        "description": "Filter products based on user preferences and return matching products. CRITICAL: If user asks for a specific product 'if it's in stock' and that product is out of stock, return empty array.",
        "parameters": {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "description": "Product category filter (Electronics, Fitness, Kitchen, Books, Clothing, or null for any)",
                    "enum": [
                        "Electronics",
                        "Fitness",
                        "Kitchen",
                        "Books",
                        "Clothing",
                        None,
                    ],
                },
                "max_price": {
                    "type": "number",
                    "description": "Maximum price filter (null for no limit)",
                },
                "min_rating": {
                    "type": "number",
                    "description": "Minimum rating filter (null for no limit)",
                },
                "in_stock_only": {
                    "type": "boolean",
                    "description": "Whether to show only in-stock items (null for any stock status)",
                },
                "specific_product": {
                    "type": "string",
                    "description": "If user asks for a specific product (e.g., 'smartphone'), put the product name here. If asking for general category, leave null.",
                },
                "matching_products": {
                    "type": "array",
                    "description": "List of product names that match the criteria. CRITICAL: If user asks for specific product 'if it's in stock' and that product is out of stock, return empty array.",
                    "items": {"type": "string"},
                },
            },
            "required": ["matching_products"],
        },
    }

    # Prepare the prompt with product data
    products_data = json.dumps(products, indent=2)

    prompt = f"""You are a product search assistant. Analyze the user's request and filter products from the available dataset.

Available products:
{products_data}

User request: {user_query}

CRITICAL RULES - READ CAREFULLY:
1. If the user asks for a SPECIFIC product (like "smartphone", "laptop", "treadmill") AND mentions "if it's in stock" or similar stock requirement, ONLY return that exact product IF it is actually in stock (in_stock: true)
2. If the user asks for a specific product with stock requirement but that product is out of stock, return EMPTY array (no products)
3. If the user asks for a specific product WITHOUT mentioning stock, you can return it regardless of stock status
4. If the user asks for general categories (like "electronics", "fitness equipment"), return all matching products in that category
5. Always respect price, rating, and stock availability filters
6. If no products match the criteria, return an empty array

EXAMPLES:
- "I want a smartphone if it's in stock" → Check if smartphone exists and is in stock. If out of stock, return empty array.
- "I want a smartphone" → Return smartphone regardless of stock status
- "Show me electronics under $200" → Return all electronics under $200

Based on the user's request, determine the appropriate filters and return the matching products using the filter_products function.
"""

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

    data = {
        "model": "gpt-4.1-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful product search assistant. CRITICAL: When user asks for a specific product 'if it's in stock' and that product is out of stock, return empty array. Never return out-of-stock products when stock availability is explicitly required.",
            },
            {"role": "user", "content": prompt},
        ],
        "functions": [function_schema],
        "function_call": {"name": "filter_products"},
        "temperature": 0.1,
        "max_tokens": 1000,
    }

    try:
        print("Waiting for AI response...")
        response = requests.post(API_URL, headers=headers, json=data, timeout=30)
        response.raise_for_status()

        result = response.json()

        # Check if function was called
        if "function_call" in result["choices"][0]["message"]:
            function_args = json.loads(
                result["choices"][0]["message"]["function_call"]["arguments"]
            )
            matching_product_names = function_args.get("matching_products", [])
            specific_product = function_args.get("specific_product")
            in_stock_only = function_args.get("in_stock_only")

            # Debug: Print what the AI returned
            print(f"AI returned: {matching_product_names}")
            if specific_product:
                print(f"Specific product requested: {specific_product}")
            if in_stock_only is not None:
                print(f"In stock only: {in_stock_only}")

            # Find the actual product objects
            filtered_products = []
            for product in products:
                if product["name"] in matching_product_names:
                    filtered_products.append(product)

            # Additional safety check: If user asked for specific product with stock requirement
            if specific_product and in_stock_only:
                # Check if the specific product is actually in stock
                specific_product_obj = None
                for product in filtered_products:
                    if product["name"] == specific_product:
                        specific_product_obj = product
                        break

                if specific_product_obj and not specific_product_obj["in_stock"]:
                    print(
                        f"Safety check: {specific_product} is out of stock, removing from results"
                    )
                    filtered_products = [
                        p for p in filtered_products if p["name"] != specific_product
                    ]

            return filtered_products
        else:
            print("AI did not call the function as expected.")
            return []

    except requests.exceptions.Timeout:
        print("Error: Request timed out. Please try again.")
        return []
    except requests.exceptions.RequestException as e:
        print(f"Error occurred: {str(e)}")
        if hasattr(e, "response") and e.response:
            print(f"API Error details: {e.response.text}")
        return []
    except json.JSONDecodeError as e:
        print(f"Error parsing AI response: {str(e)}")
        return []


def display_results(products):
    """Display the filtered products in a formatted way."""
    if not products:
        print("\nNo products found matching your criteria.")
        return

    print(f"\nFiltered Products ({len(products)} found):")
    print("-" * 60)

    for i, product in enumerate(products, 1):
        stock_status = "In Stock" if product["in_stock"] else "Out of Stock"
        print(
            f"{i}. {product['name']} - ${product['price']:.2f}, Rating: {product['rating']}, {stock_status}"
        )


def main():
    """Main function to run the product search application."""
    print("=" * 60)
    print("AI-Powered Product Search Tool")
    print("=" * 60)
    print(
        "\nThis tool uses AI to understand your preferences and find matching products."
    )
    print("You can ask for products in natural language, for example:")
    print("- 'I need electronics under $200'")
    print("- 'Show me fitness equipment with high ratings'")
    print("- 'Find kitchen appliances that are in stock'")
    print("- 'I want books about programming'")
    print("- 'Clothing items under $50'")
    print("- 'I want a smartphone if it's in stock'")

    # Load products
    products = load_products()
    if not products:
        print("Failed to load products. Exiting...")
        return

    print(f"\nLoaded {len(products)} products from database.")

    while True:
        print("\n" + "=" * 60)
        user_query = input(
            "\nEnter your product search request (or 'quit' to exit): "
        ).strip()

        if user_query.lower() in ["quit", "exit", "q"]:
            print("\nThank you for using the AI Product Search Tool!")
            break

        if not user_query:
            print("Please enter a search request.")
            continue

        # Search products using AI
        filtered_products = search_products(user_query, products)

        # Display results
        display_results(filtered_products)


if __name__ == "__main__":
    main()
