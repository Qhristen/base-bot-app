export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

export interface IWebApp {
  initData: string;
  sendData: (data: any) => void;
  showAlert: (data: any) => void;
  expand: () => void;
  initDataUnsafe: {
    query_id: string;
    user: ITelegramUser;
    auth_date: string;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: string;
  themeParams: {
    link_color: string;
    button_color: string;
    button_text_color: string;
    secondary_bg_color: string;
    hint_color: string;
    bg_color: string;
    text_color: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  isClosingConfirmationEnabled: boolean;
  headerColor: string;
  backgroundColor: string;
  BackButton: {
    isVisible: boolean;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
  };
  HapticFeedback: any;
}

export interface TaskType {
  id:         string;
  created_at: Date;
  updated_at: Date;
  name:       string;
  point:      number;
  activities: string[];
  type:       string;
}

export interface User {
  id:               string;
  created_at:       Date;
  updated_at:       Date;
  full_name:        string;
  telegramUserId:   string;
  telegramUserName: string;
  referralLink:     string;
  referredBy:       null;
  points:           number;
  referalPoints:    number;
  socialPoints:     number;
  friendsReferred:  number;
  lastInteraction:  Date;
  league:           string;
}

export interface TouchPoint {
  id: number;
  clientX: number;
  clientY: number;
}