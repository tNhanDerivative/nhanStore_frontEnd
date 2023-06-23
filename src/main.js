import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL           //'apistore.nhan-thenoobmaster.com'

createApp(App).use(store).use(router, axios).mount('#app')
