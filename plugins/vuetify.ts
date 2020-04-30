const vuetifyConfig = {
  customVariables: ['~/assets/variables.scss'],
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#21CFF3',
        accent: '#FF4081',
        secondary: '#FFE18D',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      },
      light: {
        primary: '#1976D2',
        accent: '#e91e63',
        secondary: '#30b1dc',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      }
    }
  }
};

export default vuetifyConfig;
