# Plit - Hackathon Development Tasks

**Product:** Plit (AI 음성 기반 하이브리드 미디어 플랫폼)
**Timeline:** 4 Days (Hackathon)
**Status:** Day 1 Complete ✅

---

## Tech Stack

**Frontend:** Next.js 15 + React 19 + Tailwind CSS 4 + TypeScript
**Backend:** Node.js 20 + Express + TypeScript + Prisma
**Database:** PostgreSQL 16 + Redis 7
**AI Services:** OpenAI TTS (HD Voice) + OpenAI GPT-4 (Script)
**Storage:** Local File System
**Package Manager:** pnpm

---

## Day 1: 핵심 검증 & 프로토타입

### AI 음성 품질 빠른 테스트
- [x] OpenAI TTS API 계정 설정
- [x] 6가지 음성 모델 빠른 테스트 (alloy, echo, fable, onyx, nova, shimmer)
- [x] 한국어 발음 품질 확인
- [x] HD vs 일반 품질 비교
- [x] 최적 음성 모델 선정

### YouTube 자막 추출 검증
- [x] yt-dlp 설치 및 테스트
- [x] 샘플 영상에서 자막 추출 테스트
- [x] 타임스탬프 정확도 검증

### GPT-4 스크립트 변환 테스트
- [x] OpenAI GPT-4 API 설정
- [x] 5분/15분/30분 버전 생성 프롬프트 작성
- [x] 샘플 변환 테스트
- [x] 변환 시간 측정

### 동기화 프로토타입
- [x] Next.js 15 프로토타입 생성
- [x] Howler.js 기본 오디오 재생
- [x] 텍스트 하이라이트 동기화 테스트
- [x] 이미지 타이밍 트리거 테스트

---

## Day 2-3: 코어 개발 ✅

### 백엔드 개발

#### 프로젝트 초기화
- [x] Node.js 20 + TypeScript 프로젝트 생성 (pnpm)
- [x] Express 서버 기본 구조
- [x] 환경 변수 설정 (.env)
- [x] Git 저장소 설정
- [x] Docker Compose (PostgreSQL + Redis)

#### 데이터베이스 (Prisma + PostgreSQL 16)
- [x] PostgreSQL 16 로컬 설치 (Docker)
- [x] Prisma 초기화
- [x] 데이터 모델 정의:
  - [x] User
  - [x] Content
  - [x] Version (5/15/30분)
  - [x] Chapter
  - [x] Segment
  - [x] Visual
- [x] 마이그레이션 실행
- [x] Seed 스크립트 (demo user)

#### AI 음성 처리 파이프라인
- [x] OpenAI TTS API 통합
- [x] tts-1-hd 모델 설정
- [x] 음성 모델 선택 기능
- [x] 스크립트 → AI 음성 변환
- [ ] 챕터별 음성 분할 저장
- [x] 로컬 스토리지 구조 설계

#### 콘텐츠 변환 서비스
- [x] YouTube URL 파싱
- [x] youtube-transcript 통합 (자막 추출)
- [x] GPT-4 스크립트 변환
  - [x] 5분 버전
  - [x] 15분 버전
  - [x] 30분 버전
- [ ] FFmpeg 통합 (프레임 추출)
- [x] 타임스탬프 메타데이터 생성
- [ ] Bull 작업 큐 설정

#### 로컬 스토리지
- [x] 디렉토리 구조 설계
- [x] 오디오 파일 저장
- [x] 이미지 파일 저장
- [x] 파일 경로 URL 생성

#### REST API
- [x] POST /api/content/create
- [x] GET /api/content/:id
- [x] GET /api/content/:id/versions
- [x] GET /api/content/:id/script
- [x] PUT /api/content/:id/script
- [x] POST /api/content/:id/generate-voice
- [x] POST /api/content/:id/publish
- [x] GET /api/content/:id/metadata

#### Redis 캐싱
- [x] Redis 7 로컬 설치 (Docker)
- [ ] 메타데이터 캐싱
- [ ] 세션 관리

### 프론트엔드 개발

#### 프로젝트 초기화 (Next.js 15 + React 19)
- [x] Next.js 15 프로젝트 생성 (pnpm)
- [x] TypeScript 설정
- [x] Tailwind CSS 4 설정
- [x] Zustand 상태 관리
- [x] Framer Motion 설치
- [x] 디렉토리 구조 설계

#### Premium UI 디자인 시스템
- [x] Tailwind CSS 4 커스텀 설정
- [x] 다크 모드 기본 설정
- [x] 프리미엄 컬러 팔레트 (보라/남색)
- [x] Typography (Pretendard/Inter, 18px+)
- [x] 부드러운 애니메이션 easing
- [ ] 재사용 컴포넌트 라이브러리

