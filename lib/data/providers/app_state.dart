import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum ViewFontSize { small, medium, large }

enum Languages { ko, en }

class AppState extends ChangeNotifier {
  ViewFontSize _fontSize = ViewFontSize.small;
  Locale _locale = const Locale('ko');
  bool _isInitialApp = false;
  String? _firstLaunchDate;
  final String appVersion = '1.0.0';

  // Getters
  ViewFontSize get fontSize => _fontSize;

  Locale get locale => _locale;

  bool get isInitialApp => _isInitialApp;

  String? get firstLaunchDate => _firstLaunchDate;

  // 앱 초기화 시 저장된 값 불러오기
  Future<void> loadInitialValues() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final isInitial = prefs.getBool('isInitialApp') ?? false;
      final firstLaunch = prefs.getString('firstLaunchDate');

      if (isInitial) {
        _isInitialApp = true;
        _firstLaunchDate = firstLaunch;
        notifyListeners();
      }
    } catch (err) {
      print('초기 값 로드 중 오류 발생: $err');
    }
  }

  Future<String?> initializeFirstLaunchStatus() async {
    final firstLaunchDate = DateTime.now().toIso8601String().split('T')[0];

    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('isInitialApp', true);
      await prefs.setString('firstLaunchDate', firstLaunchDate);

      _isInitialApp = true;
      _firstLaunchDate = firstLaunchDate;
      notifyListeners();

      return firstLaunchDate;
    } catch (err) {
      print('초기화 중 오류 발생: $err');
      return null;
    }
  }

  void changeLanguage(Languages language, BuildContext context) async {
    String languageCode;

    switch (language) {
      case Languages.ko:
        languageCode = 'ko';
        break;
      case Languages.en:
        languageCode = 'en';
        break;
      default:
        languageCode = 'ko';
    }

    _locale = Locale(languageCode);

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('language', languageCode);
  }

  void changeFontSize(ViewFontSize size) {
    _fontSize = size;
    notifyListeners();
  }
}
