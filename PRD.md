# Plit - Product Requirements Document

AI 음성 기반 하이브리드 미디어 플랫폼 (Hackathon)

---

## Executive Summary

### Product Vision
"듣고, 필요할 때만 보는" - 사람처럼 자연스러운 AI 음성 중심의 새로운 미디어 소비 경험

### Key Differentiators
- **인간 수준의 AI 음성**: 단순 TTS가 아닌 실제 사람처럼 자연스러운 음성
- 화면이 선택사항 (YouTube는 필수, Podcast는 없음)
- AI 음성 + 동기화된 시각 자료 = 높은 이해도
- 시간 적응형 (5분/15분/30분 버전)

---

## Problem Statement

### User Pain Points
| 문제 | 현재 상황 | 영향 |
|------|-----------|------|
| **시간 부족** | 40분 영상을 볼 시간이 없음 | 콘텐츠 소비 포기 |
| **멀티태스킹 불가** | 영상은 화면을 계속 봐야 함 | 운전/운동 중 시청 불가 |
| **오디오만의 한계** | 팟캐스트는 시각 자료 없어 이해도 낮음 | 기술/교육 콘텐츠 소비 어려움 |
| **로봇 같은 TTS** | 기존 TTS는 기계적이고 듣기 불편함 | 장시간 청취 피로 |

---

## Core Features (Hackathon MVP)

### P0 Features (Must Have)

#### F1. 인간 수준 AI 음성 재생
**Requirements**:
- AI 음성 엔진: OpenAI TTS (HD 품질)
- 음성 속도 조절: 0.75x, 1.0x, 1.25x, 1.5x
- 백그라운드 재생 지원
- 챕터 시스템 (최소 3개 챕터)
- 재생 컨트롤: 재생/일시정지, 10초 앞/뒤로

**Acceptance Criteria**:
- [ ] 음성이 사람처럼 자연스럽게 재생됨
- [ ] 감정과 억양이 문맥에 맞게 표현됨
- [ ] 백그라운드로 전환해도 재생 계속됨
- [ ] 속도 변경 즉시 적용
- [ ] 챕터 간 전환 1초 이내

#### F2. 동기화된 시각 자료 표시
**Requirements**:
- 현재 읽는 텍스트 하이라이트 (부드러운 애니메이션)
- 적절한 타이밍에 이미지 자동 표시
- 이미지 확대/축소 가능
- 화면 꺼도 음성 계속 재생

**Acceptance Criteria**:
- [ ] 텍스트 하이라이트 음성과 0.3초 이내 동기화
- [ ] 이미지 지정 타이밍(±0.5초)에 부드럽게 표시
- [ ] 화면 잠금 상태에서도 음성 재생 유지

#### F3. 시간 적응형 버전
**Requirements**:
- 3가지 버전: 5분 / 15분 / 30분
- 각 버전 독립적인 AI 음성 스크립트
- 버전 선택 UI (우아하고 직관적)

**Acceptance Criteria**:
- [ ] 각 버전 실제 재생 시간 ±10% 이내
- [ ] 버전 전환 3초 이내 재생 시작
- [ ] 짧은 버전에도 핵심 내용 포함

#### F4. 크리에이터 스튜디오
**Requirements**:
- YouTube URL 입력
- AI 자동 스크립트 변환
- 3가지 시간 버전 자동 생성
- AI 음성 미리듣기
- 간단한 스크립트 텍스트 수정
- 게시 기능

**Acceptance Criteria**:
- [ ] YouTube URL 입력 후 5분 이내 변환 완료
- [ ] 생성된 스크립트 품질 확보
- [ ] 텍스트 수정 후 AI 음성 재생성 가능

#### F5. Premium 플레이어 UI
**Requirements**:
- 미니멀하고 현대적인 디자인
- 부드러운 애니메이션과 전환
- 재생/일시정지 버튼 (대형, 직관적)
- 타임라인 (현재 위치, 전체 길이)
- 챕터 표시 및 이동
- 속도 조절
- 현재 텍스트 표시 영역 (큰 폰트)
- 이미지 표시 영역
- 다크 모드 기본

**Acceptance Criteria**:
- [ ] 모든 컨트롤 0.5초 이내 반응
- [ ] 텍스트 크기 최소 18px
- [ ] 이미지 화면 크기에 맞게 자동 조정
- [ ] UI "와" 하는 느낌

### P1 Features (If Time Permits)

#### F6. 잠금 화면 컨트롤
- 잠금 화면에서 재생/일시정지
- 챕터 이동
- 진행 상황 표시

#### F7. 오프라인 다운로드
- 오디오 + 이미지 사전 다운로드
- 오프라인 재생

---

## Technical Requirements

### System Architecture

```
[Client Layer]
└── Web App (Next.js 15 + React 19)

[API Layer]
├── REST API (Node.js/Express)
└── WebSocket (실시간 동기화)

[Service Layer]
├── AI Voice Service (OpenAI TTS HD)
├── Content Processing
│   ├── YouTube 자막 추출 (yt-dlp)
│   ├── AI 스크립트 변환 (GPT-4)
│   └── 시간별 버전 생성
└── Sync Engine (Audio-Visual 타이밍 관리)

[Data Layer]
├── PostgreSQL 16 (메타데이터)
├── Redis 7 (캐싱, 세션)
└── Local Storage (오디오, 이미지)
```

