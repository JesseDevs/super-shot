import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { firebaseApp } from '@/firebase';

import './css/style.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()],
});

app.mount('#app');
