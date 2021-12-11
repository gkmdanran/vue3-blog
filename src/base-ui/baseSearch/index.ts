import baseSearch from './src/index.vue'
import { App } from 'vue'
baseSearch.install = function (app: App) {
  app.component(baseSearch.name, baseSearch);
};
export default baseSearch;