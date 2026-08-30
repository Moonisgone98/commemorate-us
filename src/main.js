import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import 'vant/lib/index.css'
import './style.css'

import {
  Tabbar, TabbarItem, NavBar, Cell, CellGroup, Field,
  Button, Empty, Icon, Popup, DatePicker,
  Dialog, Toast, Form
} from 'vant'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.use(Tabbar)
app.use(TabbarItem)
app.use(NavBar)
app.use(Cell)
app.use(CellGroup)
app.use(Field)
app.use(Button)
app.use(Empty)
app.use(Icon)
app.use(Popup)
app.use(DatePicker)
app.use(Dialog)
app.use(Toast)
app.use(Form)

app.mount('#app')
