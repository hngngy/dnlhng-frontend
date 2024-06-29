import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
  Quasar,
  QToolbar,
  QBtn,
  QToolbarTitle,
  QAvatar,
  QSpace,
  QSeparator,
  QBtnDropdown,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QIcon,
  QInput,
  QPagination
} from 'quasar'
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(router)
app.use(Quasar, {
  components: {
    QToolbar,
    QBtn,
    QToolbarTitle,
    QAvatar,
    QSpace,
    QSeparator,
    QBtnDropdown,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QIcon,
    QInput,
    QPagination
  }
})

app.mount('#app')
