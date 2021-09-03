<template>
    <!--VueEasyForm Start-->
    <div id="vef_container">
        <div v-if="localform.fields" id="vef_fields">
            <div
            v-for="[key, field] of Object.entries(localform.fields)"
            :key="key"
            id="vef_field_div"
          >

                <div v-if="field.loading" :id="`vef_loading_${key}`">
                     <box-icon name='loader' animation='spin'></box-icon>
                </div>
                <div
                    :id="`vef_field_${key}`"
                    v-else>

                    <vs-input
                            v-if="field.input"
                            v-model="field.value"
                            :id="`vef_input_${key}`"
                            :name="key"
                            :placeholder="field.input.placeholder"
                            :label-placeholder="field.input['label-placeholder']"
                            :label="field.input.label"
                            :type="field.input.type"
                            :state="field.error ? 'danger' : field.success ? 'success' : null "
                            :required="field.required"
                            :disabled="field.disabled"
                            :danger="field.error"
                            :success="field.success"
                            :icon="field.input.i ? field.input.i.icon : null"
                            :icon-pack="field.input.i ? field.input.i.pack : null"
                            :val-icon-danger="field.input.i_error ? field.input.i_error.icon : 'bx-error'"
                            :val-icon-success="field.input.i_success ? field.input.i_success.icon : 'bx-check'"
                            :val-icon-pack="field.input.i_error ? field.input.i.i_error.pack : 'bx'"
                            :icon-after="field.input.i ? field.input.i.after : null"
                            @keyup="keyupValueByKey({key: key, value: field.value})"
                            @blur="updateValueByKey({key: key, value: field.value})"
                    >
                        </vs-input>

                    <vs-textarea
                        v-if="field.textarea"
                        v-model="field.value"
                        :id="`vef_textarea_${key}`"
                        :label="field.textarea.label"
                        :counter="field.textarea.counter"
                        :width="field.textarea.width"
                        :height="field.textarea.height"
                    />

                    <vs-select
                            v-if="field.dropdown"
                            v-model="field.value"
                            :id="`vef_dropdown_${key}`"
                            :label="field.dropdown.label"
                            :multiple="field.dropdown.multiple"
                            :icon="field.dropdown.i ? field.dropdown.i.icon ? field.dropdown.i.icon : null : null"
                            :icon-pack="field.dropdown.i ? field.dropdown.i.pack ? field.dropdown.i.pack : null : null"
                            :state="field.error ? 'danger' : field.success ? 'success' : null "
                            @changed="updateValueByKey"
                        >
                                <vs-select-item
                                    v-for="item of field.dropdown.options"
                                    :key="item.value"
                                    :value="item.value"
                                    :text="item.name">
                                </vs-select-item>

                            </vs-select>

                    <vs-checkbox
                            v-if="field.checkbox"
                            v-model="field.value"
                            :id="`vef_checkbox_${key}`"
                            :disabled="field.disabled ? field.disabled : null"
                            :color="field.checkbox.color"
                            :icon="field.checkbox.i ? field.checkbox.i.icon ? field.checkbox.i.icon : 'bx-check' : 'bx-check'"
                            :icon-pack="field.checkbox.i ? field.checkbox.i.pack ? field.checkbox.i.pack : 'bx' : 'bx'"
                            @changed="updateValueByKey"
                        >
                        <span
                            v-if="field.checkbox.label"
                            :id="`vef_checkbox_label_${key}`"
                            v-html="field.checkbox.label"
                        ></span>
                    </vs-checkbox>

                    <vs-button
                           v-if="field.button"
                           :id="`vef_button_${key}`"
                           @click="buttonClicked(key)"
                           :disabled="field.disabled ?field.disabled : false"
                       >
                        <i v-if="record.button.i && !record.button.i.after" :class="record.button.i.icon" :id="`vef_button_icon_before_${key}`"></i>
                           {{field.button.label}}
                        <i v-if="record.button.i && record.button.i.after" :class="record.button.i.icon" :id="`vef_button_icon_after_${key}`"></i>
                    </vs-button>

                    <FormModule
                        v-if="field.module"
                        :id="`vef_module_${key}`"
                        :record="field"
                        :index="key"
                        :danger="field.error"
                        :success="field.success"
                        @changed="updateValueByKey"
                    ></FormModule>

                     <div v-if="field.error" id="vef_error_message">
                        {{ field.error_message }}
                    </div>

                    <div v-else id="vef_description">
                        {{ field.description }}
                    </div>

                </div>

            </div>
        </div>
        <div v-if="localform.submit"
             id="vef_submit"
        >
            <vs-button
                id="vef_submit_button"
                @click="submit"
            >
                <i v-if="localform.submit.i && !localform.submit.i.after" :class="localform.submit.i.icon" id="vef_submit_icon_before"></i>
                {{ localform.submit.label }}
                <i v-if="localform.submit.i && localform.submit.i.after" :class="localform.submit.i.icon" id="vef_submit_icon_after"></i>

            </vs-button>
        </div>
    </div>
    <!--VueEasyForm End-->
</template>

<script>
let Validator = require('validatorjs');
import FormModule from "./views/_form_module.vue";

export default {
    name: "VueEasyForm",
    components: {
        FormModule
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
        this.setupForm({...this.form})
    },
    methods: {
        submit() {
            this.buttonClicked('submit')

            if (this.validateForm()) {
                let data = {}
                if(this.localform.fields){
                    for (const [key, field] of Object.entries(this.localform.fields)) {
                        data[key] = field.value
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

            if(field.required){
                validations.push('required')
            }

            if (field.input && field.input.type) {
                switch (field.input.type) {
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

            if (field.textarea) {
                validations.push('string')
            }

            if(field.validation){
                if(field.validation.min){
                    validations.push(`min:${field.validation.min}`)
                }

                if(field.validation.max){
                    validations.push(`min:${field.validation.max}`)
                }
            }

            let validation = new Validator({[key]: field.value}, {[key]: validations})

            if(validation.fails()){
                field_passed = false
                this.localform.fields[key].success = false
                this.localform.fields[key].error = true
                this.localform.fields[key].error_message = validation.errors.first(key)
                this.$emit('error', {[key]: validation.errors.first(key)})
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
        },

        setupForm(form){
            this.localform = form
            if(this.localform.fields){
                //check if we have values passed in and if so, validate them
                for (const [key, field] of Object.entries(this.localform.fields)) {
                    if(field.value){
                        this.validateField(key, field)
                    }
                }
            }

        }
    },
    watch: {
        form(newForm) {
            this.setupForm({...newForm})
        },
    },
};
</script>
