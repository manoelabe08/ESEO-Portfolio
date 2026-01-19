import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cei.resultats.app2025',
  appName: 'cei_resultats_2025',
  webDir: 'www',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  }
};

export default config;
