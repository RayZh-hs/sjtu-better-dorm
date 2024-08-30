import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  defaults: {
    global: {
      ripple: true,
    },
    VSheet: {
      elevation: 4,
    },
  },
  theme: {
    defaultTheme: "light",
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
});
