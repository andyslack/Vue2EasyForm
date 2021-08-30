<template>
    <div id="app">
        <VueEasyForm :form="input" @submit="submit" @updated="updated" @updated_first_name="updated_first_name" />
        <pre>{{output}}</pre>
        <pre>{{first_name_keyup}}</pre>
    </div>
</template>

<script>
import VueEasyForm from "@me_slack/vue2easyform"

export default {
    name: "App",
    components: {
        VueEasyForm
    },
    data: () => ({
        output: {},
        input: {
            fields: {
                first_name: {
                    label: 'First Name',
                    description: 'This is where you add your first name',
                    placeholder: 'First Name',
                    value: '',
                    input: {
                        type: 'text',
                        classes: '',
                        styles: '',
                    },
                    div: {
                        classes: '',
                        styles: '',
                    },
                    col: {
                        classes: '',
                        styles: '',
                    },
                    success: false,
                    error: false,
                },
            },
            submit: {
              label: 'Submit'
            }
        },
        first_name_keyup: ''
    }),
    methods: {
        submit(value){
            this.output = value
        },
        updated(value){
            this.output = value
        },
        updated_first_name(first_name){
          this.first_name_keyup = first_name
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
