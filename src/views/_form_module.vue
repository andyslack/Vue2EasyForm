<template>
        <div v-if="record.model === 'timezone_dropdown'">
            <TimezoneDropdown
                :timezone="record.value"
                @changed="updateRecord"
            >
            </TimezoneDropdown>
        </div>
</template>

<script>
import TimezoneDropdown from "./dropdown/timezone.vue";

export default {
    name: "FormModule",
    components: {
        TimezoneDropdown,
    },
    props:{
        index: {
            type: String,
            required: true
        },
        record: {
            type: Object,
            required: true
        },
    },
    methods: {
        updateRecord(value){
            let result = {key: this.index, value: value}
            this.$emit('changed', result)
        }
    },
};
</script>
