# AI-Powered Product Search Tool

This is a console-based product search application that uses OpenAI's function calling capabilities to filter products based on natural language user preferences. Instead of manual filtering logic, the AI model analyzes user requests and returns matching products using structured function calls.

## Features

- **Natural Language Processing**: Accept user preferences in natural language (e.g., "I need electronics under $200")
- **AI-Powered Filtering**: Uses OpenAI's function calling to intelligently filter products
- **Multiple Criteria Support**: Filter by category, price, rating, and stock availability
- **Structured Output**: Returns filtered products in a clear, formatted display
- **Interactive Console Interface**: Easy-to-use command-line interface

## Prerequisites

- Python 3.7 or higher
- OpenAI API key with access to `gpt-4.1-mini` model
- Internet connection for API calls

## Installation

1. **Clone or download the project files** to your local machine

2. **Install required dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your OpenAI API key**:
   - Create a `.env` file in the project directory
   - Add your OpenAI API key to the file:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
   - **Important**: Never commit your `.env` file to version control

## How to Run

1. **Navigate to the project directory**:

   ```bash
   cd 10
   ```

2. **Run the application**:

   ```bash
   python product_search.py
   ```

3. **Enter your search requests** in natural language when prompted

4. **Exit the application** by typing `quit`, `exit`, or `q`

## Usage Examples

The application accepts natural language queries. Here are some examples:

### Category-based searches:

- "Show me electronics"
- "I want fitness equipment"
- "Find kitchen appliances"
- "Books about programming"
- "Clothing items"

### Price-based searches:

- "Electronics under $200"
- "Products under $50"
- "Expensive fitness equipment"
- "Budget-friendly kitchen items"

### Rating-based searches:

- "High-rated electronics"
- "Products with 4.5+ rating"
- "Best-rated fitness equipment"

### Stock-based searches:

- "Electronics in stock"
- "Available kitchen appliances"
- "Products that are in stock"

### Combined criteria:

- "Electronics under $300 with high ratings"
- "Fitness equipment under $100 that's in stock"
- "Kitchen appliances with 4.5+ rating under $200"

## How It Works

1. **Data Loading**: The application loads product data from `products.json`

2. **User Input**: Accepts natural language queries from the user

3. **AI Processing**: Sends the query and product data to OpenAI API using function calling

4. **Function Calling**: The AI model analyzes the request and calls a predefined function with structured arguments

5. **Product Filtering**: The function returns matching product names based on the criteria

6. **Result Display**: Shows filtered products with details (name, price, rating, stock status)

## File Structure

```
10/
├── product_search.py      # Main application file
├── products.json          # Product database
├── requirements.txt       # Python dependencies
├── README.md             # This file
└── sample_outputs.md     # Example outputs
```

## API Requirements

- **Model**: `gpt-4.1-mini` (compatible with your API key)
- **Function Calling**: Uses OpenAI's function calling feature
- **Rate Limits**: Respects OpenAI API rate limits
- **Error Handling**: Includes timeout and error handling

## Troubleshooting

### Common Issues:

1. **API Key Error**:

   - Ensure your `.env` file contains the correct API key
   - Verify the API key has access to `gpt-4.1-mini`

2. **File Not Found**:

   - Make sure `products.json` is in the same directory as `product_search.py`

3. **Network Issues**:

   - Check your internet connection
   - Verify OpenAI API is accessible

4. **Import Errors**:
   - Run `pip install -r requirements.txt` to install dependencies

### Error Messages:

- **"API Error details"**: Check your API key and internet connection
- **"Request timed out"**: Try again, the API might be busy
- **"No products found"**: Try different search criteria

## Technical Details

### Function Schema

The application defines a function schema for product filtering with parameters:

- `category`: Product category filter
- `max_price`: Maximum price limit
- `min_rating`: Minimum rating requirement
- `in_stock_only`: Stock availability filter
- `matching_products`: Array of matching product names

### AI Model Configuration

- **Model**: `gpt-4.1-mini`
- **Temperature**: 0.3 (for consistent results)
- **Max Tokens**: 1000
- **Function Call**: Forced to use the filter_products function

## Security Notes

- API keys are stored in `.env` file (not in code)
- Never commit `.env` files to version control
- The application only sends product data and user queries to OpenAI
- No sensitive user data is stored or transmitted

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify your OpenAI API key and model access
3. Ensure all dependencies are installed correctly
4. Check that all files are in the correct directory structure
