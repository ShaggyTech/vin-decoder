import { VuetifyPreset } from 'vuetify/types/services/presets';

const vuetifyConfig: Partial<VuetifyPreset> = {
  icons: {
    iconfont: 'mdiSvg',
    values: {},
  },
  customVariables: ['~/assets/variables.scss'],
  theme: {
    default: false,
    options: {},
    dark: true,
    disable: false,
    themes: {
      dark: {
        primary: '#21CFF3',
        accent: '#FF4081',
        secondary: '#FFE18D',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252',
        color__red: '#F44336',
        color__gray: '#9DA39A',
        color__green: '#7DCD85',

        /*******************************************************************************
         ** Custom Theme Colors
         ** https://coolors.co/375968-733d3d-925831-2a2a29-494949
         ** Change 'Alternative Shades' per color if you want to view light/dark variants
         ** white__ is not included in that link (limit of 5 on coolors.co)
         *******************************************************************************/
        // Navy Blue Variant
        primary__: '#314766',
        primary__lighten1: '#495E7D',
        primary__lighten2: '#6E8098',
        primary__darken1: '#1E3453',
        primary__darken2: '#0C1F3A',

        // Light Blue Variant
        secondary__: '#3E366B',
        secondary__lighten1: '#564F83',
        secondary__lighten2: '#7C76A1',
        secondary__darken1: '#292258',
        secondary__darken2: '#150F3D',

        tertiary__: '#2B6457',
        tertiary__lighten1: '#427A6E',
        tertiary__lighten2: '#68958B',
        tertiary__darken1: '#185245',
        tertiary__darken2: '#08392E',

        primary__light: '#465975',
        primary__dark: '#1D3557',
        // DUB Red Variant
        primary_red__: '#E63946',
        primary_red__light: '#EA5D67',
        primary_red__dark: '#93252D',

        secondary__light: '#5587A5',
        secondary__dark: '#396581',

        // Yellow Variant
        yellow__: '#E5E059',
        yellow__light: '#E8CDA1',
        yellow__dark: '#FFA500',

        purple__: '#64496D',
        purple__light: '#806A87',
        purple__dark: '#493650',

        // primary__: '#385A69', // DEEP SPACE SPARKLE
        // primary__light: '#607E8C', // STEEL TEAL
        // primary__dark: '#273F4A', // JAPANESE INDIGO

        // secondary__: '#733D3D', // ROAST COFFEE
        // secondary__light: '#8C6060', // ROSE TAUPE
        // secondary__dark: '#4A2727', // ACAJOU

        black__: '#151514', // LICORICE
        black__light: '#2A2A29', // CHARLESTON GREEN

        gray__: '#494949', // OUTER SPACE
        gray__light: '#9D9D9A', // SPANISH GRAY
        gray__dark: '#373736', // ONYX

        white__: '#F1FAEE', // HONEYDEW
        white__light: '#F7F7F6', // WHITE SMOKE
        white__dark: '#BDBAB3', // BLACK SHADOWS

        // Text Colors
        text__dark: '#F2F2F2',
        text__light: '#4A5669',
        text__red: '#CE2727',
        text__red__dark: '#991619',
        text__yellow: '#FFED54',
        text__green: '#11a85a',
      },
      light: {
        primary: '#1976D2',
        accent: '#e91e63',
        secondary: '#30b1dc',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252',
      },
    },
  },
};

export default vuetifyConfig;
