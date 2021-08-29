<template>
        <select
            v-model="selected"
            @change="onChange"
            :class="classes ? classes : ''"
            :style="styles ? styles : ''"
        >
            <option :key="index" :value="zone.tzCode" v-for="(zone, index) in timezones">{{zone.name}}</option>
        </select>
</template>

<script>
import json from "../../assets/timezones.json"

export default {
name: "TimezoneDropdown",
    props:{
        timezone: {
            type: String,
        },
        classes: {
            type: String,
        },
        styles: {
            type: String,
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
        if(this.timezone){
            this.selected = this.timezone
        }
    },
    watch: {
        timezone(){
            if(this.timezone){
                this.selected = this.timezone
            }
        },
    },
}

</script>
