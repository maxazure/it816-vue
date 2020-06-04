import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import {
  Form,
  Field,
  Button,
  Tabbar,
  TabbarItem,
  NavBar,
  List,
  Cell,
  Tabs,
  Tab,
  Icon,
  CellGroup,
  ActionSheet,
  Popup,
  Picker,
  Image,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
} from "vant";
import AudioVisual from "vue-audio-visual";
Vue.use(Form)
  .use(Field)
  .use(Button)
  .use(Icon)
  .use(CellGroup)
  .use(ActionSheet)
  .use(Popup);
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(List)
  .use(Cell)
  .use(Tabs)
  .use(Tab)
  .use(Image)
  .use(RadioGroup)
  .use(Radio)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Picker);
Vue.use(AudioVisual);
// Vue.use(axios)

Vue.prototype.$baseUrl = "https://s.nz100.vip";
// Vue.prototype.$baseUrl = "http://127.0.0.1:5000";

Vue.prototype.$http = axios;
//Vue.prototype.$router = router
Vue.config.productionTip = false;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  // new Vue({
  //   router,
  //   store,
  //   render: (h) => h(App),
  // }).$mount("#app");
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
