import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import ValidatePlugin from './includes/install';

import './assets/tailwind.css'
import './assets/main.css'

createApp(App)
    .use(router)
    .use(store)
    .use(ValidatePlugin)
    .mount('#app')
