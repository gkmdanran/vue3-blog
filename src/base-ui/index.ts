import baseContainer from "./baseContainer";
import baseTable from "./baseTable";
import {App} from 'vue'
const components = [baseContainer,baseTable]
export default function (app: App) {
    components.forEach(component => {
        app.component(component.name, component);
    });
};