import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import { HTTP } from "@/services/index";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const token = localStorage.getItem("token");
if (token) {
    HTTP.defaults.headers.common.Authorization = `Bearer ${token}`;
}

HTTP.interceptors.response.use(undefined, function (err) {
    return new Promise((resolve, reject) => {
        if (err.message.indexOf("401") > 1) {
            store.dispatch("logout");
            resolve();
        }
        throw err;
    });
});

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);
Vue.use(Vuex);

var toastSheet;

Vue.mixin({
    methods: {
        showMessage(message, title, options) {

            if (!toastSheet) {
                const navHeight = document.querySelector("nav#top .navbar-nav").getBoundingClientRect().bottom;
                toastSheet = document.createElement("style");
                toastSheet.innerHTML = `.toast-height {margin-top:${navHeight}px}`;
                document.body.appendChild(toastSheet);
            }

            this.$root.$bvToast.toast(message, Object.assign({
                variant: "success",
                title: title,
                noCloseButton: !title,
                toastClass: "toast-height",
                toaster: "b-toaster-top-center"
            }, options));
        }
    }
});

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
