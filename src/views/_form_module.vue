<template>
    <div>
        <TimezoneDropdown v-if="field.module.type === 'timezone_dropdown'"
                        :timezone="field.value"
                        :field="field"
                        @changed="updateRecord"
        ></TimezoneDropdown>

        <CountryDropdown v-if="field.module.type === 'country_dropdown'"
                         :field="field"
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
        field: {
            type: Object,
            required: true
        },
    },
    methods: {
        updateRecord(value){
            this.$emit('changed',{key: this.field.key, value: value})
        }
    },
};
</script>
