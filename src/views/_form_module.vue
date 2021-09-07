<template>
    <div>
        <TimezoneDropdown v-if="record.module.type === 'timezone_dropdown'"
            :timezone="record.value"
            @changed="updateRecord"
        ></TimezoneDropdown>

        <CountryDropdown v-if="record.module.type === 'country_dropdown'"
                          :country="record.value"
                          @changed="updateRecord"
        ></CountryDropdown>
    </div>
</template>

<script>
import TimezoneDropdown from "./modules/timezone_dropdown.vue";
import CountryDropdown from "./modules/country_dropdown.vue";

export default {
    name: "FormModule",
    components: {
        TimezoneDropdown,
        CountryDropdown
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
