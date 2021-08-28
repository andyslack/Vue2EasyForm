import { defineComponent, h } from 'vue'
import VS from './views/form.vue'

export const Form = defineComponent({
    name: 'VueEasyForm',
    setup(props, { slots }) {
        return () => h('div', 'ok')
    }
})