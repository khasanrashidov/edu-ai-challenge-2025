import os
import json
import time
import requests
from datetime import datetime
from dotenv import load_dotenv
import re


class AudioAnalyzer:
    def __init__(self):
        load_dotenv()
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        if not self.openai_api_key:
            raise ValueError("OPENAI_API_KEY not found in environment variables")

        self.base_url = "https://api.openai.com/v1"
        self.headers = {
            "Authorization": f"Bearer {self.openai_api_key}",
            "Content-Type": "application/json",
        }

    def transcribe_audio(self, audio_file_path):
        """Transcribe audio using OpenAI Whisper API"""
        print(f"Transcribing audio file: {audio_file_path}")

        # Check if file exists
        if not os.path.exists(audio_file_path):
            raise FileNotFoundError(f"Audio file not found: {audio_file_path}")

        # Prepare the file for upload
        with open(audio_file_path, "rb") as audio_file:
            files = {
                "file": (os.path.basename(audio_file_path), audio_file, "audio/mpeg")
            }
            data = {"model": "whisper-1", "response_format": "verbose_json"}

            headers = {"Authorization": f"Bearer {self.openai_api_key}"}

            response = requests.post(
                f"{self.base_url}/audio/transcriptions",
                headers=headers,
                files=files,
                data=data,
            )

        if response.status_code != 200:
            raise Exception(
                f"Transcription failed: {response.status_code} - {response.text}"
            )

        result = response.json()
        return result["text"], result.get("duration", 0)

    def improve_transcript(self, transcript):
        """Improve transcript quality using GPT-4.1-mini"""
        print("Improving transcript quality...")

        prompt = f"""
        Please analyze and improve the following transcript. Fix any issues while preserving the original meaning and content:

        Issues to address:
        1. Fix punctuation, capitalization, and grammar
        2. Improve sentence structure and clarity
        3. Correct any obvious transcription errors
        4. Add proper paragraph breaks for different speakers or topics
        5. Maintain the original tone and style
        6. Preserve technical terms and proper nouns accurately
        7. Fix any incomplete sentences or unclear phrases

        Original transcript:
        {transcript}

        Improved transcript:
        """

        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self.headers,
            json={
                "model": "gpt-4.1-mini",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a professional transcription editor. Your task is to improve the quality of transcripts by fixing punctuation, grammar, and clarity while preserving the original meaning and content. Return only the improved transcript without any additional commentary.",
                    },
                    {"role": "user", "content": prompt},
                ],
                "max_tokens": 4000,
                "temperature": 0.1,
            },
        )

        if response.status_code != 200:
            raise Exception(
                f"Transcript improvement failed: {response.status_code} - {response.text}"
            )

        result = response.json()
        improved_transcript = result["choices"][0]["message"]["content"].strip()

        # Remove any potential markdown formatting that might have been added
        improved_transcript = re.sub(r"^```\w*\n", "", improved_transcript)
        improved_transcript = re.sub(r"\n```$", "", improved_transcript)

        return improved_transcript

    def summarize_transcript(self, transcript):
        """Summarize transcript using GPT-4.1-mini"""
        print("Generating summary...")

        prompt = f"""
        Please provide a comprehensive summary of the following transcript. 
        Focus on the main points, key insights, and important details.
        Make the summary clear, well-structured, and informative.
        
        Transcript:
        {transcript}
        
        Summary:
        """

        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self.headers,
            json={
                "model": "gpt-4.1-mini",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a professional summarizer. Create clear, concise, and comprehensive summaries that capture the essence and key points of the content.",
                    },
                    {"role": "user", "content": prompt},
                ],
                "max_tokens": 1000,
                "temperature": 0.3,
            },
        )

        if response.status_code != 200:
            raise Exception(
                f"Summarization failed: {response.status_code} - {response.text}"
            )

        result = response.json()
        return result["choices"][0]["message"]["content"].strip()

    def analyze_transcript(self, transcript, duration_seconds):
        """Extract analytics from transcript using GPT-4.1-mini"""
        print("Extracting analytics...")

        # Calculate word count using a more robust method
        def count_words(text):
            """Count words more accurately and consistently"""
            # Remove extra whitespace and normalize
            text = re.sub(r"\s+", " ", text.strip())

            # Split by whitespace and filter out empty strings
            words = [word for word in text.split() if word.strip()]

            # Additional filtering to remove common non-words
            filtered_words = []
            for word in words:
                # Remove punctuation from word boundaries
                clean_word = re.sub(r"^[^\w]+|[^\w]+$", "", word)
                # Only count if it contains at least one letter or number
                if re.search(r"[a-zA-Z0-9]", clean_word):
                    filtered_words.append(clean_word)

            return len(filtered_words), filtered_words

        word_count, word_list = count_words(transcript)

        # Debug: Show word count details (first 20 words as sample)
        print(f"   📊 Word count calculation:")
        print(f"      • Total words found: {word_count}")
        if word_count > 0:
            sample_words = word_list[:20]
            print(f"      • Sample words: {', '.join(sample_words)}")
            if len(word_list) > 20:
                print(f"      • ... and {len(word_list) - 20} more words")

        # Calculate speaking speed (WPM)
        speaking_speed_wpm = (
            int(word_count / (duration_seconds / 60)) if duration_seconds > 0 else 0
        )

        # Extract frequently mentioned topics
        topics_prompt = f"""
        Analyze the following transcript and extract the top 3-5 most frequently mentioned topics or themes.
        Return the results as a JSON array with objects containing "topic" and "mentions" fields.
        Only include topics that are mentioned at least 2 times.
        
        Transcript:
        {transcript}
        
        Return only valid JSON in this exact format:
        [
            {{"topic": "Topic Name", "mentions": number}},
            {{"topic": "Another Topic", "mentions": number}}
        ]
        """

        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self.headers,
            json={
                "model": "gpt-4.1-mini",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a data analyst. Extract structured information and return only valid JSON.",
                    },
                    {"role": "user", "content": topics_prompt},
                ],
                "max_tokens": 500,
                "temperature": 0.1,
            },
        )

        if response.status_code != 200:
            raise Exception(
                f"Analytics extraction failed: {response.status_code} - {response.text}"
            )

        result = response.json()
        topics_text = result["choices"][0]["message"]["content"].strip()

        # Parse the JSON response
        try:
            # Extract JSON from the response (in case there's extra text)
            json_match = re.search(r"\[.*\]", topics_text, re.DOTALL)
            if json_match:
                frequently_mentioned_topics = json.loads(json_match.group())
            else:
                frequently_mentioned_topics = []
        except json.JSONDecodeError:
            print("Warning: Could not parse topics JSON, using empty list")
            frequently_mentioned_topics = []

        analytics = {
            "word_count": word_count,
            "speaking_speed_wpm": speaking_speed_wpm,
            "frequently_mentioned_topics": frequently_mentioned_topics,
        }

        return analytics

    def save_transcription(self, transcript, audio_file_path):
        """Save transcription to a timestamped file"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"transcription_{timestamp}.md"

        with open(filename, "w", encoding="utf-8") as f:
            f.write(f"# Audio Transcription\n\n")
            f.write(f"**Source File:** {os.path.basename(audio_file_path)}\n")
            f.write(
                f"**Transcribed:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
            )
            f.write("## Transcript\n\n")
            f.write(transcript)

        print(f"Transcription saved to: {filename}")
        return filename

    def save_summary(self, summary, audio_file_path):
        """Save summary to a file"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"summary_{timestamp}.md"

        with open(filename, "w", encoding="utf-8") as f:
            f.write(f"# Audio Summary\n\n")
            f.write(f"**Source File:** {os.path.basename(audio_file_path)}\n")
            f.write(
                f"**Summarized:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
            )
            f.write("## Summary\n\n")
            f.write(summary)

        print(f"Summary saved to: {filename}")
        return filename

    def save_analytics(self, analytics, audio_file_path):
        """Save analytics to a JSON file"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"analysis_{timestamp}.json"

        analytics_with_metadata = {
            "metadata": {
                "source_file": os.path.basename(audio_file_path),
                "analyzed": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            },
            "analytics": analytics,
        }

        with open(filename, "w", encoding="utf-8") as f:
            json.dump(analytics_with_metadata, f, indent=2, ensure_ascii=False)

        print(f"Analytics saved to: {filename}")
        return filename

    def process_audio(self, audio_file_path):
        """Main method to process audio file"""
        try:
            print("=" * 60)
            print("AUDIO TRANSCRIPTION AND ANALYSIS TOOL")
            print("=" * 60)

            # Step 1: Transcribe audio
            raw_transcript, duration = self.transcribe_audio(audio_file_path)
            print(f"✓ Raw transcription completed ({len(raw_transcript)} characters)")

            # Step 2: Improve transcript quality
            improved_transcript = self.improve_transcript(raw_transcript)
            print(
                f"✓ Transcript quality improved ({len(improved_transcript)} characters)"
            )

            # Step 3: Generate summary
            summary = self.summarize_transcript(improved_transcript)
            print(f"✓ Summary generated ({len(summary)} characters)")

            # Step 4: Extract analytics
            analytics = self.analyze_transcript(improved_transcript, duration)
            print(f"✓ Analytics extracted")

            # Step 5: Save results
            transcription_file = self.save_transcription(
                improved_transcript, audio_file_path
            )
            summary_file = self.save_summary(summary, audio_file_path)
            analytics_file = self.save_analytics(analytics, audio_file_path)

            # Step 6: Display results
            print("\n" + "=" * 60)
            print("RESULTS")
            print("=" * 60)

            print(f"\n📄 Transcription saved to: {transcription_file}")
            print(f"📝 Summary saved to: {summary_file}")
            print(f"📊 Analytics saved to: {analytics_file}")

            print(f"\n📊 ANALYTICS:")
            print(f"   • Word Count: {analytics['word_count']}")
            print(f"   • Speaking Speed: {analytics['speaking_speed_wpm']} WPM")
            print(f"   • Duration: {duration:.1f} seconds")

            if analytics["frequently_mentioned_topics"]:
                print(f"   • Top Topics:")
                for topic in analytics["frequently_mentioned_topics"]:
                    print(f"     - {topic['topic']}: {topic['mentions']} mentions")

            print(f"\n�� SUMMARY PREVIEW:")
            print("-" * 40)
            print(summary[:300] + "..." if len(summary) > 300 else summary)
            print("-" * 40)

            # Show improvement comparison if there are significant differences
            if len(improved_transcript) != len(raw_transcript):
                print(f"\n🔧 TRANSCRIPT IMPROVEMENT:")
                print(f"   • Original length: {len(raw_transcript)} characters")
                print(f"   • Improved length: {len(improved_transcript)} characters")
                print(
                    f"   • Changes: {abs(len(improved_transcript) - len(raw_transcript))} characters"
                )

            return {
                "raw_transcript": raw_transcript,
                "improved_transcript": improved_transcript,
                "summary": summary,
                "analytics": analytics,
                "files": {
                    "transcription": transcription_file,
                    "summary": summary_file,
                    "analytics": analytics_file,
                },
            }

        except Exception as e:
            print(f"❌ Error processing audio: {str(e)}")
            raise


def main():
    """Main function to run the application"""
    import sys

    if len(sys.argv) != 2:
        print("Usage: python audio_analyzer.py <audio_file_path>")
        print("Example: python audio_analyzer.py sample_audio.mp3")
        sys.exit(1)

    audio_file_path = sys.argv[1]

    try:
        analyzer = AudioAnalyzer()
        results = analyzer.process_audio(audio_file_path)
        print("\n✅ Processing completed successfully!")

    except Exception as e:
        print(f"\n❌ Failed to process audio: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
