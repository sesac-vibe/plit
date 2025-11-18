# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Plit** is an AI voice-based hybrid media platform that delivers premium audio experiences. Users consume content through human-like AI voices while optionally viewing synchronized visual materials. The platform converts YouTube videos into three time-adaptive versions (5/15/30 minutes) with perfectly synced text and images.

## Development Principles

### Task Management
- ALWAYS check and update TASKS.md when working on any feature
- Mark tasks as complete in TASKS.md as you finish them
- Keep TASKS.md in sync with actual progress

### Code Style
- NEVER use comments in code
- Code must be self-documenting through clear naming and structure
- Use TypeScript strict mode for all code

### Package Management
- Use `pnpm` exclusively for all Node.js projects
- Always reference latest version documentation

### Quality Standards
- UI/UX must have "wow" factor - premium, polished, beautiful
- All animations must be smooth and fluid (60fps)
- AI voice must sound like a real human, not robotic
- Every interaction should feel instant and delightful

## Tech Stack

### Frontend
- **Next.js 15** + **React 19** (latest features)
- TypeScript (strict mode)
- **Tailwind CSS 4** (latest version)
- Zustand (state management)
- Howler.js (audio playback)
- Framer Motion (smooth animations)

### Backend
- Node.js 20 + Express
- TypeScript (strict mode)
- Prisma (ORM)
- Bull (job queue for async tasks)

### AI Services
- **OpenAI TTS** (HD quality - human-like AI voice)
- OpenAI GPT-4 (script conversion)

### Infrastructure
- **PostgreSQL 16** (not 15)
- Redis 7 (caching, sessions)
- **Local File Storage** (no cloud, no CDN, no K8s)

### Package Manager
- **pnpm** (not npm or yarn)

## Architecture

### System Layers

**Client**: Next.js 15 web app with PWA support

**API**: REST + WebSocket (real-time sync)

**Services**:
- AI Voice Service (OpenAI TTS HD)
- Content Processing (YouTube extraction, GPT-4 script conversion)
- Sync Engine (±0.3s accuracy audio-visual timing)

**Data**: PostgreSQL 16, Redis 7, Local File System

### AI Voice Pipeline

1. Creator inputs YouTube URL
2. Extract subtitles (yt-dlp)
3. AI script conversion (GPT-4)
   - Generate listening-friendly scripts
   - Create 3 versions: 5min, 15min, 30min
4. Extract key frames (FFmpeg)
5. AI determines visual timing
6. Generate human-like AI voice (OpenAI TTS HD)
7. Create timestamp metadata
8. Store locally

### Player Synchronization

The sync engine maintains ±0.3s accuracy between:
- AI voice playback
- Text highlighting (smooth animations)
- Image display triggers
- Speed compensation (0.75x - 1.5x)

## Data Model

Core Prisma entities:
- **User**: Content creators
- **Content**: Base content metadata
- **Version**: Time variants (5/15/30 min)
- **Chapter**: Minimum 3 per content
- **Segment**: Timestamp segments with text
- **Visual**: Images with precise trigger timing

## Performance Requirements

| Metric | Target |
|--------|--------|
| AI voice generation | 10min content → 2min |
| First playback | ≤1 second |
| Sync accuracy | ±0.3 seconds |
| Image loading | ≤0.5 seconds |
| UI response | ≤0.5 seconds (60fps) |
| YouTube conversion | ≤5 minutes |

## Success Metrics

MVP must achieve:
- Completion rate: 70%+
- Screen OFF ratio: 60%+ (audio-only usage)
- Weekly playback: 3+ hours per user
- **Voice quality: 4.5/5.0+** (must sound human)
- D7 retention: 50%+

## Design Principles

1. **Premium Quality**: Every element must evoke "wow"
2. **Minimal & Clean**: Content-focused, no clutter
3. **Smooth & Fluid**: Buttery 60fps animations
4. **Dark First**: Dark mode default
5. **Gesture Friendly**: Intuitive interactions

### Visual Identity