#### 오디오 플레이어
- [x] Howler.js 통합
- [x] 재생/일시정지 (대형 버튼)
- [x] 재생 속도 조절 (0.75x, 1.0x, 1.25x, 1.5x)
- [x] 10초 앞/뒤로 이동
- [x] 타임라인 스크러버
- [x] 현재/전체 시간 표시
- [ ] 백그라운드 재생
- [x] 부드러운 애니메이션 (Framer Motion)

#### 텍스트 동기화
- [x] 타임스탬프 메타데이터 파싱
- [x] 실시간 텍스트 하이라이트 (±0.3초)
- [x] 부드러운 하이라이트 애니메이션
- [x] 텍스트 자동 스크롤
- [x] 큰 폰트 (18px+)

#### 이미지 뷰어
- [x] 앨범 아트 스타일 큰 이미지
- [x] 타이밍 전환 (±0.5초)
- [ ] 이미지 확대/축소
- [x] 반응형 크기 조정
- [ ] 로컬 캐싱

#### 챕터 시스템
- [x] 챕터 목록 UI
- [x] 챕터 이동 버튼
- [x] 현재 챕터 하이라이트
- [x] 챕터 전환 애니메이션

#### 버전 선택 UI
- [x] 5분/15분/30분 선택 UI
- [x] 버전 전환 로딩
- [x] 현재 선택 버전 표시

#### 반응형 레이아웃
- [ ] 모바일 (375px ~ 428px)
- [ ] 태블릿 (768px ~ 1024px)
- [ ] 데스크톱 (1280px+)

#### 크리에이터 스튜디오
- [x] URL 입력 폼
- [x] URL 유효성 검증
- [x] 변환 시작 버튼
- [x] 로딩 상태 애니메이션 + 폴링
- [x] 3가지 버전 탭
- [x] 챕터별 스크립트 카드
- [x] 인라인 텍스트 편집
- [x] AI 음성 미리듣기
- [ ] 미니 플레이어 UI
- [x] 게시 버튼
- [x] 게시 플로우

---

## Day 4: 통합 & 데모 준비

### E2E 테스트
- [ ] YouTube URL → 게시 전체 플로우
- [ ] 3가지 버전 모두 검증
- [ ] 에러 케이스 테스트

### 버그 수정
- [ ] 동기화 버그
- [ ] UI 깨짐
- [ ] 크로스 브라우저 (Chrome, Safari)
- [ ] 모바일 브라우저 (iOS Safari, Chrome)

### 성능 최적화
- [ ] AI 음성 생성 속도
- [ ] 첫 재생 시작 시간
- [ ] 동기화 정확도
- [ ] UI 반응 속도 (60fps)

### 데모 준비
- [ ] 데모 시나리오 작성
- [ ] 샘플 콘텐츠 준비 (2-3개)
- [ ] 발표 자료 준비
- [ ] 핵심 기능 데모 연습

---

## Infrastructure & DevOps

### 개발 환경
- [ ] PostgreSQL 16 로컬 설치
- [ ] Redis 7 로컬 설치
- [x] Node.js 20 설치
- [x] pnpm 설치
- [x] FFmpeg 설치
- [ ] 로컬 스토리지 디렉토리

### 환경 변수
- [ ] DATABASE_URL
- [ ] REDIS_URL
- [ ] OPENAI_API_KEY
- [ ] LOCAL_STORAGE_PATH

---

## P1 Features (시간 남으면)

### 잠금 화면 컨트롤
- [ ] Media Session API 통합
- [ ] 잠금 화면 메타데이터
- [ ] 잠금 화면 컨트롤

### 오프라인 다운로드
- [ ] Service Worker 설정
- [ ] 오디오/이미지 캐싱
- [ ] 다운로드 UI

---

## 성능 목표

- [ ] AI 음성 생성: 10분 → 2분 이내
- [ ] 첫 재생 시작: 1초 이내
- [ ] 동기화 정확도: ±0.3초
- [ ] 이미지 로딩: 0.5초 이내
- [ ] UI 반응: 60fps

## 품질 목표

- [ ] UI/UX "와" 하는 느낌
- [ ] AI 음성 사람처럼 자연스러움
- [ ] 모든 애니메이션 부드럽고 우아함
- [ ] 디자인 일관성 및 완성도

---

**Last Updated:** 2025-11-19 (Day 2-3 Complete ✅)
