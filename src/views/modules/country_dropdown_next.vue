<template>

    <country-dropdown
        @onSelect="onChange"
        :preferredCountries="['us', 'ca', 'gb']"
        enableSearchField
        :defaultCountry="selected"
    ></country-dropdown>

</template>

<script>

import CountryDropdown from './country_dropdown/index.vue'
import {getCountry} from "../../functions/local";

export default {
name: "CountryDropdown",
    components: {
        CountryDropdown
    },
    props:{
        country: {
            type: String,
        },
    },
    data: () => ({
        selected: '',
    }),
    methods: {
        onChange(event) {
            this.$emit('changed', event)
        },
    },
    created() {
        if(this.country){
            this.selected = this.country
        }else{
            this.selected = getCountry().toLowerCase()
        }
    },
    watch: {
        country(){
            if(this.country){
                this.selected = this.country
            }
        },
    },
}

</script>
