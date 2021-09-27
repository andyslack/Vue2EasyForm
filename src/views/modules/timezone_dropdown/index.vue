<template>
    <vs-select
            v-model="selected"
            :autocomplete="field.module.autocomplete"
            :label="field.module.label"
            :icon="field.module.i ? field.module.i.icon ? field.module.i.icon : null : null"
            :icon-pack="field.module.i ? field.module.i.pack ? field.module.i.pack : null : null"
            :class="field.class"
            :style="field.style"
            @change="onChange"
            :id="`vef_module_timezone_dropdown`"
        >
        <vs-select-item
            v-for="(zone, index) in timezones"
            :key="index"
            :value="zone.tzCode"
            :text="zone.name">
        </vs-select-item>
    </vs-select>
</template>

<script>
import json from "./assets/timezones.json"

export default {
name: "TimezoneDropdown",
    props:{
        field: {
            type: Object,
        },
    },
    data: () => ({
        selected: '',
        timezones: json
    }),
    methods: {
        onChange(event) {
            this.$emit('changed', event)
        },
    },
    created() {
        if(this.field.value){
            this.selected = this.field.value
        }
    },
    watch: {
        field(){
            if(this.field.value){
                this.selected = this.field.value
            }
        },
    },
}

</script>
