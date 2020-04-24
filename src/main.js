import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { Form, Field, Button, Tabbar, TabbarItem,NavBar, List, Cell, Tabs, Tab, Icon, CellGroup, ActionSheet, Popup, Picker   } from 'vant';
import vuePlayerAudio from 'vue-player-audio'
Vue.use(Form).use(Field).use(Button).use(Icon).use(CellGroup).use(ActionSheet).use(Popup);
Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(List).use(Cell).use(Tabs).use(Tab).use(Picker);
Vue.use(vuePlayerAudio, { component: 'PlayerAudio' });
// Vue.use(axios)

Vue.prototype.$http = axios
//Vue.prototype.$router = router
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
