// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Korean (`ko`).
class AppLocalizationsKo extends AppLocalizations {
  AppLocalizationsKo([String locale = 'ko']) : super(locale);

  @override
  String get common_greeting_hello => '안녕하세요!';

  @override
  String common_greeting_welcome(String name) {
    return '$name님.';
  }

  @override
  String get common_greeting_howAreYou => '오늘 기분은 어떠세요?';

  @override
  String get common_fallback_today => '당신의 이야기를 기다리고 있어요.';

  @override
  String get common_fallback_empty_title => '작성된 일기가 없어요.';

  @override
  String get common_fallback_empty_description => '작성된 일기가 이곳에 보여집니다.';

  @override
  String get common_fallback_text => '없음';

  @override
  String get common_button_ok => '확인';

  @override
  String get common_button_cancel => '취소';

  @override
  String get common_button_confirm => '확인';

  @override
  String get common_button_delete => '삭제';

  @override
  String get common_button_edit => '수정';

  @override
  String get common_button_save => '저장';

  @override
  String get common_button_back => '뒤로';

  @override
  String get common_button_next => '다음';

  @override
  String get common_button_prev => '이전';

  @override
  String get common_button_submit => '제출';

  @override
  String get common_units_month => '월';

  @override
  String get common_units_count => '개';

  @override
  String get common_units_day => '요일';

  @override
  String get navigation_drawer_index => '홈으로';

  @override
  String get navigation_drawer_settings => '설정';

  @override
  String get modals_deleteJournal_title => '일기 삭제';

  @override
  String get modals_deleteJournal_description => '이 일기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.';

  @override
  String get placeholders_journal_title => '오늘 하루는 어땟나요?';

  @override
  String get placeholders_journal_content => '오늘의 감정과 경험을 기록해보세요.';

  @override
  String get placeholders_emotion => '지금 느끼고 있는 감정을 선택하세요.';

  @override
  String get notifications_success_journal_title => '일기가 저장되었습니다.';

  @override
  String get notifications_success_journal_message => '소중한 기록이 안전하게 보관되었어요.';

  @override
  String get notifications_warning_journal_title => '일기는 당일에만 작성할 수 있습니다.';

  @override
  String get notifications_warning_emotion_title => '감정 강도를 선택해주세요!';

  @override
  String get notifications_warning_emotion_message => '선택된 감정 강도가 없습니다';

  @override
  String get records_stats_totalCount_title => '전체 기록';

  @override
  String get records_stats_totalCount_description => '지금까지 작성한 일기 갯수';

  @override
  String get records_stats_totalCount_daysSinceSignup_title => '일기를 작성하기 시작한지';

  @override
  String records_stats_totalCount_daysSinceSignup_description(int date) {
    return '$date일 째';
  }

  @override
  String get records_stats_totalCount_frequency_title => '평균 작성 빈도';

  @override
  String records_stats_totalCount_frequency_description(int date) {
    return '보통 $date일 간격으로 일기를 작성했어요.';
  }

  @override
  String get records_stats_totalCount_frequency_everyDay => '보통 매일 일기를 작성했어요.';

  @override
  String get records_stats_totalCount_mostDay_title => '가장 많이 작성한 요일';

  @override
  String records_stats_totalCount_mostDay_description(String day) {
    return '주로 $day요일에 일기를 작성했어요.';
  }

  @override
  String get records_stats_totalCount_expressiveMonth_title => '가장 많이 작성한 달';

  @override
  String records_stats_totalCount_expressiveMonth_description(String month, int count) {
    return '$month엔 총 $count개의 일기를 작성했어요.';
  }

  @override
  String get records_stats_emotion_title => '대표 감정';

  @override
  String get records_stats_emotion_description => '나를 대표하는 감정';

  @override
  String records_stats_currentMonth_title(String month) {
    return '$month의 기록';
  }

  @override
  String get records_stats_currentMonth_description => '이번 달 작성한 일기의 갯수';

  @override
  String records_stats_currentMonth_journalCount_title(String month) {
    return '$month의 작성한 일기 갯수';
  }

  @override
  String records_stats_currentMonth_journalCount_description(int count) {
    return '$count 개';
  }

