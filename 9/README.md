# Service Analyzer

A console application that generates comprehensive analysis reports for services and products using OpenAI's GPT-3.5 API.

## Features

- Accepts service names (e.g., "Spotify", "Notion") or custom service descriptions
- Generates detailed markdown-formatted reports with multiple perspectives
- Includes sections for history, target audience, features, business model, and more
- Saves reports to markdown files for easy sharing and documentation

## Prerequisites

- Python 3.7 or higher
- OpenAI API key

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On Unix or MacOS:
   source .venv/bin/activate
   ```
4. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file in the project directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Usage

1. Activate the virtual environment if not already activated
2. Run the application:
   ```bash
   python service_analyzer.py
   ```
3. Enter a service name or paste a service description
4. Press Enter twice to submit your input
5. The application will generate and display the analysis report
6. The report will also be saved to `analysis_report.md` in the current directory

## Example Inputs

1. Service name:

   ```
   Spotify
   ```

2. Service description:
   ```
   A cloud-based project management tool that helps teams collaborate on tasks,
   share files, and track progress. Features include kanban boards, time tracking,
   and integration with popular development tools.
   ```

## Output Format

The generated report includes the following sections:

- Brief History
- Target Audience
- Core Features
- Unique Selling Points
- Business Model
- Tech Stack Insights
- Perceived Strengths
- Perceived Weaknesses

## Notes

- The application uses GPT-3.5-turbo model for analysis
- Reports are generated in markdown format for easy reading and sharing
- The API key is stored in the `.env` file and should not be committed to version control
