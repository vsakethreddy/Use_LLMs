/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

/* import the necessary styles for Vue Flow to work */
import "@vue-flow/core/dist/style.css";

/* import the default theme, this is optional but generally recommended */
import "@vue-flow/core/dist/theme-default.css";

import { createVuetify, type ThemeDefinition } from "vuetify";



const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#fafafa",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
});