  @override
  String records_stats_currentMonth_frequency_title(String month) {
    return '$month Frequency';
  }

  @override
  String records_stats_currentMonth_frequency_description(String month, int date) {
    return 'In $month, you write every $date days.';
  }

  @override
  String records_stats_currentMonth_frequency_everyDay(String month) {
    return 'In $month, you write daily.';
  }

  @override
  String records_stats_currentMonth_mostDay_title(String month) {
    return 'Top Day in $month';
  }

  @override
  String records_stats_currentMonth_mostDay_description(String month, String day) {
    return 'In $month, you write most on $day.';
  }

  @override
  String records_stats_currentMonth_emotion(String month) {
    return '$month Signature Emotion';
  }

  @override
  String get records_garden_title => '기록 한눈에 보기';

  @override
  String get records_garden_description => '년도 별, 월 별 당신이 기록한 날의 감정을 확인하세요.';

  @override
  String get emotions_types_happy => '행복';

  @override
  String get emotions_types_sad => '슬픔';

  @override
  String get emotions_types_angry => '화남';

  @override
  String get emotions_types_peace => '평온';

  @override
  String get emotions_levels_zero => '약간';

  @override
  String get emotions_levels_half => '적당히';

  @override
  String get emotions_levels_full => '매우';

  @override
  String get calendar_days_mon => '월';

  @override
  String get calendar_days_tue => '화';

  @override
  String get calendar_days_wed => '수';

  @override
  String get calendar_days_thu => '목';

  @override
  String get calendar_days_fri => '금';

  @override
  String get calendar_days_sat => '토';

  @override
  String get calendar_days_sun => '일';

  @override
  String get calendar_daysShort_mon => 'M';

  @override
  String get calendar_daysShort_tue => 'T';

  @override
  String get calendar_daysShort_wed => 'W';

  @override
  String get calendar_daysShort_thu => 'T';

  @override
  String get calendar_daysShort_fri => 'F';

  @override
  String get calendar_daysShort_sat => 'S';

  @override
  String get calendar_daysShort_sun => 'S';

  @override
  String get calendar_months_jan => '1월';

  @override
  String get calendar_months_feb => '2월';

  @override
  String get calendar_months_mar => '3월';

  @override
  String get calendar_months_apr => '4월';

  @override
  String get calendar_months_may => '5월';

  @override
  String get calendar_months_jun => '6월';

  @override
  String get calendar_months_jul => '7월';

  @override
  String get calendar_months_aug => '8월';

  @override
  String get calendar_months_sep => '9월';

  @override
  String get calendar_months_oct => '10월';

  @override
  String get calendar_months_nov => '11월';

  @override
  String get calendar_months_dec => '12월';

  @override
  String get auth_login => '로그인';

  @override
  String get auth_register => '회원가입';

  @override
  String get auth_signup => '가입하기';

  @override
  String get settings_theme_title => '다크 모드';

  @override
  String get settings_theme_light => '밝은 테마';

  @override
  String get settings_theme_dark => '어두운 테마';

  @override
  String get settings_theme_system => '시스템 테마';

  @override
  String get settings_language_title => '언어';

  @override
  String get onboarding_welcome_title => '안녕하세요!';

  @override
  String get onboarding_welcome_description => '당신의 일상 여정에 오신 것을 환영합니다';

  @override
  String get onboarding_welcome_description2 => '매일이 당신 이야기의 새로운 페이지예요';

  @override
  String get onboarding_welcome_go => '함께 써내려가 볼까요?';

  @override
  String get onboarding_nickname_title => 'Your story begins here';

  @override
  String get onboarding_nickname_description => 'What name will you use?';

  @override
  String get onboarding_nickname_placeholder => 'Enter nickname';

  @override
  String get onboarding_signup_title => 'Start your journal';

  @override
  String get onboarding_signup_ota => 'Features available:';

  @override
  String get onboarding_signup_benefits_sync => 'Multi-device sync';

  @override
  String get onboarding_signup_benefits_backup => 'Secure backups';

  @override
  String get onboarding_signup_benefits_stats => 'Advanced stats';
}