### AI Voice 처리 Flow

```
1. YouTube URL 입력
2. 자막 추출 (yt-dlp)
3. AI 스크립트 변환
   - GPT-4로 "듣기 좋은" 스크립트 재작성
   - 5/15/30분 버전 생성
4. 시각 자료 추출 및 타이밍 설정 (FFmpeg)
5. AI 음성 생성 (OpenAI TTS HD)
6. 타임스탬프 메타데이터 생성
7. 로컬 스토리지 저장
```

### Player Sync Logic

```typescript
interface SyncEngine {
  currentTime: number
  playbackRate: number
  segments: Segment[]
  visuals: Visual[]

  onTimeUpdate(time: number): void
  getCurrentSegment(): Segment | null
  getActiveVisuals(): Visual[]
}
```

### Performance Requirements

| Metric | Target |
|--------|--------|
| AI 음성 생성 | 10분 콘텐츠 → 2분 이내 |
| 첫 재생 시작 | 1초 이내 |
| 동기화 정확도 | ±0.3초 |
| 이미지 로딩 | 0.5초 이내 |
| UI 반응 | 60fps |

### Tech Stack

**Frontend**:
- Next.js 15 + React 19
- TypeScript
- Tailwind CSS 4
- Zustand (상태 관리)
- Howler.js (오디오 재생)
- Framer Motion (애니메이션)

**Backend**:
- Node.js 20 + Express
- TypeScript
- Prisma (ORM)
- Bull (작업 큐)

**AI/ML**:
- OpenAI GPT-4 (스크립트 변환)
- OpenAI TTS (HD 음성 생성)

**Infrastructure**:
- PostgreSQL 16
- Redis 7
- 로컬 파일 스토리지

---

## Design Requirements

### Design Principles

1. **Premium Quality**: 모든 요소가 "와" 하는 느낌
2. **Minimal & Clean**: 콘텐츠 집중 최소 UI
3. **Smooth & Fluid**: 부드럽고 자연스러운 애니메이션
4. **Dark First**: 다크 모드 기본
5. **Gesture Friendly**: 직관적인 제스처

### Visual Identity

**Color Palette**:
- Primary: 세련된 보라/남색 계열
- Background (Dark): #0a0a0a ~ #1a1a1a
- Text: 높은 대비 (#ffffff, #e0e0e0)
- Accent: 생동감 있는 포인트 컬러

**Typography**:
- 본문: Pretendard, Inter
- 최소 크기: 18px (모바일)
- 행간: 1.6 ~ 1.8

**Animations**:
- 부드러운 easing (cubic-bezier)
- Duration: 150ms ~ 300ms
- 의미 있는 모션만

### Key Screens

#### Screen 1: 플레이어
```
┌─────────────────────────────────┐
│                                 │
│         [Album Art]             │
│                                 │
├─────────────────────────────────┤
│  Chapter 2/3: 핵심 개념           │
│                                 │
│  쿠버네티스는 컨테이너             │
│  오케스트레이션 플랫폼입니다        │
│                                 │
├─────────────────────────────────┤
│  ─────────●─────────            │
│  5:23                    15:00  │
│                                 │
│     ⏮    ⏸    ⏭               │
│                                 │
│  [  15분  ]  1.0x  [다운로드]    │
└─────────────────────────────────┘
```

#### Screen 2: 크리에이터 스튜디오
```
┌─────────────────────────────────┐
│  새 콘텐츠 만들기                  │
│                                 │
│  YouTube URL                    │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  └───────────────────────────┘  │
│         [ 변환 시작 ]            │
├─────────────────────────────────┤
│                                 │
│  📝 생성된 스크립트                │
│                                 │
│  ┌─ 5분 버전 ─────────────┐     │
│  │ [섹션 1] 소개            │     │
│  │ [🔊 재생] [✏️ 수정]      │     │
│  └─────────────────────────┘     │
│                                 │
│  ┌─ 15분 버전 ────────────┐     │
│  │ ...                    │     │
│  └─────────────────────────┘     │
│                                 │
│         [ 게시하기 ]             │
└─────────────────────────────────┘
```

### Responsive Design

- **Mobile First**: 375px ~ 428px
- **Tablet**: 768px ~ 1024px
- **Desktop**: 1280px+

---

## Development Timeline (Hackathon)

### Phase 1: 핵심 검증 (Day 1)
- OpenAI TTS 음성 품질 빠른 테스트
- YouTube 자막 추출 검증
- GPT-4 스크립트 변환 테스트
- 동기화 프로토타입

### Phase 2: 코어 개발 (Day 2-3)

**백엔드**:
- API 서버 구축
- AI 음성 처리 파이프라인
- 콘텐츠 변환 서비스
- 데이터베이스 스키마

**프론트엔드**:
- Premium 플레이어 UI
- 오디오 플레이어 통합
- 텍스트/이미지 동기화
- 크리에이터 스튜디오

### Phase 3: 통합 & 데모 준비 (Day 4)
- E2E 테스트
- 버그 수정
- 데모 시나리오 준비
- 발표 자료 준비

---

## Out of Scope

- 사용자 테스트
- 베타 런칭
- 피드백 수집
- 분석 도구
- 커뮤니티 기능
- 수익화
- TV/CarPlay
- iOS/Android 네이티브 앱
