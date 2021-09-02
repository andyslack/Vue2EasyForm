// Import vue component
import './assets/style.css';
import component from './vueeasyform.vue';
import { vsInput, vsButton, vsSelect, vsCheckbox, vsTextarea, vsSelectItem } from 'vuesax'

// Declare install function executed by Vue.use()
export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('VueEasyForm', component);
    Vue.use(vsInput);
    Vue.use(vsButton);
    Vue.use(vsSelect);
    Vue.use(vsSelectItem);
    Vue.use(vsCheckbox);
    Vue.use(vsTextarea);
}

// Create module definition for Vue.use()
const plugin = {
    install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default component;