**Colors**:
- Primary: Elegant purple/blue tones
- Background: Deep gray/black (#0a0a0a - #1a1a1a)
- Text: High contrast (#ffffff, #e0e0e0)
- Accent: Vibrant highlights

**Typography**:
- Fonts: Pretendard, Inter (high readability)
- Minimum: 18px (mobile)
- Line height: 1.6-1.8

**Animations**:
- Smooth easing (cubic-bezier)
- Duration: 150-300ms
- Meaningful motion only

## Development Workflow

### Project Structure
When creating projects:
- Backend: services/, controllers/, routes/, models/
- Frontend: components/, hooks/, store/, utils/
- Separate AI voice logic from API layer
- Standalone sync engine module

### P0 Features (MVP Essential)

1. **Human-like AI Voice Playback**
   - ElevenLabs integration
   - Speed control (0.75x-1.5x)
   - Background playback
   - Chapter system (min 3)

2. **Synchronized Visuals**
   - Smooth text highlighting (±0.3s)
   - Image timing triggers (±0.5s)
   - Screen lock audio continuation

3. **Time-Adaptive Versions**
   - 5/15/30 minute versions
   - Independent AI voice scripts
   - Elegant version selection UI

4. **Creator Studio**
   - YouTube URL input
   - AI auto-conversion
   - Voice preview
   - Script editing
   - Publishing

5. **Premium Player UI**
   - Minimal, modern design
   - Smooth animations
   - Large, intuitive controls
   - Album art style images
   - Dark mode default

### P1 Features (Consider for MVP)
- Lock screen controls
- Offline download
- Bookmark/resume playback

### Out of Scope (Post-MVP)
- Voice commands
- Community features
- Monetization
- Custom AI voices
- TV/CarPlay

## File Organization

### Backend
```
/server
  /src
    /services      # ElevenLabs, GPT-4, yt-dlp
    /controllers   # Request handlers
    /routes        # API endpoints
    /models        # Prisma client
    /utils         # Helpers
    /queue         # Bull jobs
```

### Frontend
```
/web
  /app            # Next.js 15 app directory
  /components     # React 19 components
  /hooks          # Custom hooks
  /store          # Zustand stores
  /utils          # Utilities
  /styles         # Tailwind CSS 4 config
```

## Integration Points

- **yt-dlp**: YouTube subtitle extraction
- **OpenAI GPT-4**: Script conversion
- **OpenAI TTS**: Human-like AI voice (HD quality)
- **FFmpeg**: Video frame extraction
- **Media Session API**: Lock screen controls

## Environment Setup

Required installations:
- Node.js 20
- pnpm
- PostgreSQL 16 (not 15)
- Redis 7
- FFmpeg

Environment variables (.env - never commit):
- DATABASE_URL
- REDIS_URL
- JWT_SECRET
- OPENAI_API_KEY
- LOCAL_STORAGE_PATH

## Critical Constraints

1. **No comments in code** - Self-documenting only
2. **Use pnpm** - Not npm or yarn
3. **PostgreSQL 16** - Not 15
4. **Next.js 15 + React 19** - Latest versions
5. **Tailwind CSS 4** - Latest version
6. **Local storage** - No cloud/CDN/K8s
7. **OpenAI TTS HD** - Human-like voice required
8. **Premium design** - "Wow" factor mandatory

## Testing Requirements

Phase 3 validation:
- Complete YouTube → publish flow
- All 3 time versions (5/15/30)
- Various content types
- Error cases (no subtitles, very long/short, private)
- Cross-browser (Chrome, Safari, Firefox)
- Mobile (iOS Safari, Android Chrome)
- Performance targets met
- Design quality "wow" factor

## Open Questions

1. OpenAI TTS voice selection → Quality test (alloy, echo, fable, onyx, nova, shimmer)
2. Optimal content lengths → Analyze usage data
3. Local storage limits → Cloud transition timing
4. Copyright considerations → Legal review needed
5. Pricing model → Free MVP, test post-beta

## Documentation

- PRD.md: Complete product requirements (v2.0)
- TASKS.md: 12-week development plan (v2.0)
- .claude/agents/: Specialized sub-agents

## Sub-Agents

Seven specialized agents available:
1. **tts-integration-specialist**: OpenAI TTS integration
2. **ai-script-converter**: GPT-4 and YouTube processing
3. **sync-engine-architect**: Audio-visual synchronization
4. **player-ui-designer**: Premium UI/UX implementation
5. **api-backend-architect**: REST API and database
6. **performance-optimizer**: Performance tuning
7. **testing-qa-engineer**: Comprehensive testing

See `.claude/agents/README.md` for details.
- 실행은 내가 해. 너는 방법만 알려줘 간략하게
- 디자인이랑 레이아웃같은건 (기능같은것도) slide-web을 좀 참고해봐