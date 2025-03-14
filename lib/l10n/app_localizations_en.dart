// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get common_greeting_hello => 'Hello!';

  @override
  String common_greeting_welcome(String name) {
    return 'Welcome, $name.';
  }

  @override
  String get common_greeting_howAreYou => 'How are you feeling today?';

  @override
  String get common_fallback_today => 'Waiting for your story.';

  @override
  String get common_fallback_empty_title => 'No diary entries yet.';

  @override
  String get common_fallback_empty_description => 'Written diary entries will appear here.';

  @override
  String get common_fallback_text => 'None';

  @override
  String get common_button_ok => 'OK';

  @override
  String get common_button_cancel => 'Cancel';

  @override
  String get common_button_confirm => 'Confirm';

  @override
  String get common_button_delete => 'Delete';

  @override
  String get common_button_edit => 'Edit';

  @override
  String get common_button_save => 'Save';

  @override
  String get common_button_back => 'Back';

  @override
  String get common_button_next => 'Next';

  @override
  String get common_button_prev => 'Previous';

  @override
  String get common_button_submit => 'Submit';

  @override
  String get common_units_month => 'Month';

  @override
  String get common_units_count => 'entries';

  @override
  String get common_units_day => '';

  @override
  String get navigation_drawer_index => 'Home';

  @override
  String get navigation_drawer_settings => 'Settings';

  @override
  String get modals_deleteJournal_title => 'Delete Journal';

  @override
  String get modals_deleteJournal_description => 'Are you sure you want to delete this journal? This action cannot be undone.';

  @override
  String get placeholders_journal_title => 'How was your day?';

  @override
  String get placeholders_journal_content => 'Record your emotions and experiences today.';

  @override
  String get placeholders_emotion => 'Choose the emotion you\'re feeling right now.';

  @override
  String get notifications_success_journal_title => 'Journal saved.';

  @override
  String get notifications_success_journal_message => 'Your precious record has been safely stored.';

  @override
  String get notifications_warning_journal_title => 'Diaries can only be written on the same day.';

  @override
  String get notifications_warning_emotion_title => 'Please select an emotion intensity!';

  @override
  String get notifications_warning_emotion_message => 'No emotion intensity has been selected';

  @override
  String get records_stats_totalCount_title => 'Total Records';

  @override
  String get records_stats_totalCount_description => 'Journals written so far';

  @override
  String get records_stats_totalCount_daysSinceSignup_title => 'Days journaling';

  @override
  String records_stats_totalCount_daysSinceSignup_description(int date) {
    return 'Day $date';
  }

  @override
  String get records_stats_totalCount_frequency_title => 'Writing Frequency';

  @override
  String records_stats_totalCount_frequency_description(int date) {
    return 'You write every $date days.';
  }

  @override
  String get records_stats_totalCount_frequency_everyDay => 'You write daily.';

  @override
  String get records_stats_totalCount_mostDay_title => 'Top Writing Day';

  @override
  String records_stats_totalCount_mostDay_description(String day) {
    return 'You mostly write on $day.';
  }

  @override
  String get records_stats_totalCount_expressiveMonth_title => 'Most Active Month';

  @override
  String records_stats_totalCount_expressiveMonth_description(String month, int count) {
    return 'In $month, you wrote $count entries.';
  }

  @override
  String get records_stats_emotion_title => 'Signature Emotion';

  @override
  String get records_stats_emotion_description => 'Your defining emotion';

  @override
  String records_stats_currentMonth_title(String month) {
    return '$month Records';
  }

  @override
  String get records_stats_currentMonth_description => 'Journals this month';

  @override
  String records_stats_currentMonth_journalCount_title(String month) {
    return 'Journals in $month';
  }

  @override
  String records_stats_currentMonth_journalCount_description(int count) {
    return '$count entries';
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
  String get records_garden_title => 'Records Overview';

  @override
  String get records_garden_description => 'View emotions by year and month.';

  @override
  String get emotions_types_happy => 'Happy';

  @override
  String get emotions_types_sad => 'Sad';

  @override
  String get emotions_types_angry => 'Angry';

  @override
  String get emotions_types_peace => 'Peaceful';

  @override
  String get emotions_levels_zero => 'Slightly';

  @override
  String get emotions_levels_half => 'Moderately';

  @override
  String get emotions_levels_full => 'Very';

  @override
  String get calendar_days_mon => 'Mon';

  @override
  String get calendar_days_tue => 'Tue';

  @override
  String get calendar_days_wed => 'Wed';

  @override
  String get calendar_days_thu => 'Thu';

  @override
  String get calendar_days_fri => 'Fri';

  @override
  String get calendar_days_sat => 'Sat';

  @override
  String get calendar_days_sun => 'Sun';

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
  String get calendar_months_jan => 'Jan';

  @override
  String get calendar_months_feb => 'Feb';

  @override
  String get calendar_months_mar => 'Mar';

  @override
  String get calendar_months_apr => 'Apr';

  @override
  String get calendar_months_may => 'May';

  @override
  String get calendar_months_jun => 'Jun';

  @override
  String get calendar_months_jul => 'Jul';

  @override
  String get calendar_months_aug => 'Aug';

  @override
  String get calendar_months_sep => 'Sep';

  @override
  String get calendar_months_oct => 'Oct';

  @override
  String get calendar_months_nov => 'Nov';

  @override
  String get calendar_months_dec => 'Dec';

  @override
  String get auth_login => 'Login';

  @override
  String get auth_register => 'Register';

  @override
  String get auth_signup => 'Sign Up';

  @override
  String get settings_theme_title => 'Dark Mode';

  @override
  String get settings_theme_light => 'Light Theme';

  @override
  String get settings_theme_dark => 'Dark Theme';

  @override
  String get settings_theme_system => 'System Theme';

  @override
  String get settings_language_title => 'Language';

  @override
  String get onboarding_welcome_title => 'Hello!';

  @override
  String get onboarding_welcome_description => 'Welcome to your journey';

  @override
  String get onboarding_welcome_description2 => 'Each day is a new page';

  @override
  String get onboarding_welcome_go => 'Start writing together?';

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
