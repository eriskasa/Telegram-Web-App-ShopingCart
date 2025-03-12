export {}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        sendData: (data: string) => void;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name: string;
            username?: string;
            language_code?: string;
          }
        }
        themeParams: {
          bg_color?: string; 
          text_color?: string;
        }
      };
    };
  };
}