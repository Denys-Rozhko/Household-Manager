import Vue from "vue";
import Vuelidete from "vuelidate";
import Paginate from "vuejs-paginate";
import VueMeta from "vue-meta";
import App from "./App.vue";
import router from "./router";
import messagePlugin from "@/util/messagePlugin";
import titlePlugin from "@/util/titlePlugin";
import store from "./store";
import tooltipDirective from "@/directives/tooltipDirective";
import dateFilter from "@/filters/dateFilter";
import localizeFilter from "@/filters/localizeFilter";
import currencyFilter from "@/filters/currencyFilter";
import Loader from "@/components/Loader";
import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidete);
Vue.use(VueMeta);
Vue.use(titlePlugin);
Vue.filter("dateTimeFormat", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);

Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyDlLhcgRsxmx3gw8fPyfeKUS5dB0vzYSAA",
  authDomain: "vue-crm-portfolio.firebaseapp.com",
  databaseURL: "https://vue-crm-portfolio.firebaseio.com",
  projectId: "vue-crm-portfolio",
  storageBucket: "vue-crm-portfolio.appspot.com",
  messagingSenderId: "640502670828",
  appId: "1:640502670828:web:4f2272c89c437c3ae94cc9"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
