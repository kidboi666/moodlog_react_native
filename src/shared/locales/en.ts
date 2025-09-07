export const en = {
  common: {
    greeting: {
      hello: 'Hello!',
      welcome: '{{name}}.',
      howAreYou: 'How are you feeling today?',
    },
    fallback: {
      today: 'Waiting for your story.',
      empty: {
        title: 'No journal entries yet.',
        description: 'Your journal entries will appear here.',
      },
      text: 'None',
    },
    ok: 'OK',
    cancel: 'Cancel',
    confirm: 'Confirm',
    content: 'Content',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    back: 'Back',
    next: 'Next',
    prev: 'Previous',
    login: 'Go to Login',
    join: 'Go to Sign Up',
    start: 'Get Started',
    submit: 'Submit',
    addCover: 'Add Cover',
    timeStamp: 'Timestamp',
    skip: 'Skip',
    write: 'Start Writing',
    units: {
      month: 'month',
      count: 'count',
      day: 'day',
    },
    moods: {
      zero: 'Slightly',
      half: 'Moderately',
      full: 'Very',
    },
    add: 'Add',
  },

  validation: {
    allFieldsRequired: 'Please fill in all fields.',
    passwordMustBeAtLeast8Characters: 'Password must be at least 8 characters.',
    invalidEmailFormat: 'Invalid email format.',
    passwordMismatch: 'Passwords do not match.',
  },
  serverError: {
    network: 'A network error occurred.',
    authFailed: 'Authentication failed.',
    signinFailed: 'Login failed.',
    signupFailed: 'Registration failed.',
    emailConflict: {
      title: 'Email already exists.',
      description: 'Would you like to go to the login page?',
    },
    userRegistrationFailed: 'User registration failed.',
    userInfoUpdateFailed: 'Failed to update user information.',
  },
  navigation: {
    drawer: {
      index: 'Home',
      settings: 'Settings',
    },
  },
  modals: {
    deleteJournal: {
      title: 'Delete Journal',
      description:
        'Are you sure you want to delete this journal? This action cannot be undone.',
    },
    deleteMood: {
      title: 'Delete Mood',
      description:
        'Are you sure you want to delete this mood? This action cannot be undone.',
    },
  },
  placeholders: {
    journal: {
      title: 'How was your day today?',
      content: 'Record your emotions and experiences from today.',
    },
    moodName: 'Please enter a mood name.',
    color: 'Please select a mood color.',
  },
  notifications: {
    success: {
      journal: {
        title: 'Journal has been saved.',
        message: 'Your precious record has been safely stored.',
      },
      delete: 'Journal has been deleted.',
    },
    warning: {
      journal: {
        title: 'Journals can only be written on the same day.',
      },
      mood: {
        title: 'Please select a mood intensity!',
        message: 'No mood intensity selected',
      },
      dailyLimit: {
        title: 'Daily Journal Limit',
        message: 'You can write up to 3 journals per day.',
      },
      moodLimit: {
        title: 'Mood Selection Limit',
        message: 'You can only select one mood per day.',
      },
    },
    premium: {
      title: 'Premium Feature',
      message: 'This feature is only available to premium members.',
    },
  },
  entries: {
    title: 'Entries',
    garden: {
      title: 'View All Entries',
      description: 'Check your recorded emotions by year and month.',
    },
  },
  statistics: {
    title: 'Statistics',
    timeRange: {
      yearly: 'Yearly',
      monthly: 'Monthly',
      weekly: 'Weekly',
    },
    daysSinceSignup: {
      title: 'Days Since Started',
      description: 'Days since you started writing',
      unit: 'days',
    },
    totalCount: {
      title: 'Total Records',
      description: 'Number of journals written so far',
    },
    frequency: {
      title: 'Average Writing Frequency',
      description: 'You usually write journals every {{date}} days.',
      everyDay: 'You usually write journals every day.',
    },
    mostDay: {
      title: 'Most Active Day',
      description: 'You mainly write journals on {{day}}s.',
    },
    logStreakDay: {
      title: 'Writing Streak',
      description: 'Consecutive days of daily writing',
      unit: 'days',
    },
    expressiveMonth: {
      title: 'Most Active Month',
      description: 'You wrote {{count}} journals in {{month}}.',
    },
    mood: {
      title: 'Representative Mood',
      description: 'Your most common emotion',
    },
    weeklyMood: {
      title: 'Weekly Mood Distribution',
      description: 'Distribution of most selected moods by week',
    },
    currentMonth: {
      title: '{{month}} Records',
      description: 'Number of journals written this month',
      journalCount: {
        title: 'Journals written in {{month}}',
        description: '{{count}} entries',
      },
      frequency: {
        title: '{{month}} Average Writing Frequency',
        description:
          'In {{month}}, you usually wrote journals every {{date}} days.',
        everyDay: 'In {{month}}, you usually wrote journals every day.',
      },
      mostDay: {
        title: 'Most Active Day in {{month}}',
        description: 'In {{month}}, you mainly wrote journals on {{day}}s.',
      },
      mood: '{{month}} Representative Mood',
    },
    empty: {
      title: 'No content available.',
      description: 'Write journals to see related information.',
    },
  },
  moods: {
    types: {
      simple: 'Simple',
      my: 'My Emotions',
    },
    levels: {
      zero: 'Slightly',
      half: 'Moderately',
      full: 'Very',
    },
    intensity: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
    },
    my: {
      title: 'My Emotions',
      selectTitle: "Select Today's Mood",
      noMoods: 'No custom emotions created yet. Create a new emotion.',
      createMoods: 'Create New Emotion',
      writeNewDiary: 'Write New Journal',
      intensity: 'Mood Intensity',
      save: 'Save Emotion',
      moodSelect: {
        title: "Select Today's Mood",
        description: 'Choose your current emotion.',
      },
      moodColor: {
        title: 'Select Mood Color',
        description: 'Choose a color that matches the emotion',
      },
      moodLevel: {
        title: 'Select Mood Intensity',
        description: 'Choose the intensity of the emotion',
      },
    },
  },
  write: {
    title: 'Write Emotional Journal',
    description: 'Record your brief emotions.',
    aiResponse: {
      title: 'AI Comfort Message',
      description:
        'After writing your journal, AI will send you a comforting and encouraging message.',
      alreadyReceived: 'You have already received an AI response today.',
    },
    dialog: {
      deleteImage: {
        title: 'Delete Image',
        description:
          'Are you sure you want to delete this image from the cover?',
      },
    },
  },
  journal: {
    aiResponse: {
      title: 'AI Comfort Message',
      from: 'From AI Friend',
    },
  },
  calendar: {
    days: {
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun',
    },
    daysShort: {
      mon: 'M',
      tue: 'T',
      wed: 'W',
      thu: 'T',
      fri: 'F',
      sat: 'S',
      sun: 'S',
    },
    months: {
      jan: 'January',
      feb: 'February',
      mar: 'March',
      apr: 'April',
      may: 'May',
      jun: 'June',
      jul: 'July',
      aug: 'August',
      sep: 'September',
      oct: 'October',
      nov: 'November',
      dec: 'December',
    },
  },
  auth: {
    login: 'Login',
    loginDescription: "Let's make a better day together.",
    register: 'Sign Up',
    registerDescription: 'Sign up to access more features.',
    signup: 'Sign Up',
    email: 'Email',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginButton: 'Login',
    registerButton: 'Sign Up',
    error: 'Error',
    emptyFields: 'Please fill in all fields',
    passwordMismatch: 'Passwords do not match',
    registerFailed: 'Registration failed',
    loginFailed: 'Login failed',
    success: 'Success',
    registerSuccess: 'Registration completed! You can now log in.',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signInWithGoogle: 'Continue with Google',
    or: 'or',
  },
  settings: {
    title: 'Settings',
    logout: {
      confirmTitle: 'Logout',
      confirmMessage: 'Are you sure you want to logout?',
    },
    dev: {
      options: 'Developer Options',
      title: 'Developer Settings',
      store: 'Store Management',
      resetStore: 'Reset Store',
      resetDatabase: 'Reset Database',
      network: 'Network',
      apiCalls: 'API Call History',
      serverStatus: 'Check Server Status',
      appStatus: 'App Status',
      appVersion: 'App Version Info',
      logs: 'Check Logs',
      memberInfo: 'Member Info',
      loadMemberInfo: 'Load Member Info',
    },
    menuTitle: {
      login: 'Login Information',
      config: 'System Settings',
      report: 'Support',
    },
    theme: {
      title: 'Dark Mode',
      light: 'Light Theme',
      dark: 'Dark Theme',
      system: 'System Theme',
    },
    colorTheme: {
      title: 'Color Settings',
    },
    language: {
      title: 'Language',
    },
    font: {
      title: 'Font',
      pretendard: 'Pretendard',
      inter: 'Inter',
      nanumPenScript: 'Nanum Pen Script',
      robotoMono: 'Roboto Mono',
      esamanru: 'Esamanru',
      leeSeoyun: 'Lee Seoyun',
    },
    timeFormat: {
      title: 'Time Format',
      '24': '24 Hour',
      '12': '12 Hour',
    },
    fontSize: {
      title: 'Font Size',
      smaller: 'Very Small',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      larger: 'Very Large',
    },
    profile: {
      title: 'Profile',
      id: 'User ID',
      username: 'Username',
      email: 'Email',
      age: 'Age',
      daysSinceSignup: 'Days Since Signup',
      guest: 'Guest Mode',
    },
    bugReport: {
      title: 'Report Bug',
      descriptionLabel: 'Bug Description',
      descriptionPlaceholder:
        'Please describe the bug you encountered in detail.',
      emailLabel: 'Email (Optional)',
      emailPlaceholder: 'Email address to receive response',
      screenshotLabel: 'Screenshot (Optional)',
      attachScreenshot: 'Attach Screenshot',
      deleteImage: 'Delete Image',
      submitting: 'Submitting...',
      submitButton: 'Submit Bug Report',
      alertDescriptionRequired: 'Please enter a bug description.',
      submitComplete: 'Submission Complete',
      submitMessage:
        'Bug report has been successfully submitted. Thank you for your valuable feedback.',
      submitError: 'An error occurred during submission. Please try again.',
    },
    qna: {
      title: 'Contact Us',
      categoryLabel: 'Inquiry Type',
      categoryPlaceholder: 'Please select an inquiry type',
      categoryFeature: 'Feature Inquiry',
      categoryUsage: 'Usage',
      categoryAccount: 'Account Related',
      categoryPayment: 'Payment Related',
      categoryEtc: 'Others',
      questionLabel: 'Inquiry Content',
      questionPlaceholder: 'Please write your inquiry in detail.',
      emailLabel: 'Email',
      emailPlaceholder: 'Email address to receive response',
      submitting: 'Submitting...',
      submitButton: 'Submit Inquiry',
      alertQuestionRequired: 'Please enter your inquiry.',
      alertEmailRequired: 'Please enter an email to receive response.',
      submitComplete: 'Submission Complete',
      submitMessage:
        'Inquiry has been successfully submitted. We will respond as soon as possible.',
      submitError: 'An error occurred during submission. Please try again.',
    },
    customEmotions: {
      title: 'Create Custom Emotions',
      description: 'Create and select your own custom emotions.',
      create: 'Add New Emotion',
      namePlaceholder: 'Emotion name',
      list: 'My Custom Emotions',
      empty: 'No custom emotions created.',
      limitReached: 'Free members can create up to 4 emotions.',
      upgradeToPremium: 'Upgrade to premium to create unlimited emotions.',
    },
  },
  onboarding: {
    welcome: {
      title: 'Welcome!',
      description:
        'MoodLog is an emotional journal app that records and analyzes your daily emotions.',
      description2:
        'Record your emotions daily and discover emotional patterns over time.',
      go: 'Shall we start with MoodLog together?',
    },
    nickname: {
      title: 'Your story begins here',
      description: 'What name would you like to write your story with?',
      placeholder: 'Enter nickname (2-10 characters)',
      helper: 'You can change your nickname anytime in the settings menu.',
      label: 'Nickname',
    },
    personality: {
      title: 'Ready to get started!',
      description:
        'Choose the kindness level of the AI that will respond to your journal.',
      rational: {
        title: 'Cool Analyst',
        description: 'Provides objective and practical advice.',
      },
      balanced: {
        title: 'Balanced Advisor',
        description: 'Balances empathy and realistic advice.',
      },
      compassionate: {
        title: 'Gentle Healer',
        description: 'Delivers warm comfort and deep empathy.',
      },
    },
  },
  signup: {
    title: 'Create Account',
    description: 'Start your journey',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    confirmPasswordPlaceholder: 'Re-enter your password',
    validation: {
      emailRequired: 'Please enter your email',
      invalidEmail: 'Invalid email format',
      passwordRequired: 'Please enter your password',
      passwordMinLength: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
    },
  },
  warn: {
    createMood: {
      name: {
        1: 'You can create up to 4 emotions.',
        2: 'Emotion name can be up to 10 characters.',
      },
      color: {
        1: 'You can select up to 3 emotion colors.',
      },
    },
  },
}
