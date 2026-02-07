import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SmartChef',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    allowNavigation: ['springboot-smartchef.onrender.com']
  }
};

export default config;
