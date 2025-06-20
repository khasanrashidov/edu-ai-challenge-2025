# Audio Transcription and Analysis Tool

A lightweight console application that transcribes audio files, generates summaries, and extracts meaningful insights using OpenAI's Whisper and GPT models.

## Features

- 🎵 **Audio Transcription**: Convert speech to text using OpenAI's Whisper API
- 📝 **Smart Summarization**: Generate comprehensive summaries using GPT-4.1-mini
- 📊 **Analytics Extraction**: Extract word count, speaking speed, and frequently mentioned topics
- 💾 **File Management**: Automatically save results with timestamps
- 🔒 **Secure**: Uses environment variables for API key management

## Requirements

- Python 3.7 or higher
- OpenAI API key with access to `whisper-1` and `gpt-4.1-mini` models
- Internet connection for API calls

## Installation

1. **Clone or download the project files**

2. **Install required dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your OpenAI API key**:

   Copy the example file and create your `.env` file:

   ```bash
   cp env_example.txt .env
   ```

   Then edit the `.env` file and replace `your_openai_api_key_here` with your actual OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   **Important**: Never commit your `.env` file to version control!

4. **Test your setup** (optional but recommended):
   ```bash
   python test_setup.py
   ```

## Usage

### Basic Usage

Run the application with an audio file:

```bash
python audio_analyzer.py <path_to_audio_file>
```

### Examples

```bash
# Process an MP3 file
python audio_analyzer.py sample_audio.mp3

# Process a WAV file
python audio_analyzer.py interview.wav

# Process with full path
python audio_analyzer.py /path/to/your/audio/file.m4a
```

### Supported Audio Formats

The tool supports various audio formats including:

- MP3
- WAV
- M4A
- FLAC
- And other formats supported by OpenAI's Whisper API

## Output Files

The application generates three timestamped files for each processing session:

1. **`transcription_YYYYMMDD_HHMMSS.md`** - Complete transcript with metadata
2. **`summary_YYYYMMDD_HHMMSS.md`** - Generated summary with metadata
3. **`analysis_YYYYMMDD_HHMMSS.json`** - Analytics data in JSON format

### Analytics Output Format

```json
{
  "metadata": {
    "source_file": "audio_file.mp3",
    "analyzed": "2024-01-15 14:30:25"
  },
  "analytics": {
    "word_count": 1280,
    "speaking_speed_wpm": 132,
    "frequently_mentioned_topics": [
      { "topic": "Customer Onboarding", "mentions": 6 },
      { "topic": "Q4 Roadmap", "mentions": 4 },
      { "topic": "AI Integration", "mentions": 3 }
    ]
  }
}
```

## Console Output

The application provides real-time feedback during processing:

```
============================================================
AUDIO TRANSCRIPTION AND ANALYSIS TOOL
============================================================
Transcribing audio file: sample_audio.mp3
✓ Transcription completed (2847 characters)
Generating summary...
✓ Summary generated (456 characters)
Extracting analytics...
✓ Analytics extracted
Transcription saved to: transcription_20240115_143025.md
Summary saved to: summary_20240115_143025.md
Analytics saved to: analysis_20240115_143025.json

============================================================
RESULTS
============================================================

📄 Transcription saved to: transcription_20240115_143025.md
📝 Summary saved to: summary_20240115_143025.md
📊 Analytics saved to: analysis_20240115_143025.json

📊 ANALYTICS:
   • Word Count: 428
   • Speaking Speed: 142 WPM
   • Duration: 180.5 seconds
   • Top Topics:
     - Customer Onboarding: 6 mentions
     - Q4 Roadmap: 4 mentions
     - AI Integration: 3 mentions

📝 SUMMARY PREVIEW:
----------------------------------------
This conversation covers a comprehensive discussion about...
----------------------------------------

✅ Processing completed successfully!
```

## Error Handling

The application includes comprehensive error handling for:

- Missing audio files
- Invalid API keys
- Network connectivity issues
- API rate limits
- Invalid audio formats
- JSON parsing errors

## API Usage

### OpenAI Models Used

- **Whisper-1**: For audio transcription
- **GPT-4.1-mini**: For summarization and analytics extraction

### API Endpoints

- `POST /v1/audio/transcriptions` - Audio transcription
- `POST /v1/chat/completions` - Text generation and analysis

## Troubleshooting

### Common Issues

1. **"OPENAI_API_KEY not found"**

   - Ensure your `.env` file exists and contains the correct API key
   - Check that the `.env` file is in the same directory as the script

2. **"Audio file not found"**

   - Verify the file path is correct
   - Ensure the audio file exists and is accessible

3. **"Transcription failed"**

   - Check your internet connection
   - Verify your OpenAI API key has sufficient credits
   - Ensure the audio file format is supported

4. **"Summarization failed"**
   - Check API rate limits
   - Verify your OpenAI API key has access to GPT-4.1-mini

### Getting Help

If you encounter issues:

1. Run `python test_setup.py` to verify your configuration
2. Check the console output for specific error messages
3. Verify your OpenAI API key and account status
4. Ensure all dependencies are installed correctly
5. Check that your audio file is valid and not corrupted

## Security Notes

- Never commit your `.env` file to version control
- Keep your OpenAI API key secure and private
- The application does not store or transmit your audio files beyond the OpenAI API
- All processing is done through secure HTTPS connections

## License

This project is part of the EDU AI Challenge 2025.

## Contributing

This is a challenge submission. For questions or issues, please refer to the challenge guidelines.
