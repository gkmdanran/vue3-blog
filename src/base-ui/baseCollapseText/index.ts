import baseCollapseText from './src/index.vue'
import { App } from 'vue'
baseCollapseText.install = function (app: App) {
  app.component(baseCollapseText.name, baseCollapseText);
};
export default baseCollapseText;