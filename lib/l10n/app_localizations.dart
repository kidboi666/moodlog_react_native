import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';
import 'app_localizations_ko.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale) : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate = _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates = <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('en'),
    Locale('ko')
  ];

  /// Greeting message
  ///
  /// In en, this message translates to:
  /// **'Hello!'**
  String get common_greeting_hello;

  /// Welcome greeting
  ///
  /// In en, this message translates to:
  /// **'Welcome, {name}.'**
  String common_greeting_welcome(String name);

  /// No description provided for @common_greeting_howAreYou.
  ///
  /// In en, this message translates to:
  /// **'How are you feeling today?'**
  String get common_greeting_howAreYou;

  /// No description provided for @common_fallback_today.
  ///
  /// In en, this message translates to:
  /// **'Waiting for your story.'**
  String get common_fallback_today;

  /// No description provided for @common_fallback_empty_title.
  ///
  /// In en, this message translates to:
  /// **'No diary entries yet.'**
  String get common_fallback_empty_title;

  /// No description provided for @common_fallback_empty_description.
  ///
  /// In en, this message translates to:
  /// **'Written diary entries will appear here.'**
  String get common_fallback_empty_description;

  /// No description provided for @common_fallback_text.
  ///
  /// In en, this message translates to:
  /// **'None'**
  String get common_fallback_text;

  /// No description provided for @common_button_ok.
  ///
  /// In en, this message translates to:
  /// **'OK'**
  String get common_button_ok;

  /// No description provided for @common_button_cancel.
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get common_button_cancel;

  /// No description provided for @common_button_confirm.
  ///
  /// In en, this message translates to:
  /// **'Confirm'**
  String get common_button_confirm;

  /// No description provided for @common_button_delete.
  ///
  /// In en, this message translates to:
  /// **'Delete'**
  String get common_button_delete;

  /// No description provided for @common_button_edit.
  ///
  /// In en, this message translates to:
  /// **'Edit'**
  String get common_button_edit;

  /// No description provided for @common_button_save.
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get common_button_save;

  /// No description provided for @common_button_back.
  ///
  /// In en, this message translates to:
  /// **'Back'**
  String get common_button_back;

  /// No description provided for @common_button_next.
  ///
  /// In en, this message translates to:
  /// **'Next'**
  String get common_button_next;

  /// No description provided for @common_button_prev.
  ///
  /// In en, this message translates to:
  /// **'Previous'**
  String get common_button_prev;

  /// No description provided for @common_button_submit.
  ///
  /// In en, this message translates to:
  /// **'Submit'**
  String get common_button_submit;

  /// No description provided for @common_units_month.
  ///
  /// In en, this message translates to:
  /// **'Month'**
  String get common_units_month;

  /// No description provided for @common_units_count.
  ///
  /// In en, this message translates to:
  /// **'entries'**
  String get common_units_count;

  /// No description provided for @common_units_day.
  ///
  /// In en, this message translates to:
  /// **''**
  String get common_units_day;

  /// No description provided for @navigation_drawer_index.
  ///
  /// In en, this message translates to:
  /// **'Home'**
  String get navigation_drawer_index;

  /// No description provided for @navigation_drawer_settings.
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get navigation_drawer_settings;

  /// No description provided for @modals_deleteJournal_title.
  ///
  /// In en, this message translates to:
  /// **'Delete Journal'**
  String get modals_deleteJournal_title;

  /// No description provided for @modals_deleteJournal_description.
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to delete this journal? This action cannot be undone.'**
  String get modals_deleteJournal_description;

  /// No description provided for @placeholders_journal_title.
  ///
  /// In en, this message translates to:
  /// **'How was your day?'**
  String get placeholders_journal_title;

  /// No description provided for @placeholders_journal_content.
  ///
  /// In en, this message translates to:
  /// **'Record your emotions and experiences today.'**
  String get placeholders_journal_content;

  /// No description provided for @placeholders_emotion.
  ///
  /// In en, this message translates to:
  /// **'Choose the emotion you\'re feeling right now.'**
  String get placeholders_emotion;

  /// No description provided for @notifications_success_journal_title.
  ///
  /// In en, this message translates to:
  /// **'Journal saved.'**
  String get notifications_success_journal_title;

  /// No description provided for @notifications_success_journal_message.
  ///
  /// In en, this message translates to:
  /// **'Your precious record has been safely stored.'**
  String get notifications_success_journal_message;

  /// No description provided for @notifications_warning_journal_title.
  ///
  /// In en, this message translates to:
  /// **'Diaries can only be written on the same day.'**
  String get notifications_warning_journal_title;

  /// No description provided for @notifications_warning_emotion_title.
  ///
  /// In en, this message translates to:
  /// **'Please select an emotion intensity!'**
  String get notifications_warning_emotion_title;

  /// No description provided for @notifications_warning_emotion_message.
  ///
  /// In en, this message translates to:
  /// **'No emotion intensity has been selected'**
  String get notifications_warning_emotion_message;

  /// No description provided for @records_stats_totalCount_title.
  ///
  /// In en, this message translates to:
  /// **'Total Records'**
  String get records_stats_totalCount_title;

  /// No description provided for @records_stats_totalCount_description.
  ///
  /// In en, this message translates to:
  /// **'Journals written so far'**
  String get records_stats_totalCount_description;

  /// No description provided for @records_stats_totalCount_daysSinceSignup_title.
  ///
  /// In en, this message translates to:
  /// **'Days journaling'**
  String get records_stats_totalCount_daysSinceSignup_title;

  /// No description provided for @records_stats_totalCount_daysSinceSignup_description.
  ///
  /// In en, this message translates to:
  /// **'Day {date}'**
  String records_stats_totalCount_daysSinceSignup_description(int date);

  /// No description provided for @records_stats_totalCount_frequency_title.
  ///
  /// In en, this message translates to:
  /// **'Writing Frequency'**
  String get records_stats_totalCount_frequency_title;

  /// No description provided for @records_stats_totalCount_frequency_description.
  ///
  /// In en, this message translates to:
  /// **'You write every {date} days.'**
  String records_stats_totalCount_frequency_description(int date);

  /// No description provided for @records_stats_totalCount_frequency_everyDay.
  ///
  /// In en, this message translates to:
  /// **'You write daily.'**
  String get records_stats_totalCount_frequency_everyDay;

  /// No description provided for @records_stats_totalCount_mostDay_title.
  ///
  /// In en, this message translates to:
  /// **'Top Writing Day'**
  String get records_stats_totalCount_mostDay_title;

  /// No description provided for @records_stats_totalCount_mostDay_description.
  ///
  /// In en, this message translates to:
  /// **'You mostly write on {day}.'**
  String records_stats_totalCount_mostDay_description(String day);

  /// No description provided for @records_stats_totalCount_expressiveMonth_title.
  ///
  /// In en, this message translates to:
  /// **'Most Active Month'**
  String get records_stats_totalCount_expressiveMonth_title;

  /// No description provided for @records_stats_totalCount_expressiveMonth_description.
  ///
  /// In en, this message translates to:
  /// **'In {month}, you wrote {count} entries.'**
  String records_stats_totalCount_expressiveMonth_description(String month, int count);

  /// No description provided for @records_stats_emotion_title.
  ///
  /// In en, this message translates to:
  /// **'Signature Emotion'**
  String get records_stats_emotion_title;

  /// No description provided for @records_stats_emotion_description.
  ///
  /// In en, this message translates to:
  /// **'Your defining emotion'**
  String get records_stats_emotion_description;

  /// No description provided for @records_stats_currentMonth_title.
  ///
  /// In en, this message translates to:
  /// **'{month} Records'**
  String records_stats_currentMonth_title(String month);

  /// No description provided for @records_stats_currentMonth_description.
  ///
  /// In en, this message translates to:
  /// **'Journals this month'**
  String get records_stats_currentMonth_description;

  /// No description provided for @records_stats_currentMonth_journalCount_title.
  ///
  /// In en, this message translates to:
  /// **'Journals in {month}'**
  String records_stats_currentMonth_journalCount_title(String month);

  /// No description provided for @records_stats_currentMonth_journalCount_description.
  ///
  /// In en, this message translates to:
  /// **'{count} entries'**
  String records_stats_currentMonth_journalCount_description(int count);

  /// No description provided for @records_stats_currentMonth_frequency_title.
  ///
  /// In en, this message translates to:
  /// **'{month} Frequency'**
  String records_stats_currentMonth_frequency_title(String month);

  /// No description provided for @records_stats_currentMonth_frequency_description.
  ///
  /// In en, this message translates to:
  /// **'In {month}, you write every {date} days.'**
  String records_stats_currentMonth_frequency_description(String month, int date);

  /// No description provided for @records_stats_currentMonth_frequency_everyDay.
  ///
  /// In en, this message translates to:
  /// **'In {month}, you write daily.'**
  String records_stats_currentMonth_frequency_everyDay(String month);

  /// No description provided for @records_stats_currentMonth_mostDay_title.
  ///
  /// In en, this message translates to:
  /// **'Top Day in {month}'**
  String records_stats_currentMonth_mostDay_title(String month);

  /// No description provided for @records_stats_currentMonth_mostDay_description.
  ///
  /// In en, this message translates to:
  /// **'In {month}, you write most on {day}.'**
  String records_stats_currentMonth_mostDay_description(String month, String day);

  /// No description provided for @records_stats_currentMonth_emotion.
  ///
  /// In en, this message translates to:
  /// **'{month} Signature Emotion'**
  String records_stats_currentMonth_emotion(String month);

  /// No description provided for @records_garden_title.
  ///
  /// In en, this message translates to:
  /// **'Records Overview'**
  String get records_garden_title;

  /// No description provided for @records_garden_description.
  ///
  /// In en, this message translates to:
  /// **'View emotions by year and month.'**
  String get records_garden_description;

  /// No description provided for @emotions_types_happy.
  ///
  /// In en, this message translates to:
  /// **'Happy'**
  String get emotions_types_happy;

  /// No description provided for @emotions_types_sad.
  ///
  /// In en, this message translates to:
  /// **'Sad'**
  String get emotions_types_sad;

  /// No description provided for @emotions_types_angry.
  ///
  /// In en, this message translates to:
  /// **'Angry'**
  String get emotions_types_angry;

  /// No description provided for @emotions_types_peace.
  ///
  /// In en, this message translates to:
  /// **'Peaceful'**
  String get emotions_types_peace;

  /// No description provided for @emotions_levels_zero.
  ///
  /// In en, this message translates to:
  /// **'Slightly'**
  String get emotions_levels_zero;

  /// No description provided for @emotions_levels_half.
  ///
  /// In en, this message translates to:
  /// **'Moderately'**
  String get emotions_levels_half;

  /// No description provided for @emotions_levels_full.
  ///
  /// In en, this message translates to:
  /// **'Very'**
  String get emotions_levels_full;

  /// No description provided for @calendar_days_mon.
  ///
  /// In en, this message translates to:
  /// **'Mon'**
  String get calendar_days_mon;

  /// No description provided for @calendar_days_tue.
  ///
  /// In en, this message translates to:
  /// **'Tue'**
  String get calendar_days_tue;

  /// No description provided for @calendar_days_wed.
  ///
  /// In en, this message translates to:
  /// **'Wed'**
  String get calendar_days_wed;

  /// No description provided for @calendar_days_thu.
  ///
  /// In en, this message translates to:
  /// **'Thu'**
  String get calendar_days_thu;

  /// No description provided for @calendar_days_fri.
  ///
  /// In en, this message translates to:
  /// **'Fri'**
  String get calendar_days_fri;

  /// No description provided for @calendar_days_sat.
  ///
  /// In en, this message translates to:
  /// **'Sat'**
  String get calendar_days_sat;

  /// No description provided for @calendar_days_sun.
  ///
  /// In en, this message translates to:
  /// **'Sun'**
  String get calendar_days_sun;

  /// No description provided for @calendar_daysShort_mon.
  ///
  /// In en, this message translates to:
  /// **'M'**
  String get calendar_daysShort_mon;

  /// No description provided for @calendar_daysShort_tue.
  ///
  /// In en, this message translates to:
  /// **'T'**
  String get calendar_daysShort_tue;

  /// No description provided for @calendar_daysShort_wed.
  ///
  /// In en, this message translates to:
  /// **'W'**
  String get calendar_daysShort_wed;

  /// No description provided for @calendar_daysShort_thu.
  ///
  /// In en, this message translates to:
  /// **'T'**
  String get calendar_daysShort_thu;

  /// No description provided for @calendar_daysShort_fri.
  ///
  /// In en, this message translates to:
  /// **'F'**
  String get calendar_daysShort_fri;

  /// No description provided for @calendar_daysShort_sat.
  ///
  /// In en, this message translates to:
  /// **'S'**
  String get calendar_daysShort_sat;

  /// No description provided for @calendar_daysShort_sun.
  ///
  /// In en, this message translates to:
  /// **'S'**
  String get calendar_daysShort_sun;

  /// No description provided for @calendar_months_jan.
  ///
  /// In en, this message translates to:
  /// **'Jan'**
  String get calendar_months_jan;

  /// No description provided for @calendar_months_feb.
  ///
  /// In en, this message translates to:
  /// **'Feb'**
  String get calendar_months_feb;

  /// No description provided for @calendar_months_mar.
  ///
  /// In en, this message translates to:
  /// **'Mar'**
  String get calendar_months_mar;

  /// No description provided for @calendar_months_apr.
  ///
  /// In en, this message translates to:
  /// **'Apr'**
  String get calendar_months_apr;

  /// No description provided for @calendar_months_may.
  ///
  /// In en, this message translates to:
  /// **'May'**
  String get calendar_months_may;

  /// No description provided for @calendar_months_jun.
  ///
  /// In en, this message translates to:
  /// **'Jun'**
  String get calendar_months_jun;

  /// No description provided for @calendar_months_jul.
  ///
  /// In en, this message translates to:
  /// **'Jul'**
  String get calendar_months_jul;

  /// No description provided for @calendar_months_aug.
  ///
  /// In en, this message translates to:
  /// **'Aug'**
  String get calendar_months_aug;

  /// No description provided for @calendar_months_sep.
  ///
  /// In en, this message translates to:
  /// **'Sep'**
  String get calendar_months_sep;

  /// No description provided for @calendar_months_oct.
  ///
  /// In en, this message translates to:
  /// **'Oct'**
  String get calendar_months_oct;

  /// No description provided for @calendar_months_nov.
  ///
  /// In en, this message translates to:
  /// **'Nov'**
  String get calendar_months_nov;

  /// No description provided for @calendar_months_dec.
  ///
  /// In en, this message translates to:
  /// **'Dec'**
  String get calendar_months_dec;

  /// No description provided for @auth_login.
  ///
  /// In en, this message translates to:
  /// **'Login'**
  String get auth_login;

  /// No description provided for @auth_register.
  ///
  /// In en, this message translates to:
  /// **'Register'**
  String get auth_register;

  /// No description provided for @auth_signup.
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get auth_signup;

  /// No description provided for @settings_theme_title.
  ///
  /// In en, this message translates to:
  /// **'Dark Mode'**
  String get settings_theme_title;

  /// No description provided for @settings_theme_light.
  ///
  /// In en, this message translates to:
  /// **'Light Theme'**
  String get settings_theme_light;

  /// No description provided for @settings_theme_dark.
  ///
  /// In en, this message translates to:
  /// **'Dark Theme'**
  String get settings_theme_dark;

  /// No description provided for @settings_theme_system.
  ///
  /// In en, this message translates to:
  /// **'System Theme'**
  String get settings_theme_system;

  /// No description provided for @settings_language_title.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get settings_language_title;

  /// No description provided for @onboarding_welcome_title.
  ///
  /// In en, this message translates to:
  /// **'Hello!'**
  String get onboarding_welcome_title;

  /// No description provided for @onboarding_welcome_description.
  ///
  /// In en, this message translates to:
  /// **'Welcome to your journey'**
  String get onboarding_welcome_description;

  /// No description provided for @onboarding_welcome_description2.
  ///
  /// In en, this message translates to:
  /// **'Each day is a new page'**
  String get onboarding_welcome_description2;

  /// No description provided for @onboarding_welcome_go.
  ///
  /// In en, this message translates to:
  /// **'Start writing together?'**
  String get onboarding_welcome_go;

  /// No description provided for @onboarding_nickname_title.
  ///
  /// In en, this message translates to:
  /// **'Your story begins here'**
  String get onboarding_nickname_title;

  /// No description provided for @onboarding_nickname_description.
  ///
  /// In en, this message translates to:
  /// **'What name will you use?'**
  String get onboarding_nickname_description;

  /// No description provided for @onboarding_nickname_placeholder.
  ///
  /// In en, this message translates to:
  /// **'Enter nickname'**
  String get onboarding_nickname_placeholder;

  /// No description provided for @onboarding_signup_title.
  ///
  /// In en, this message translates to:
  /// **'Start your journal'**
  String get onboarding_signup_title;

  /// No description provided for @onboarding_signup_ota.
  ///
  /// In en, this message translates to:
  /// **'Features available:'**
  String get onboarding_signup_ota;

  /// No description provided for @onboarding_signup_benefits_sync.
  ///
  /// In en, this message translates to:
  /// **'Multi-device sync'**
  String get onboarding_signup_benefits_sync;

  /// No description provided for @onboarding_signup_benefits_backup.
  ///
  /// In en, this message translates to:
  /// **'Secure backups'**
  String get onboarding_signup_benefits_backup;

  /// No description provided for @onboarding_signup_benefits_stats.
  ///
  /// In en, this message translates to:
  /// **'Advanced stats'**
  String get onboarding_signup_benefits_stats;
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) => <String>['en', 'ko'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {


  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en': return AppLocalizationsEn();
    case 'ko': return AppLocalizationsKo();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.'
  );
}
