import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/global.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { library } from "@fortawesome/fontawesome-svg-core";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
