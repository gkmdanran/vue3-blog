import { App } from 'vue'
export default function registerProperties(app: App) {
    app.config.globalProperties.$filters = {
        formatTime(value: string): string {
            const dt: Date = new Date(value)
            const y: number | string = dt.getFullYear()
            const m: number | string = (dt.getMonth() + 1 + '').padStart(2, '0')
            const d: number | string = (dt.getDate() + '').padStart(2, '0')
            const h: number | string = (dt.getHours() + '').padStart(2, '0')
            const mm: number | string = (dt.getMinutes() + '').padStart(2, '0')
            const s: number | string = (dt.getSeconds() + '').padStart(2, '0')
            return `${y}-${m}-${d} ${h}:${mm}:${s}`
        }
    }
}