import { createApp } from 'vue';
import i18n from "@/i18n.js";
import router from "./router/index.js";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import {Button, Card} from "primevue";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

// Router
app.use(router);

// PrimeVue
app.use(PrimeVue, { theme: { preset: Aura }, ripple: true })
    .component('pv-button', Button)
    .component('pv-card', Card);
    /****** ADD ALL COMPONENTS ******/

// i18n
app.use(i18n);

app.mount('#app')