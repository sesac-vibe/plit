#!/usr/bin/env python3
from pathlib import Path
from TTS.api import TTS
import torch

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
    output_dir = Path("output")
    output_dir.mkdir(exist_ok=True)

    gpu_available = torch.cuda.is_available()
    print(f"GPU: {'✓ 사용 가능' if gpu_available else '✗ 사용 불가 (CPU 모드)'}")
    if gpu_available:
        print(f"GPU: {torch.cuda.get_device_name(0)}\n")

    print("🚀 TTS 모델 로딩 중...")
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=gpu_available)
    print("✓ 모델 로딩 완료\n")

    for slide in slides:
        print(f"🎵 [{slide['id']}/9] {slide['script']}")

        output_path = output_dir / f"slide-{slide['id']}.mp3"

        tts.tts_to_file(
            text=slide["script"],
            language="ko",
            file_path=str(output_path)
        )

        print(f"   ✓ {output_path}\n")

    print("🎉 모든 음성 파일 생성 완료!")
    print(f"📂 저장 위치: {output_dir.absolute()}")

    audio_files = sorted(output_dir.glob("slide-*.mp3"))
    total_size = sum(f.stat().st_size for f in audio_files) / 1024
    print(f"📊 총 {len(audio_files)}개 파일, {total_size:.1f} KB")

if __name__ == "__main__":
    main()
