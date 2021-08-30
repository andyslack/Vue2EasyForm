<template>
    <!--VueEasyForm Start-->
    <div id="vef_container">
        <div v-if="localform.fields" id="vef_fields">
            <div
            v-for="[key, field] of Object.entries(localform.fields)"
            :key="key"
            id="vef_div"
          >

                <span v-if="field.loading">
                    <Loading id="vef_loading" width="50"></Loading>
                </span>
                <span v-else>

                    <label
                        v-if="field.label && field.label.text"
                        id="vef_label"
                    >{{ field.label.text }}
                    </label>

                    <label v-if="field.required && field.required.required"
                           id="vef_required"
                    > {{field.required.text}}
                    </label>

                     <div
                         id="vef_description_top"
                         v-if="field.description && field.description.location && field.description.location === 'top'"
                     >
                        {{ field.description.text }}
                    </div>

                        <vs-input
                            id="vef_input"
                            v-if="field.input"
                            :name="key"
                        :placeholder="field.input.placeholder"
                        :type="field.input.type"
                        v-model="field.value"
                            :state="field.error ? 'danger' : field.success ? 'success' : null "
                        :required="field.required"
                        :disabled="field.disabled"
                            :danger="field.error"
                            :success="field.success"
                            :icon-before="field.input.icon ? field.input.icon.before ? field.input.icon.before : null : null"
                            :icon-after="field.input.icon ? field.input.icon.after ? field.input.icon.after : null : null"
                            @keyup="keyupValueByKey({key: key, value: field.value})"
                            @blur="updateValueByKey({key: key, value: field.value})"
                    >
                            <template #icon v-if="field.input.icon">
                                <i :class="`bx bx-${field.input.icon.bx}`"></i>
                            </template>
                        </vs-input>

                       <vs-select
                           v-if="field.dropdown && !field.dropdown.model"
                           id="vef_select"
                           v-model="field.value"
                           :disabled="field.disabled"
                           :required="field.required"
                           :multiple="field.dropdown.multiple"
                           :danger="field.error"
                           :success="field.success"
                           @changed="updateValueByKey"
                       >
                                <option id="vef_select_option" :key="index" :value="item.value" v-for="(item,index) in field.dropdown.options" :disabled="item.disabled">{{item.name}}</option>
                            </vs-select>

                            <FormModels
                                id="vef_select_model"
                                v-if="field.dropdown && field.dropdown.model"
                                :record="field"
                                :index="key"
                                :danger="field.error"
                                :success="field.success"
                                @changed="updateValueByKey"
                            ></FormModels>



                        <input type="checkbox"
                               id="vef_checkbox"
                            v-if="field.checkbox"
                            v-model="field.value"
                            :disabled="field.disabled ?field.disabled : false"
                            @changed="updateValueByKey"
                        >

                       <button
                           v-if="field.button"
                           id="vef_button"
                           @click="buttonClicked(key)"
                           :disabled="field.disabled ?field.disabled : false"
                       >
                           {{field.button.label}}
                       </button>

                    <div
                        v-if="!field.error && field.description && field.description.location && field.description.location === 'bottom'"
                        id="vef_description_bottom"
                    >
                        {{ field.description.text }}
                    </div>

                    <div
                        v-if="field.error"
                        id="vef_error_message"
                    >
                        {{ field.error_message }}
                    </div>

                </span>

            </div>
        </div>
        <div v-if="localform.submit"
             id="vef_submit"
        >
            <vs-button
                id="vef_submit_button"
                @click="submit"
            >
                {{ localform.submit.text }}
            </vs-button>
        </div>
    </div>
    <!--VueEasyForm End-->
</template>

<script>
let Validator = require('validatorjs');
import Loading from "./views/loading.vue";
import FormModels from "./views/form_models.vue";

export default {
    name: "VueEasyForm",
    components: {
        Loading,
        FormModels
    },
    props: {
        form: {
            type: Object,
            required: true
        },
    },
    data: () => ({
        localform: {}
    }),
    created: function () {
        this.localform = {...this.form}
    },
    methods: {
        submit() {
            this.buttonClicked('submit')

            if (this.validateForm()) {
                let data = {}
                if(this.localform.fields){
                    for (const [name, field] of Object.entries(this.localform.fields)) {
                        data[name] = field.value
                    }
                }
                this.$emit('submit', data)
            }
        },

        buttonClicked(key){
            this.$emit('clicked', key)
        },

        validateField(key, field){
            let field_passed = true

            let validations = []

            if(field.required && field.required.required){
                validations.push('required')
            }

            if (field.input) {

                if(field.input.type){
                    switch(field.input.type){
                        case 'text':
                            validations.push('string')
                            break
                        case 'url':
                            validations.push('url')
                            break
                        case 'email':
                            validations.push('email')
                            break
                    }
                }

                if(field.input.min){
                    validations.push(`min:${field.input.min}`)
                }

                if(field.input.max){
                    validations.push(`min:${field.input.max}`)
                }
            }

            let validation = new Validator({[key]: field.value}, {[key]: validations})

            if(validation.fails()){
                field_passed = false
                this.localform.fields[key].success = false
                this.localform.fields[key].error = true
                this.localform.fields[key].error_message = validation.errors.first(key)
                this.$emit('error', validation.errors.first(key))
                return false
            }

            this.localform.fields[key].success = true
            this.localform.fields[key].error = false
            return true
        },

        validateForm(){
            let passed = true

            for (const [key, field] of Object.entries(this.localform.fields)) {
                passed = this.validateField(key, field)
            }

            return passed
        },

        keyupValueByKey(result){
            this.localform.fields[result.key].value = result.value
            this.$emit(`updated_${result.key}`, result.value)
        },

        updateValueByKey(result){
            this.localform.fields[result.key].value = result.value

            let data = {}
            for (const [name, field] of Object.entries(this.localform.fields)) {
                data[name] = field.value
            }
            this.$emit('updated', data)

            if(this.validateField(result.key, this.localform.fields[result.key])){
                this.$emit(`updated_${result.key}`, result.value)
            }
        }
    },
    watch: {
        form(newForm) {
            this.localform = {...newForm}
        },
    },
};
</script>
