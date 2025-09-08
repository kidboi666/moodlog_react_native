# 🌙 Moodlog - AI-Powered Mood Tracking App

> React Native 기반의 AI 지원 감정 일기 앱 - 초기 MVP 버전

## 📱 프로젝트 개요

<table>
  <tr>
    <td><img width="295" height="639" alt="Simulator Screenshot - iPhone 16 - 2025-09-08 at 11 38 31" src="https://github.com/user-attachments/assets/1d766f3c-9bfb-4987-aba7-e4df3724c3e2" /></td>
    <td><img width="295" height="639" alt="Simulator Screenshot - iPhone 16 - 2025-09-08 at 11 38 36" src="https://github.com/user-attachments/assets/cfce0cd3-9af5-45cb-9f0a-0c9aa87985b0" /></td>
    <td><img width="295" height="639" alt="Simulator Screenshot - iPhone 16 - 2025-09-08 at 11 47 32" src="https://github.com/user-attachments/assets/ba3f6aa5-df9b-412c-93ea-bc4a6d3d29ae" /></td>
    <td><img width="295" height="639" alt="Simulator Screenshot - iPhone 16 - 2025-09-08 at 11 52 05" src="https://github.com/user-attachments/assets/1ef6308b-e7cc-4627-ba55-d96a71b90d99" /></td>
  </tr>
</table>

Moodlog는 사용자의 감정과 일상을 기록하고, AI가 개인화된 피드백을 제공하는 모바일 애플리케이션입니다. 현재 React Native와 Expo를 기반으로 구축된 초기 MVP 버전으로, iOS, Android, Web 플랫폼을 모두 지원합니다.

**🚀 향후 계획**: 추후 Flutter 및 네이티브 Android 앱으로 마이그레이션을 통한 성능 최적화 및 플랫폼별 특화 기능 구현 예정

### 주요 기능
- 📝 **감정 기반 일기 작성**: 직관적인 인터페이스로 일상의 감정과 생각을 기록
- 🤖 **AI 개인화 응답**: Google Gemini AI가 제공하는 맞춤형 피드백과 조언
- 📅 **달력 기반 기록 관리**: 달력 뷰로 일기 기록을 쉽게 탐색
- 🎨 **다크/라이트 모드**: 사용자 선호에 따른 테마 지원
- 🌐 **다국어 지원**: 한국어/영어 인터페이스 제공
- 📸 **이미지 첨부**: 일기에 사진을 추가하여 기억을 더욱 생생하게 보관

## 🛠 기술 스택

### Frontend
- **React Native** `0.79.5` - 크로스 플랫폼 개발
- **Expo** `53.0.22` - 개발 도구 및 배포
- **TypeScript** `~5.8.3` - 타입 안전성

### UI/UX
- **React Native Paper** `^5.14.5` - Material Design 3
- **Expo Router** `~5.1.5` - 파일 기반 라우팅
- **React Native Reanimated** `~3.17.4` - 애니메이션

### 상태 관리
- **Zustand** `^5.0.5` - 경량 상태 관리
- **Tanstack React Query** `^5.80.7` - 서버 상태 관리
- **AsyncStorage** - 로컬 스토리지

### 데이터베이스
- **Expo SQLite** `~15.2.14` - 로컬 데이터베이스
- **Drizzle ORM** `^0.44.2` - 타입 세이프 ORM

### AI/외부 서비스
- **Google Generative AI** `^1.0.0` - AI 응답 생성

### 개발 도구
- **Biome** `^1.9.4` - 린팅 및 포매팅
- **Drizzle Kit** `^0.31.1` - 데이터베이스 마이그레이션

## 🏗️ 아키텍처 구조

### 현재 아키텍처: 3계층 구조 (Shared-Features-Data)

```
📁 프로젝트 구조
├── src/
│   ├── app/              # 🚀 Expo Router 라우팅
│   │   ├── (tabs)/      # 메인 탭 네비게이션
│   │   └── (onboarding)/ # 온보딩 플로우
│   ├── shared/          # 🔧 공통/재사용 가능한 코드
│   │   ├── components/  # 공통 UI 컴포넌트
│   │   ├── hooks/       # 재사용 가능한 훅
│   │   ├── utils/       # 유틸리티 함수
│   │   ├── types/       # TypeScript 타입 정의
│   │   ├── constants/   # 상수 정의
│   │   ├── configs/     # 설정 파일
│   │   └── lib/         # 외부 라이브러리 설정
│   ├── features/        # 🎯 기능별 모듈
│   │   ├── journal/     # 일기 기능
│   │   ├── mood/        # 감정 관리
│   │   ├── entries/     # 일기 목록
│   │   ├── write/       # 일기 작성
│   │   ├── setting/     # 설정
│   │   ├── home/        # 홈 화면
│   │   ├── sheet/       # 바텀 시트
│   │   └── tab/         # 탭 네비게이션
│   └── data/            # 🗄️ 데이터 관리 계층
│       ├── database/    # 데이터베이스 스키마
│       ├── services/    # 비즈니스 로직
│       ├── store/       # Zustand 상태 관리
│       └── providers/   # Context Providers
```

### 데이터 플로우

```
UI Components → Custom Hooks → Services → Database
     ↓              ↓           ↓
Zustand Store ← React Query ← Drizzle ORM
```

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

### 향후 계획
- 코드 분할 (Code Splitting) 적용
- 이미지 레이지 로딩 구현
- 메모리 사용량 모니터링 시스템 구축

## 🔒 보안 고려사항

- API 키 환경변수 관리
- 로컬 데이터베이스 암호화 검토
- 사용자 데이터 프라이버시 보호
- OWASP Mobile Top 10 준수

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
**프로젝트 상태**: 초기 MVP 버전  
**향후 계획**: Flutter/네이티브 Android 마이그레이션  
**마지막 업데이트**: 2025-09-07
