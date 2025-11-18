# Plit TTS - 한국어 음성 생성

Coqui TTS (XTTS-v2)를 사용한 한국어 음성 파일 생성기

## 사용 방법

### 1. 설치
```bash
cd /Users/jmo/Projects/plit/plit-tts
chmod +x setup.sh run.sh
./setup.sh
```

### 2. 음성 생성
```bash
./run.sh
```

생성된 파일은 `output/` 폴더에 저장됩니다.

## 파일 복사

생성된 음성을 프로토타입에 복사:
```bash
cp output/*.mp3 ../plit-prototype-web/public/audio/
```

## 구조
```
plit-tts/
├── venv/              # Python 가상환경
├── output/            # 생성된 음성 파일
├── generate_audio.py  # 메인 스크립트
├── setup.sh           # 설치 스크립트
└── run.sh             # 실행 스크립트
```

## 대본 수정

`generate_audio.py`의 `slides` 배열 수정
