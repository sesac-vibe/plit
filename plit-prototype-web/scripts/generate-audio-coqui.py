#!/usr/bin/env python3
import os
from pathlib import Path
from TTS.api import TTS

slides = [
    {"id": 1, "script": "온라인 강의 완강률, 겨우 15%예요"},
    {"id": 2, "script": "왜 그럴까요?"},
    {"id": 3, "script": "바쁜데, 화면 계속 봐야하잖아요"},
    {"id": 4, "script": "멀티태스킹? 당연히 안되고요"},
    {"id": 5, "script": "Plit은, 다르게 접근했어요"},
    {"id": 6, "script": "듣다가, 필요할 때만 보면 돼요"},
    {"id": 7, "script": "진짜 사람처럼, 자연스러운 AI 음성으로요"},
    {"id": 8, "script": "운전하면서, 운동하면서"},
    {"id": 9, "script": "어디서든, 들을 수 있어요"},
]

def main():
    audio_dir = Path("public/audio")
    audio_dir.mkdir(parents=True, exist_ok=True)

    print("🚀 Initializing Coqui TTS (XTTS-v2) for Korean...")
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=True)

    for slide in slides:
        print(f"🎵 Generating audio for slide {slide['id']}...")

        output_path = audio_dir / f"slide-{slide['id']}.mp3"

        tts.tts_to_file(
            text=slide["script"],
            language="ko",
            file_path=str(output_path)
        )

        print(f"✓ Slide {slide['id']} audio saved")

    print("\n🎉 All audio files generated successfully!")

if __name__ == "__main__":
    main()
