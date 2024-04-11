import { createApp } from "vue";
import App from "./App.vue";

import BaseCard from "./components/UI/BaseCard.vue";
import TheSpinner from "./components/UI/TheSpinner.vue";

const app = createApp(App);

app.component("BaseCard", BaseCard);
app.component("TheSpinner", TheSpinner);

app.mount("#app");
