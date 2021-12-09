import baseContainer from './src/index.vue'
import { App } from 'vue'
baseContainer.install = function (app: App) {
  app.component(baseContainer.name, baseContainer);
};
export default baseContainer;