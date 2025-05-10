import { createApp } from 'vue';
import i18n from "@/i18n.js";
import router from "./router/index.js";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import {Avatar, Button, Card, Dialog, Drawer, Menu, Menubar, SelectButton, Toolbar} from "primevue";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

// Router
app.use(router);

// PrimeVue
app.use(PrimeVue, { theme: { preset: Aura }, ripple: true })
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-dialog', Dialog)
    .component('pv-avatar', Avatar)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-drawer', Drawer)
    .component('pv-menu', Menu)
    .component('pv-menubar', Menubar)
    .component('pv-select-button', SelectButton)
    .component('pv-toolbar', Toolbar);

// i18n
app.use(i18n);

app.mount('#app')