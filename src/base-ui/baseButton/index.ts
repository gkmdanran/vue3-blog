import baseButton from './src/index.vue'
import { App } from 'vue'
baseButton.install = function (app: App) {
  app.component(baseButton.name, baseButton);
};
export default baseButton;