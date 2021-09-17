<template>
    <vs-select
        v-model="selected"
        :autocomplete="field.module.autocomplete"
        :id="`vef_module_country_dropdown`"
        :icon="field.module.i ? field.module.i.icon ? field.module.i.icon : 'bx-chevron-down' : 'bx-chevron-down'"
        :icon-pack="field.module.i ? field.module.i.pack ? field.module.i.pack : 'bx' : 'bx'"
        @changed="changed"
    >
        <vs-select-item
            class="vef_module_country_dropdown_item"
            v-for="(value, key) of countries"
            :key="key"
            :value="key"
            :text="typeof value === 'object' ? value[0] : value">
        </vs-select-item>

    </vs-select>
</template>

<script>

import {getCountry} from "../../functions/local";
import { countries } from "./country_dropdown/assets/langs/en.json";

export default {
name: "CountryDropdown",
    components: {},
    props:{
        field: {
            type: Object,
        },
    },
    data: () => ({
        selected: '',
        countries: countries
    }),
    methods: {
        selectCountry(){
            if(this.field.value){
                if(countries[this.field.value.toUpperCase()]){
                    return this.field.value.toUpperCase()
                }
            }

            if(countries[getCountry(this.field.module.locale).toUpperCase()]){
                return getCountry(this.field.module.locale).toUpperCase()
            }

            return 'US'
        },
        changed(){
            this.$emit('changed', this.selected)
        }
    },
    created() {
        this.selected = this.selectCountry()
    },
    watch: {
        field(){
            this.selectCountry()
        },
        selected(){
            this.$emit('changed', this.selected)
        },
    },
}

</script>
