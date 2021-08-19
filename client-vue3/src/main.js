import App from './App.vue'
import { createApp } from 'vue'
import mitt from 'mitt'
import vuetify from './plugins/vuetify'
import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin";
//import UUID from "vue-uuid";

const emitter = mitt()
let app = createApp(App)
app.config.globalProperties.emitter = emitter
app.use(VueMasonryPlugin)
app.use(vuetify)
//app.use(UUID);

app.mount('#app')

