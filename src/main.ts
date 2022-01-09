import { createApp, App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import routeApp from './App.vue'
import router from './router'
import store from './store'
import baseUi from './base-ui'
import globalRegister  from './global'
import './assets/css/global.css'
import 'element-plus/dist/index.css'
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
const app: App = createApp(routeApp)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(mavonEditor)
app.use(globalRegister)
app.use(baseUi)
app.use(store)
app.use(router)
app.mount('#app')
