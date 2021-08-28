import { defineComponent, h, computed } from 'vue'

export default defineComponent({
    props: {
        form: {
            type: [Object]
        }
    },
    // () => h(...)
    setup(props, { slots } ) {
        return () => computed(() => {
            return h('div')
        }).value
    }
})