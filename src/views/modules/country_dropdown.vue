<template>
    <vs-select
        v-model="selected"
        autocomplete
        :id="`vef_module_country_dropdown`"
        :icon="i ? i.icon ? i.icon : 'bx-chevron-down' : 'bx-chevron-down'"
        :icon-pack="i ? i.pack ? i.pack : 'bx' : 'bx'"
        @changed="changed"
    >
        <vs-select-item
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
        country: {
            type: String,
        },
        i: {
            type: String,
        },
        locale: {
            type: String,
        }
    },
    data: () => ({
        selected: '',
        countries: countries
    }),
    methods: {
        selectCountry(){

            if(this.country){
                if(countries[this.country.toUpperCase()]){
                    return this.country.toUpperCase()
                }
            }

            if(countries[getCountry(this.locale).toUpperCase()]){
                return getCountry(this.locale).toUpperCase()
            }

            return 'US'
        },
        changed(){
            this.$emit('changed', this.selected)
        }
    },
    created() {
        this.selected = this.selectCountry()
        this.$emit('changed', this.selected) //on first load emit the selected country
    },
    watch: {
        country(){
            if(this.country){
                this.selected = this.country
            }
        },
        selected(){
            this.$emit('changed', this.selected)
        },
    },
}

</script>
