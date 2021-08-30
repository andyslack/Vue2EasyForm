<template>
    <div id="app">
        <VueEasyForm :form="input" @submit="submitted" />
        <pre>{{output}}</pre>
    </div>
</template>

<script>
import VueEasyForm from "@me_slack/vue2easyform";

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
        }
    }),
    methods: {
        submitted(value){
            this.output = value
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
