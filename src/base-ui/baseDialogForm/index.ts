import baseDialogForm from './src/index.vue'
import { App } from 'vue'
baseDialogForm.install = function (app: App) {
  app.component(baseDialogForm.name, baseDialogForm);
};
export default baseDialogForm;