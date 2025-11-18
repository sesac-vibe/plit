# FlowCast Sub-Agents

This directory contains specialized sub-agents for the FlowCast MVP development.

## Available Sub-Agents

### 1. TTS Integration Specialist
**File:** `tts-integration-specialist.md`
**Use for:** Google Cloud TTS integration, audio generation, voice quality testing, TTS pipeline implementation

**Key responsibilities:**
- TTS API setup and optimization
- Audio file generation and processing
- Quality assessment (target: 4.0/5.0)
- Performance optimization (10min → 3min)

### 2. AI Script Converter
**File:** `ai-script-converter.md`
**Use for:** GPT-4 integration, YouTube subtitle extraction, script transformation, multi-version generation

**Key responsibilities:**
- YouTube content extraction
- AI-powered script conversion to listening-friendly format
- Generate 5/15/30 minute versions
- Prompt engineering for quality output

### 3. Sync Engine Architect
**File:** `sync-engine-architect.md`
**Use for:** Audio-visual synchronization, text highlighting, image timing, playback speed compensation

**Key responsibilities:**
- Timestamp metadata system
- Real-time text highlighting (±0.5s accuracy)
- Visual trigger timing system
- Playback control integration with Howler.js

### 4. Player UI Designer
**File:** `player-ui-designer.md`
**Use for:** Player interface, audio controls, responsive design, dark mode, accessibility

**Key responsibilities:**
- React components with Next.js 14
- Mobile-first responsive layout
- Dark mode implementation
- Touch gestures and controls
- WCAG 2.1 AA compliance

### 5. API Backend Architect
**File:** `api-backend-architect.md`
**Use for:** REST API, database schema, authentication, job queues, service layer

**Key responsibilities:**
- Prisma schema design
- REST endpoint implementation
- Bull job queue management
- Storage and CDN integration
- Security and authentication

### 6. Performance Optimizer
**File:** `performance-optimizer.md`
**Use for:** Performance tuning, optimization, meeting PRD targets

**Key responsibilities:**
- TTS generation speed optimization
- Frontend loading performance
- Audio streaming efficiency
- Database query optimization
- CDN and caching strategies

### 7. Testing & QA Engineer
**File:** `testing-qa-engineer.md`
**Use for:** Unit tests, integration tests, E2E tests, quality assurance, acceptance criteria validation

**Key responsibilities:**
- Comprehensive test coverage
- PRD acceptance criteria validation
- Cross-browser/device testing
- Edge case and error scenario testing
- Performance testing

## Usage

Sub-agents will be automatically invoked by Claude Code when working on related tasks. You can also explicitly request a specific sub-agent:

```
"Use the tts-integration-specialist to implement the Google Cloud TTS integration"
```

## Development Principles

All sub-agents follow these constraints:
- Use `pnpm` for Node.js package management
- Never use code comments (self-documenting code only)
- Always check and update TASKS.md progress
- Reference latest documentation for all libraries
- Follow PRD requirements and success metrics

## Phase Mapping

### Phase 1: Technical Validation (Week 1-2)
- **tts-integration-specialist**: TTS quality testing
- **ai-script-converter**: GPT-4 script conversion testing
- **sync-engine-architect**: Sync prototype

### Phase 2: Core Development (Week 3-8)
- **api-backend-architect**: Backend implementation
- **player-ui-designer**: Frontend player
- **ai-script-converter**: Creator editor

### Phase 3: Integration & Testing (Week 9-10)
- **testing-qa-engineer**: E2E tests and QA
- **performance-optimizer**: Performance tuning

### Phase 4: Beta Launch (Week 11-12)
- **testing-qa-engineer**: Beta validation
- **performance-optimizer**: Production optimization

## Notes

- Sub-agents have access to: Read, Write, Edit, Bash, Glob, Grep, WebFetch tools
- All use `sonnet` model for consistency
- Descriptions use "PROACTIVELY" or "MUST BE USED" for critical agents
- Each agent updates TASKS.md with completed work
