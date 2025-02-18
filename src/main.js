import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import "@mdi/font/css/materialdesignicons.css";


const vuetify = createVuetify();


// createApp(App).mount('#app')
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
