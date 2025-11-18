#!/bin/bash

echo "🔧 Plit TTS 환경 설정"
echo ""

cd "$(dirname "$0")"

if [ ! -d "venv" ]; then
    echo "📦 가상환경 생성 중..."
    python3 -m venv venv
    echo "✓ 가상환경 생성 완료"
else
    echo "✓ 가상환경 이미 존재"
fi

echo ""
echo "📥 패키지 설치 중..."
source venv/bin/activate
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo ""
echo "✅ 설정 완료!"
echo ""
echo "사용 방법:"
echo "  ./run.sh"
