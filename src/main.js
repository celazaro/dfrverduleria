
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css';

createApp(App).use(store).use(router).mount('#app')

