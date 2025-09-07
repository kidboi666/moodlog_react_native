export const en = {
  common: {
    greeting: {
      hello: 'Hello!',
      welcome: 'Welcome, {{name}}.',
      howAreYou: 'How are you feeling today?',
    },
    fallback: {
      today: 'Waiting for your story.',
      empty: {
        title: 'No diary entries yet.',
        description: 'Written diary entries will appear here.',
      },
      text: 'None',
    },
    ok: 'OK',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    back: 'Back',
    next: 'Next',
    prev: 'Previous',
    submit: 'Submit',
    login: 'Login',
    skip: 'Skip',
    join: 'Go to Join',
    addCover: 'Add Cover',
    timeStamp: 'Time Stamp',
    write: 'Write a Diary',
    units: {
      month: 'Month',
      count: 'entries',
      day: '',
    },
  },
  validation: {
    allFieldsRequired: 'All fields are required.',
    passwordMustBeAtLeast8Characters: 'Password must be at least 8 characters.',
    invalidEmailFormat: 'Invalid email format.',
    passwordMismatch: 'Passwords do not match.',
  },
  serverError: {
    network: 'Network error occurred.',
    authFailed: 'Authentication failed.',
    signinFailed: 'Sign-in failed.',
    signupFailed: 'Sign-up failed.',
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
      title: 'How was your day?',
      content: 'Record your emotions and experiences today.',
    },
    moodName: 'Enter the emotion name.',
    color: 'Select the emotion color.',
  },
  notifications: {
    success: {
      journal: {
        title: 'Journal saved.',
        message: 'Your precious record has been safely stored.',
      },
      delete: 'Journal deleted.',
    },
    warning: {
      journal: {
        title: 'Diaries can only be written on the same day.',
      },
      mood: {
        title: 'Please select an emotion intensity!',
        message: 'No emotion intensity has been selected',
      },
      dailyLimit: {
        title: 'Daily Journal Limit',
        message: 'You can only write up to 3 journals per day.',
      },
      moodLimit: {
        title: 'Daily Mood Limit',
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
      title: 'Records Overview',
      description: 'View emotions by year and month.',
    },
  },
  statistics: {
    title: 'Statistic',
    timeRange: {
      yearly: 'Yearly',
      monthly: 'Monthly',
      weekly: 'Weekly',
    },
    totalCount: {
      title: 'Total Record',
      description: 'Journals written so far',
    },
    daysSinceSignup: {
      title: 'Days journaling',
      description: 'Since you started writing',
      unit: 'days',
    },
    frequency: {
      title: 'Writing Frequency',
      description: 'You write every {{date}} days.',
      everyDay: 'You write daily.',
    },
    mostDay: {
      title: 'Top Writing Day',
      description: 'You mostly write on {{day}}.',
    },
    expressiveMonth: {
      title: 'Most Active Month',
      description: 'In {{month}}, you wrote {{count}} entries.',
    },
    mood: {
      title: 'Signature Emotion',
      description: 'Your defining emotion',
    },
    weeklyMood: {
      title: 'Weekly Mood Distribution',
      description:
        'Distribution chart of most frequently selected emotions by week',
    },
    currentMonth: {
      title: '{{month}} Records',
      description: 'Journals this month',
      journalCount: {
        title: 'Journals in {{month}}',
        description: '{{count}} entries',
      },
      frequency: {
        title: '{{month}} Frequency',
        description: 'In {{month}}, you write every {{date}} days.',
        everyDay: 'In {{month}}, you write daily.',
      },
      mostDay: {
        title: 'Top Day in {{month}}',
        description: 'In {{month}}, you write most on {{day}}.',
      },
      mood: '{{month}} Signature Emotion',
    },
    empty: {
      title: 'No content available.',
      description: 'Write a journal to see related information.',
    },
  },
  moods: {
    types: {
      happy: 'Happy',
      sad: 'Sad',
      angry: 'Angry',
      peace: 'Peaceful',
    },
    levels: {
      zero: 'Slightly',
      half: 'Moderately',
      full: 'Very',
    },
    my: {
      title: 'My Moods',
      selectTitle: "Select Today's Mood",
      noMoods: "You haven't created any moods yet. Create a new mood.",
      createMoods: 'Create New Moods',
      writeNewDiary: 'Write a New Diary',
      intensity: 'Mood Intensity',
      save: 'Save Mood',
      moodColor: {
        title: 'Select Mood Color',
        description: 'Choose a color that matches your mood',
      },
      moodSelect: {
        title: "Select Today's Mood",
        description: 'Choose your current mood',
      },
      moodLevel: {
        title: 'Select Mood Intensity',
        description: 'Choose the intensity of your mood',
      },
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
      jan: 'Jan',
      feb: 'Feb',
      mar: 'Mar',
      apr: 'Apr',
      may: 'May',
      jun: 'Jun',
      jul: 'Jul',
      aug: 'Aug',
      sep: 'Sep',
      oct: 'Oct',
      nov: 'Nov',
      dec: 'Dec',
    },
  },
  auth: {
    login: 'Login',
    loginDescription: "Let's create a better day together.",
    register: 'Register',
    registerDescription: 'Sign up to access more features.',
    signup: 'Sign Up',
    logout: 'Log Out',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    loginButton: 'Log In',
    registerButton: 'Register',
    error: 'Error',
    emptyFields: 'Please fill in all fields',
    passwordMismatch: 'Passwords do not match',
    registerFailed: 'Registration failed',
    loginFailed: 'Login failed',
    success: 'Success',
    registerSuccess: 'Registration successful! You can now log in.',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signInWithGoogle: 'Continue with Google',
    or: 'or',
  },
  settings: {
    title: 'Setting',
    logout: {
      confirmTitle: 'Log Out',
      confirmMessage: 'Are you sure you want to log out?',
    },
    dev: {
      options: 'Developer Options',
      title: 'Developer Settings',
      store: 'Store Management',
      resetStore: 'Reset Stores',
      resetDatabase: 'Reset Database',
      network: 'Network',
      apiCalls: 'API Call Logs',
      serverStatus: 'Server Status',
      appStatus: 'App Status',
      appVersion: 'App Version Info',
      logs: 'View Logs',
      memberInfo: 'Member Information',
      loadMemberInfo: 'Load Member Information',
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
      smaller: 'Smaller',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      larger: 'Larger',
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
    },
    qna: {
      title: 'Contact Us',
    },
  },
  onboarding: {
    welcome: {
      title: 'Hello!',
      description: 'Welcome to your daily journey',
      description2: 'Every day is a new page in your story',
      go: "Let's write it together?",
    },
    nickname: {
      title: 'Your story begins here',
      description: 'What name would you like to use for your story?',
      placeholder: 'Enter your nickname',
    },
    intro: {
      title: 'Emotion Recording with MoodLog',
      subtitle: 'Key Features of MoodLog',
      feature: {
        1: 'Record your emotions daily',
        2: 'Create and manage your own emotions',
        3: 'View emotion changes at a glance with the calendar',
        4: 'Analyze your emotion patterns with statistics',
        5: 'Your valuable records are automatically backed up',
      },
      note: {
        1: 'Tips for using MoodLog',
        2: 'Recording emotions at the same time every day helps track your emotional patterns more accurately.',
        3: 'Create your own emotion names and colors for a more personalized emotion diary.',
        4: 'Use the statistics feature to objectively examine changes in your emotions.',
      },
    },
  },
  signup: {
    title: 'Create Your Account',
    description: 'Join us to start your journey',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    confirmPasswordPlaceholder: 'Confirm your password',
    validation: {
      emailRequired: 'Email is required',
      invalidEmail: 'Please enter a valid email',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
    },
  },
  warn: {
    createMood: {
      name: {
        1: 'Emotions can only be created up to 4 at a time.',
        2: 'Emotion names can only be up to 10 characters.',
      },
      color: {
        1: 'Emotion colors can only be selected up to 3 at a time.',
      },
    },
  },
}
