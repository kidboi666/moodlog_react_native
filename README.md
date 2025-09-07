# 🌙 Moodlog - AI-Powered Mood Tracking App

> React Native 기반의 AI 지원 감정 일기 앱

## 📱 프로젝트 개요

Moodlog는 사용자의 감정과 일상을 기록하고, AI가 개인화된 피드백을 제공하는 모바일 애플리케이션입니다.

### 주요 기능
- 📝 감정 기반 일기 작성
- 🤖 AI 개인화 응답 (Google Gemini)
- 📊 감정 통계 및 분석
- 📅 달력 기반 기록 관리
- 🎨 다크/라이트 모드 지원
- 🌐 다국어 지원 (한국어/영어)

## 🛠 기술 스택

### Frontend
- **React Native** `0.79.3` - 크로스 플랫폼 개발
- **Expo** `~53.0.11` - 개발 도구 및 배포
- **TypeScript** `~5.8.3` - 타입 안전성

### UI/UX
- **React Native Paper** `^5.14.5` - Material Design 3
- **Expo Router** `~5.1.0` - 파일 기반 라우팅
- **React Native Reanimated** `~3.17.4` - 애니메이션

### 상태 관리
- **Zustand** `^5.0.5` - 경량 상태 관리
- **React Query** `^5.80.7` - 서버 상태 관리
- **AsyncStorage** - 로컬 스토리지

### 데이터베이스
- **Expo SQLite** `~15.2.12` - 로컬 데이터베이스
- **Drizzle ORM** `^0.44.2` - 타입 세이프 ORM

### AI/외부 서비스
- **Google Generative AI** `^1.0.0` - AI 응답 생성

## 🏗️ 아키텍처 구조

### 현재 아키텍처: Layer-Based + Feature-Based 하이브리드

```
📁 프로젝트 구조
├── app/                 # 🚀 Expo Router 라우팅
│   ├── (tabs)/         # 메인 탭 네비게이션
│   ├── (journal)/      # 일기 관련 화면
│   └── (onboarding)/   # 온보딩 플로우
├── components/         # 🧩 재사용 가능한 컴포넌트
│   ├── ui/            # 기본 UI 컴포넌트
│   └── features/      # 기능별 컴포넌트
├── services/          # 💼 비즈니스 로직 레이어
├── store/             # 🗃️ Zustand 상태 관리
├── hooks/             # 🎣 커스텀 훅
├── db/                # 🗄️ 데이터베이스 스키마
├── types/             # 📝 TypeScript 타입 정의
├── utils/             # 🛠️ 유틸리티 함수
└── providers/         # 🔌 Context Providers
```

### 데이터 플로우

```
UI Components → Custom Hooks → Services → Database
     ↓              ↓           ↓
Zustand Store ← React Query ← Drizzle ORM
```

## 🔄 아키텍처 개선 계획

### Phase 1: 기본 구조 강화
- [x] 데이터베이스 스키마 정의
- [ ] 글로벌 에러 경계 구현
- [ ] Repository 패턴 적용

### Phase 2: 폴더 구조 재구성 (Shared-Features-Data)

현재 폴더들을 다음과 같이 재구성할 예정:

#### **shared** (공통/재사용 가능한 코드)
```
src/shared/
├── components/        # src/components/shared + 공통 UI
├── hooks/            # src/hooks + src/shared/hooks 병합
├── utils/            # src/utils + src/shared/utils 병합
├── constants/        # src/constants 이동
├── types/            # src/types 이동
├── configs/          # src/configs 이동
├── lib/              # src/lib 이동
└── locales/          # src/locales 이동
```

#### **features** (기능별 모듈)
```
src/features/
├── screens/          # src/app 이동 (라우팅)
├── journal/
│   └── components/   # src/components/features/journal 이동
├── mood/
│   └── components/   # src/components/features/mood 이동
├── entries/
│   └── components/   # src/components/features/entries 이동
├── write/
│   └── components/   # src/components/features/write 이동
├── setting/
│   └── components/   # src/components/features/setting 이동
├── home/
│   └── components/   # src/components/features/home 이동
├── sheet/
│   └── components/   # src/components/features/sheet 이동
└── tab/
    └── components/   # src/components/features/tab 이동
```

#### **data** (데이터 관리 계층)
```
src/data/
├── services/         # src/services 이동
├── queries/          # src/queries 이동
├── store/            # src/store 이동
├── context/          # src/context 이동
├── providers/        # src/providers 이동
└── db/               # src/db 이동
```

### Phase 3: 고급 패턴 적용
- [ ] Clean Architecture 요소 도입
- [ ] Domain-Driven Design 적용
- [ ] Micro-frontend 패턴 검토

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npx expo start
```

### 3. 플랫폼별 실행
```bash
# Android
npx expo run:android

# iOS  
npx expo run:ios

# Web
npx expo start --web
```

### 4. 데이터베이스 마이그레이션
```bash
npm run drizzle:gen
```

## 📋 개발 가이드라인

### 코드 스타일
- **ESLint + Biome** 사용
- **TypeScript Strict** 모드
- **Functional Components** + Hooks

### 커밋 컨벤션
```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
style: 코드 스타일 변경
test: 테스트 코드
chore: 빌드 설정, 패키지 매니저 설정
```

### 폴더/파일 네이밍
- **PascalCase**: 컴포넌트 파일 (`JournalCard.tsx`)
- **camelCase**: 유틸리티, 훅 (`useJournalForm.ts`)
- **kebab-case**: 폴더명 (`journal-detail`)

## 📊 성능 최적화

### 현재 적용된 최적화
- React.memo를 통한 불필요한 리렌더링 방지
- React Query 캐싱으로 네트워크 요청 최적화
- Expo Image로 이미지 최적화
- Bundle 크기 최적화 (Metro bundler)

### 계획된 최적화
- [ ] 코드 분할 (Code Splitting)
- [ ] 이미지 레이지 로딩
- [ ] 메모리 사용량 모니터링
- [ ] 성능 메트릭 측정

## 🔒 보안 고려사항

- API 키 환경변수 관리
- 로컬 데이터베이스 암호화 검토
- 사용자 데이터 프라이버시 보호
- OWASP Mobile Top 10 준수

## 📈 모니터링 & 분석

### 계획된 도구
- [ ] Sentry (에러 트래킹)
- [ ] Analytics (사용자 행동 분석)
- [ ] Performance Monitoring
- [ ] A/B 테스트 플랫폼

## 🤝 기여 가이드라인

1. **Fork** 프로젝트
2. **Feature Branch** 생성 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항 (`git commit -m 'Add amazing feature'`)
4. **Push** 브랜치 (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

## 📄 라이센스

이 프로젝트는 개인 프로젝트입니다.

---

**개발자**: jin-wook  
**마지막 업데이트**: 2025-09-07