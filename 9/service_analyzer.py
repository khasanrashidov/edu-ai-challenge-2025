import os
import sys
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key
API_KEY = os.getenv("OPENAI_API_KEY")
API_URL = "https://api.openai.com/v1/chat/completions"


def generate_analysis_report(input_text):
    """Generate a comprehensive analysis report using OpenAI API."""
    print(f"\nSending request to OpenAI API...")

    prompt = f"""Analyze the following service/product and generate a comprehensive markdown-formatted report. 
    If the input is a known service name (like 'Spotify' or 'Notion'), use your knowledge about that service.
    If it's a description, analyze the provided text.

    Input: {input_text}

    Generate a detailed report with the following sections:
    1. Brief History
    2. Target Audience
    3. Core Features
    4. Unique Selling Points
    5. Business Model
    6. Tech Stack Insights
    7. Perceived Strengths
    8. Perceived Weaknesses

    Format the output in clean markdown with proper headers and bullet points where appropriate.
    """

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}

    data = {
        "model": "gpt-4.1-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a professional service/product analyst. Generate detailed, well-structured analysis reports in markdown format.",
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.7,
        "max_tokens": 2000,
    }

    try:
        print("Waiting for API response...")
        response = requests.post(API_URL, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        print("Received response from API!")

        result = response.json()
        return result["choices"][0]["message"]["content"]

    except requests.exceptions.Timeout:
        return "Error: Request timed out. Please try again."
    except requests.exceptions.RequestException as e:
        print(f"Error occurred: {str(e)}")
        if hasattr(e, "response") and e.response:
            print(f"API Error details: {e.response.text}")
        return f"Error generating report: {str(e)}"


def get_user_input():
    """Get input from user with better handling for single-line vs multi-line input."""
    print("Service Analyzer - Generate comprehensive service analysis reports")
    print("\nOptions:")
    print("1. Enter a single service name (e.g., 'Spotify')")
    print("2. Enter a multi-line description")
    print("\nChoose input method:")
    print("- For single line: Just type and press Enter")
    print("- For multi-line: Type 'multi' and press Enter, then enter your text")

    first_input = input("\nYour input: ").strip()

    if first_input.lower() == "multi":
        print("\nEnter your multi-line description (press Enter twice when done):")
        lines = []
        empty_line_count = 0

        while True:
            try:
                line = input()
                if line.strip() == "":
                    empty_line_count += 1
                    if empty_line_count >= 2:  # Two consecutive empty lines to end
                        break
                else:
                    empty_line_count = 0
                    lines.append(line)
            except EOFError:
                break

        return "\n".join(lines)
    else:
        return first_input


def main():
    input_text = get_user_input()

    if not input_text.strip():
        print("No input provided. Exiting...")
        sys.exit(1)

    print(f"\nAnalyzing: {input_text}")
    print("Generating analysis report...\n")

    report = generate_analysis_report(input_text)

    print("\n=== Generated Report ===\n")
    print(report)

    # Save to file
    output_file = "analysis_report.md"
    try:
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(report)
        print(f"\nReport has been saved to {output_file}")
    except IOError as e:
        print(f"Error saving file: {e}")


if __name__ == "__main__":
    main()
