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
        "description": "Filter products based on user preferences and return matching products",
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
                "matching_products": {
                    "type": "array",
                    "description": "List of product names that match the criteria",
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

Based on the user's request, determine the appropriate filters and return the matching products using the filter_products function. Consider:
- Category preferences (Electronics, Fitness, Kitchen, Books, Clothing)
- Price constraints (maximum price)
- Rating preferences (minimum rating)
- Stock availability preferences
- Any other relevant criteria mentioned

Return only products that match ALL the specified criteria. If no specific criteria are mentioned, return products that seem most relevant to the request.
"""

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

    data = {
        "model": "gpt-4.1-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful product search assistant that uses function calling to filter products based on user preferences.",
            },
            {"role": "user", "content": prompt},
        ],
        "functions": [function_schema],
        "function_call": {"name": "filter_products"},
        "temperature": 0.3,
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

            # Find the actual product objects
            filtered_products = []
            for product in products:
                if product["name"] in matching_product_names:
                    filtered_products.append(product)

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
