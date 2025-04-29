import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "@/public/pages/home.component.vue";
import AboutComponent from "@/public/pages/about.component.vue";
import NotfoundComponent from "@/public/pages/notfound.component.vue";

/**
 * Vue Router instance
 * @type {Router} Vue Router instance creation with default configs
 * @property {Object} history
 * @property {Array} routes
 */
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home', name: 'home', component: HomeComponent },
        { path: '/about', name: 'about', component: AboutComponent },
        { path: '/*', component: NotfoundComponent },

    ]
});

export default router;