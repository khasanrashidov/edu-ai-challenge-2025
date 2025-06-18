# Service Analyzer

A powerful console application that generates comprehensive analysis reports for services and products using OpenAI's GPT-4.1-mini API. This tool helps you understand and document various aspects of any service or product through AI-powered analysis.

## 🌟 Features

- **Service Analysis**: Accepts service names (e.g., "Spotify", "Notion") or custom service descriptions
- **Comprehensive Reports**: Generates detailed markdown-formatted reports with multiple perspectives
- **Structured Output**: Includes sections for history, target audience, features, business model, and more
- **Easy Sharing**: Saves reports to markdown files for easy sharing and documentation
- **Customizable Analysis**: Get insights from different angles and perspectives
- **Flexible Input**: Supports both single-line service names and multi-line descriptions

## 📋 Prerequisites

- Python 3.12 or higher
- OpenAI API key
- Basic understanding of command line interface
- Internet connection for API access

## 🚀 Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd service-analyzer
   ```

2. Create and activate a virtual environment:

   ```bash
   # Create virtual environment
   python -m venv .venv

   # Activate on Windows
   .venv\Scripts\activate

   # Activate on Unix or MacOS
   source .venv/bin/activate
   ```

3. Install required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the project directory:
   ```bash
   # Create .env file
   echo "OPENAI_API_KEY=your_api_key_here" > .env
   ```

## 💻 Usage

1. Ensure your virtual environment is activated
2. Run the application:
   ```bash
   python service_analyzer.py
   ```
3. Choose your input method:
   - For a single service name: Just type and press Enter
   - For a detailed description: Type 'multi' and press Enter, then enter your text
4. Press Enter twice to submit multi-line input
5. Wait for the analysis to complete (typically 10-30 seconds)
6. View the generated report in the console
7. Find the saved report in `analysis_report.md`

## 📝 Example Inputs

### Single Service Name:

```
Spotify
```

### Multi-line Description:

```
A cloud-based project management tool that helps teams collaborate on tasks,
share files, and track progress. Features include kanban boards, time tracking,
and integration with popular development tools.
```

## 📊 Output Format

The generated report includes the following sections:

- **Brief History**: Origin and evolution of the service
- **Target Audience**: Primary and secondary user groups
- **Core Features**: Main functionalities and capabilities
- **Unique Selling Points**: Competitive advantages
- **Business Model**: Revenue streams and monetization strategies
- **Tech Stack Insights**: Technology infrastructure and architecture
- **Perceived Strengths**: Key advantages and positive aspects
- **Perceived Weaknesses**: Areas for improvement and challenges

## ⚙️ Configuration

- The application uses the gpt-4.1-mini model for analysis
- Reports are generated in markdown format
- API key is stored securely in the `.env` file
- Output files are saved in the current directory
- Default timeout is set to 30 seconds for API requests

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your OpenAI API key secure
- Regularly update your dependencies for security patches
- API requests are made over HTTPS

## ⚠️ Error Handling

The application handles various error scenarios:

- API timeouts
- Network connectivity issues
- Invalid API keys
- File system errors
- Invalid user input

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
