import vuetify from "./vuetify";
import { createPinia } from "pinia";

export const registerPlugins = (app) => {
  app.use(vuetify);
  app.use(createPinia());
};
