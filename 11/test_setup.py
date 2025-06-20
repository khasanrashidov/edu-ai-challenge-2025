#!/usr/bin/env python3
"""
Test script to verify the setup and configuration of the Audio Analyzer.
Run this script to check if everything is properly configured before using the main application.
"""

import os
import sys
from dotenv import load_dotenv


def test_environment():
    """Test if the environment is properly configured"""
    print("🔍 Testing Audio Analyzer Setup...")
    print("=" * 50)

    # Test 1: Check Python version
    print("1. Checking Python version...")
    if sys.version_info >= (3, 7):
        print("   ✅ Python 3.7+ detected")
    else:
        print("   ❌ Python 3.7+ required")
        return False

    # Test 2: Check required packages
    print("\n2. Checking required packages...")
    try:
        import requests

        print("   ✅ requests package found")
    except ImportError:
        print("   ❌ requests package not found. Run: pip install -r requirements.txt")
        return False

    try:
        import dotenv

        print("   ✅ python-dotenv package found")
    except ImportError:
        print(
            "   ❌ python-dotenv package not found. Run: pip install -r requirements.txt"
        )
        return False

    # Test 3: Check .env file
    print("\n3. Checking .env file...")
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")

    if api_key:
        if api_key == "your_openai_api_key_here":
            print(
                "   ❌ Please replace 'your_openai_api_key_here' with your actual OpenAI API key"
            )
            return False
        elif len(api_key) > 20:  # Basic validation that it looks like a real key
            print("   ✅ OpenAI API key found")
        else:
            print("   ❌ OpenAI API key appears to be invalid")
            return False
    else:
        print("   ❌ OPENAI_API_KEY not found in .env file")
        print("   💡 Create a .env file with: OPENAI_API_KEY=your_actual_key")
        return False

    # Test 4: Check main script
    print("\n4. Checking main script...")
    if os.path.exists("audio_analyzer.py"):
        print("   ✅ audio_analyzer.py found")
    else:
        print("   ❌ audio_analyzer.py not found")
        return False

    print("\n" + "=" * 50)
    print("✅ All tests passed! Your setup is ready.")
    print("\n📝 Next steps:")
    print("   1. Place an audio file in this directory")
    print("   2. Run: python audio_analyzer.py your_audio_file.mp3")
    print("   3. Check the generated output files")

    return True


def main():
    """Main function"""
    success = test_environment()

    if not success:
        print(
            "\n❌ Setup issues detected. Please fix the problems above and run again."
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
