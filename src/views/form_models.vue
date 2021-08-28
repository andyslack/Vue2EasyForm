<template>

    <div v-if="record.dropdown.model === 'timezone'">
        <TimezoneDropdown
            :timezone="record.value"
            :classes="record.dropdown.classes ? record.dropdown.classes : ''"
            :styles="record.dropdown.styles ? record.dropdown.styles : ''"
            @changed="updateRecord"
        >
        </TimezoneDropdown>
    </div>

</template>

<script>
import TimezoneDropdown from "src/model/dropdown/timezone";

export default {
    name: "FormModels",
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
