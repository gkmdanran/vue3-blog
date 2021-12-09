import baseTable from './src/index.vue'
import { App } from 'vue'
baseTable.install = function (app: App) {
  app.component(baseTable.name, baseTable);
};
export default baseTable;