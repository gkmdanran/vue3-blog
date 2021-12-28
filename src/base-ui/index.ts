import baseContainer from "./baseContainer";
import baseTable from "./baseTable";
import baseButton from "./baseButton";
import baseSearch from './baseSearch'
import baseDialogForm from './baseDialogForm'
import { App } from 'vue'
const components = [baseContainer, baseTable, baseButton, baseSearch, baseDialogForm]
export default function (app: App) {
    components.forEach(component => {
        app.component(component.name, component);
    });
};