<template>
    <Form :form="contact_form"></Form>
</template>

<script>
import Form from "@me_slack/vueeasyform"

export default {
    name: 'Example Form',
    data: () => ({
        contact_form: {
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
        }
    }),
    components: {Form}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

