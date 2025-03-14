# folder structure

lib/
├── main.dart # 앱 진입점
├── app.dart # 앱 위젯(MaterialApp 등) 정의
├── config/ # 앱 설정 관련 파일
│ ├── constants.dart # 앱 상수 (이전의 STORAGE_KEY, APP_VERSION 등)
│ ├── themes.dart # 앱 테마 설정
│ └── routes.dart # 라우트 정의
├── core/ # 핵심 utility 와 서비스
│ ├── services/ # 외부 서비스 관련
│ │ ├── storage_service.dart # 저장소 서비스 추상화
│ │ └── localization_service.dart
│ └── utils/ # utility 클래스 와 함수들
│ └── enums.dart # ViewFontSize, Languages 등 열거형
├── data/ # 데이터 관련
│ ├── models/ # 데이터 모델 클래스
│ ├── repositories/ # 데이터 소스 액세스 로직
│ └── providers/ # 상태 관리 Provider 들
│ └── app_state.dart # 앱 상태 Provider
├── presentation/             
│ ├── screens/ # 앱 화면들
│ ├── widgets/ # 재사용 위젯들
│ └── common_widgets/ # 전역 재사용 위젯
├── l10n/ # 다국어 지원 리소스
│ ├── app_ko.arb # 한국어 번역
│ └── app_en.arb # 영어 번역
└── gen/ # 자동 생성 코드