#!/bin/bash

echo "🔧 Setting up Coqui TTS for Korean..."

# Python 가상환경 생성
python3 -m venv venv
source venv/bin/activate

# Coqui TTS 설치
pip install TTS

echo "✅ Setup complete!"
echo ""
echo "📝 To generate audio files:"
echo "   source venv/bin/activate"
echo "   python3 scripts/generate-audio-coqui.py"
