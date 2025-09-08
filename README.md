# 🌙 MoodLog

> **감정을 기록하고, 마음을 들여다보는 AI 감정 일기 앱**

MoodLog는 일상의 감정을 기록하고 분석하여 더 나은 자신을 만들어가는 여정을 돕는 React Native 기반 크로스플랫폼 앱입니다.

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)](https://expo.dev)
![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)


## 📱 스크린샷

<table>
  <tr>
    <td><img width="295" height="639" alt="홈 화면" src="https://github.com/user-attachments/assets/1d766f3c-9bfb-4987-aba7-e4df3724c3e2" /></td>
    <td><img width="295" height="639" alt="일기 작성" src="https://github.com/user-attachments/assets/cfce0cd3-9af5-45cb-9f0a-0c9aa87985b0" /></td>
    <td><img width="295" height="639" alt="달력 뷰" src="https://github.com/user-attachments/assets/ba3f6aa5-df9b-412c-93ea-bc4a6d3d29ae" /></td>
    <td><img width="295" height="639" alt="설정" src="https://github.com/user-attachments/assets/1ef6308b-e7cc-4627-ba55-d96a71b90d99" /></td>
  </tr>
</table>

## ✨ 주요 기능

### 📝 **스마트 감정 기록**
- 직관적인 인터페이스로 일상의 감정과 생각을 기록
- 이미지 첨부로 기억을 더욱 생생하게 보관
- 달력 기반 기록 관리 시스템

### 🤖 **AI 개인화 응답**
- Google Gemini AI가 제공하는 맞춤형 피드백과 조언
- 일기 내용을 분석한 공감적 응답
- 개인화된 성찰 가이드 제공

### 📅 **직관적인 기록 관리**
- 달력 뷰로 일기 기록을 쉽게 탐색
- 기록 히스토리 및 검색 기능
- 연속 기록 달성 현황 추적

### 🌍 **글로벌 접근성**
- **2개 언어 지원**: 한국어, 영어
- 다크/라이트 테마 자동 전환
- Material Design 3 기반 모던 UI

### 🔐 **안전한 데이터 관리**
- SQLite 기반 로컬 데이터베이스
- 오프라인 모드 완벽 지원
- 개인정보 보호 우선 설계

## 🏗️ 기술 스택

### **Frontend**
- **React Native** `0.79.5` - 크로스플랫폼 UI 프레임워크
- **Expo** `53.0.22` - 개발 도구 및 배포 플랫폼
- **TypeScript** `~5.8.3` - 타입 안전성 보장
- **React Native Paper** `^5.14.5` - Material Design 3

### **상태 관리**
- **Zustand** `^5.0.5` - 경량 상태 관리
- **Tanstack React Query** `^5.80.7` - 서버 상태 관리
- **AsyncStorage** - 로컬 스토리지

### **데이터베이스 & ORM**
- **Expo SQLite** `~15.2.14` - 로컬 데이터베이스
- **Drizzle ORM** `^0.44.2` - 타입 세이프 ORM
- **Drizzle Kit** `^0.31.1` - 데이터베이스 마이그레이션

### **External APIs**
- **Google Generative AI** `^1.0.0` - AI 응답 생성
- **Expo Image Picker** - 갤러리 접근
- **React Native Reanimated** `~3.17.4` - 애니메이션

## 🏛️ 아키텍처

MoodLog는 **Feature-Sliced Design** 패턴을 적용하여 확장 가능하고 유지보수가 용이한 구조로 설계되었습니다.

```
src/
├── app/                    # 🚀 Expo Router 라우팅
│   ├── (tabs)/            # 메인 탭 네비게이션
│   └── (onboarding)/      # 온보딩 플로우
├── shared/                 # 🔧 공통 코드
│   ├── components/        # 재사용 UI 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── utils/             # 헬퍼 함수들
│   ├── types/             # TypeScript 타입
│   ├── constants/         # 앱 전역 상수
│   ├── configs/           # 설정 파일
│   └── lib/               # 외부 라이브러리 설정
├── features/               # 🎯 기능별 모듈
│   ├── journal/           # 일기 관리
│   ├── mood/              # 감정 추적
│   ├── entries/           # 일기 목록
│   ├── write/             # 일기 작성
│   ├── setting/           # 설정
│   ├── home/              # 홈 화면
│   ├── sheet/             # 바텀 시트
│   └── tab/               # 탭 네비게이션
└── data/                   # 🗄️ 데이터 계층
    ├── database/          # 데이터베이스 스키마
    ├── services/          # 비즈니스 로직
    ├── store/             # Zustand 상태 관리
    └── providers/         # Context Providers
```

### **Design Patterns**
- **Feature-Sliced Design** - 기능별 모듈화
- **Custom Hooks Pattern** - 로직 재사용성
- **Repository Pattern** - 데이터 소스 추상화
- **Provider Pattern** - 상태 관리

### **데이터 플로우**
```
UI Components → Custom Hooks → Services → Database
     ↓              ↓           ↓
Zustand Store ← React Query ← Drizzle ORM
```

## 🚀 시작하기

### **사전 요구사항**
- Node.js (18.0.0 이상)
- npm 또는 yarn
- Expo CLI
- Android Studio / Xcode (네이티브 빌드 시)

### **설치 및 실행**

1. **저장소 클론**
```bash
git clone https://github.com/your-username/moodlog.git
cd moodlog
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
```bash
cp .env.example .env
# .env 파일에 필요한 API 키 설정
```

4. **데이터베이스 마이그레이션**
```bash
npm run drizzle:gen
```

5. **개발 서버 실행**
```bash
npx expo start
```

### **플랫폼별 실행**
```bash
# Android
npx expo run:android

# iOS
npx expo run:ios

# Web
npx expo start --web
```

### **빌드**
```bash
# Android APK
npx expo build:android

# iOS IPA
npx expo build:ios

# Web
npx expo export:web
```


### 메인 기능
| 홈 | 일기 작성 | 달력 뷰 | 설정 |
|:---:|:---:|:---:|:---:|
| 감정 현황과 최근 기록 | AI 피드백 포함 | 기록 히스토리 탐색 | 개인화 설정 |

### 다국어 지원
| 한국어 | English |
|:---:|:---:|
| 기본 언어 | 글로벌 사용자 |

## 🤝 기여하기

MoodLog 프로젝트에 기여해주시는 모든 분들을 환영합니다!

### **기여 방법**
1. 이슈 생성 또는 기존 이슈 확인
2. Fork 후 feature 브랜치 생성
3. 코드 작성 및 테스트
4. Pull Request 생성

### **개발 가이드라인**
- **코드 스타일**: Biome 린팅 및 포매팅 준수
- **커밋 메시지**: [Conventional Commits](https://conventionalcommits.org/) 형식
- **타입 체킹**: TypeScript strict 모드 준수

### **커밋 컨벤션**
```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
style: 코드 스타일 변경
test: 테스트 코드
chore: 빌드 설정, 패키지 매니저 설정
```

## 👥 팀

- **개발자**: jin-wook
- **프로젝트 상태**: 초기 MVP 버전
- **GitHub**: [@kidboi666](https://github.com/kidboi666/moodlog)

## 🙏 감사의 말

- [React Native 팀](https://reactnative.dev)의 훌륭한 프레임워크
- [Expo 팀](https://expo.dev)의 강력한 개발 도구
- [Material Design](https://material.io)의 아름다운 디자인 시스템
- 모든 오픈소스 기여자들

---

**MoodLog와 함께 당신의 감정 여행을 시작해보세요! 🌈**
