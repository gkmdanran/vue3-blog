import baseContainer from "./baseContainer";
import baseTable from "./baseTable";
import baseButton from "./baseButton";
import baseSearch from './baseSearch'
import { App } from 'vue'
const components = [baseContainer, baseTable, baseButton, baseSearch]
export default function (app: App) {
    components.forEach(component => {
        app.component(component.name, component);
    });
};