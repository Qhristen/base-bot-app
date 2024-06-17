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
    show: ()=> void;
  };
  openLink: (url: string)=> void
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
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  point: number;
  activities: Activity[] | null;
  type: string;
}

export interface SpecialTask {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  point: number;
  activities: Activity[];
}

export interface Ref_Task {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  point: number;
  totalInvite: number;
}

export interface League_Task {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  point: number;
}

export interface Activity {
  id: string;
  link: string;
  userId: string;
  name: string;
  taskId: string;
}

export interface User_Activity {
  id: string;
  userId: string;
  taskId: string;
  activityId: string;
  clicked: boolean;
}

export interface User {
  id: string;
  created_at: Date;
  updated_at: Date;
  full_name: string;
  telegramUserId: string;
  telegramUserName: string;
  referralLink: string;
  referredBy: null;
  points: number;
  referalPoints: number;
  socialPoints: number;
  status: string;
  perclick: number;
  totalPoint: number;
  limit: number;
  refillSpeed: number;
  autoBotpoints: number;
  autobot: boolean;
  welcomePage: boolean;
  touches: number;
  max: number;
  fullEnergy: Response;
  multiTap: number;
  multiTapPoint: number;
  multiTapLevel: number;
  chargeLevel: number;
  refillPoint: number;
  refillLevel: number;
  tapGuru: Response;
  friendsReferred: number;
  lastInteraction: Date;
  league: string;
}

export interface Response {
  active: boolean;
  max: number;
  min: number;
}

export interface Referals {
  referredFrom: User;
  referredTo:   User;
  point:        number;
}

export interface Badge {
  id: string;
  name:   string;
  point: number;
}


export interface TouchPoint {
  id: number;
  clientX: number;
  clientY: number;
}

export interface IBoost {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  limit: number;
  max: number;
  point: number;
  type: string;
}

export interface IStats {
  totalUsers: number;
  onlineUsers: number;
  dailyUsers: number;
  totalPoints: number;
  totalTouches: number;
}


export interface SubmitType {
  name: string | undefined;
  taskId: string | undefined;
  userId: string | undefined;
  status: string | undefined;
  point: number | undefined;
  type: string | undefined;
}