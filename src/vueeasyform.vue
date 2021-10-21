<template>
    <!--VueEasyForm Start-->
    <form
        :id="`vef_form_${localform.name}`"
        :style="localform.display ? `display: ${localform.display};` : null"
    >
        <div v-if="localform.fields" id="vef_fields">

            <vs-col
            v-for="field of localform.fields"
            :key="field.key"
            :id="`vef_field_div_${field.key}`"
            class="vef_field_div"
            :vs-lg="field.responsive ? field.responsive.lg ? field.responsive.lg : '12' : '12'"
            :vs-sm="field.responsive ? field.responsive.sm ? field.responsive.sm : '12' : '12'"
            :vs-xs="field.responsive ? field.responsive.xs ? field.responsive.xs : '12' : '12'"
          >
                    <div v-if="field.loading" :id="`vef_loading_${field.key}`">
                        <box-icon name='loader' animation='spin'></box-icon>
                    </div>
                    <div :id="`vef_field_${field.key}`" v-show="!field.hidden" v-else>

                        <div
                            v-if="field.section"
                            :id="`vef_section_${field.key}`"
                            :class="field.class ?  field.class : 'vef_section'"
                            :style="field.style"
                        >
                            <div v-if="field.section.hr_above" class="vef_section_hr_above"><hr></div>
                            <div v-if="field.section.header" :id="`vef_section_${field.key}_header`" class="vef_section_header">{{field.section.header}}</div>
                            <div v-if="field.section.text" :id="`vef_section_${field.key}_text`" class="vef_section_text">{{field.section.text}}</div>
                            <div v-if="field.section.hr_below" class="vef_section_hr_below"><hr></div>
                        </div>

                        <vs-input
                            v-if="field.input"
                            v-model="field.value"
                            :autocomplete="field.autocomplete"
                            :id="`vef_input_${field.key}`"
                            :name="field.key"
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
                            :class="field.class"
                            :style="field.style"
                            @keyup="keyupValueByField(field)"
                            @blur="updateValueByField(field)"
                        >
                        </vs-input>

                        <vs-textarea
                            v-if="field.textarea"
                            v-model="field.value"
                            :id="`vef_textarea_${field.key}`"
                            :autocomplete="field.autocomplete"
                            :label="field.textarea.label"
                            :counter="field.textarea.counter"
                            :width="field.textarea.width"
                            :height="field.textarea.height"
                            :class="field.class"
                            :style="field.style"
                            @keyup="keyupValueByField(field)"
                            @blur="updateValueByField(field)"
                        />

                        <vs-select
                            v-if="field.dropdown"
                            v-model="field.value"
                            :id="`vef_dropdown_${field.key}`"
                            :autocomplete="field.dropdown.autocomplete"
                            :label="field.dropdown.label"
                            :multiple="field.dropdown.multiple"
                            :icon="field.dropdown.i ? field.dropdown.i.icon ? field.dropdown.i.icon : null : null"
                            :icon-pack="field.dropdown.i ? field.dropdown.i.pack ? field.dropdown.i.pack : null : null"
                            :state="field.error ? 'danger' : field.success ? 'success' : null "
                            :class="field.class"
                            :style="field.style"
                            @change="updateValueByField(field)"
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
                            :id="`vef_checkbox_${field.key}`"
                            :autocomplete="field.autocomplete"
                            :disabled="field.disabled ? field.disabled : null"
                            :color="field.checkbox.color"
                            :icon="field.checkbox.i ? field.checkbox.i.icon ? field.checkbox.i.icon : 'bx-check' : 'bx-check'"
                            :icon-pack="field.checkbox.i ? field.checkbox.i.pack ? field.checkbox.i.pack : 'bx' : 'bx'"
                            :class="field.class"
                            :style="field.style"
                            @change="updateValueByField(field)"
                        >
                        <span
                            v-if="field.checkbox.label"
                            :id="`vef_checkbox_label_${field.key}`"
                            v-html="field.checkbox.label"
                        ></span>
                        </vs-checkbox>

                        <vs-button
                            v-if="field.button"
                            :id="`vef_button_${field.key}`"
                            @click="buttonClicked(field.key)"
                            :disabled="field.disabled ?field.disabled : false"
                            :class="field.class"
                            :style="field.style"
                        >

                            <i v-if="field.button.i && !field.button.i.after" :class="`${field.button.i.pack} ${field.button.i.icon} ${field.button.i.class ? field.button.i.class : null}`" :style="field.button.i.style ? field.button.i.style : null" :id="`vef_button_${field.key}_icon_before`"></i>
                            {{ field.button.label }}
                            <i v-if="field.button.i && field.button.i.after" :class="`${field.button.i.pack} ${field.button.i.icon} ${field.button.i.class ? field.button.i.class : null}`" :style="field.button.i.style ? field.button.i.style : null" :id="`vef_button_${field.key}_icon_after`"></i>

                        </vs-button>

                        <FormModule
                            v-if="field.module"
                            :id="`vef_module_${field.key}`"
                            :field="field"
                            :index="field.key"
                            :danger="field.error"
                            :success="field.success"
                            :class="field.class"
                            :style="field.style"
                            @changed="updateValueByKeyPair"
                        ></FormModule>

                        <div v-if="field.submit"
                             id="vef_submit"
                        >
                            <vs-button
                                id="vef_submit_button"
                                :class="field.class"
                                :style="field.style"
                                @click="submitForm"
                            >
                                <i v-if="field.submit.i && !field.submit.i.after" :class="`${field.submit.i.pack} ${field.submit.i.icon} ${field.submit.i.class ? field.submit.i.class : null}`" :style="field.submit.i.style ? field.submit.i.style : null " id="vef_submit_icon_before"></i>
                                {{ field.submit.label }}
                                <i v-if="field.submit.i && field.submit.i.after" :class="`${field.submit.i.pack} ${field.submit.i.icon} ${field.submit.i.class ? field.submit.i.class : null}`" :style="field.submit.i.style ? field.submit.i.style : null" id="vef_submit_icon_after"></i>

                            </vs-button>
                        </div>

                        <div v-if="field.error" id="vef_error_message">
                            {{ field.error_message }}
                        </div>

                        <div v-else-if="field.success" id="vef_success_message">
                            {{ field.success_message }}
                        </div>

                        <div v-else id="vef_description">
                            {{ field.description }}
                        </div>

                    </div>

            </vs-col>
        </div>
    </form>
    <!--VueEasyForm End-->
</template>

<script>
import {log} from "./functions/logger"
const Validator = require('validatorjs')
import FormModule from "./views/_form_module.vue"

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
        log(this.form.debug, `VEF_INIT ${this.form.name}`, this.form);
        this.setupForm(this.form)
    },
    methods: {
        submitForm() {
            this.buttonClicked('submit')

            if (this.validateForm()) {
                let data = {}
                if(this.localform.fields){
                    for (const field of this.localform.fields) {
                        data[field.key] = field.value
                    }
                }
                log(this.localform.debug, `VEF_SUBMIT`, data);
                this.$emit('submit', data)
            }
        },

        buttonClicked(key){
            log(this.localform.debug, `VEF_CLICKED ${key}`);
            this.$emit('clicked', key)
        },

        validateForm(){
            let form_passed = true

            for (const f in this.localform.fields) {
                let result = this.validateField(f, this.localform.fields[f])
                if(!result){
                    form_passed = false
                }
            }

            return form_passed
        },

        validateField(f, field){

            let validations = []

            if(field.required){
                validations.push('required')
            }

            if (field.input && field.input.type && String(field.value).length > 0) {
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

            if (field.textarea && String(field.value).length > 0) {
                validations.push('string')
            }

            if(field.validation && String(field.value).length > 0){
                if(field.validation.min){
                    validations.push(`min:${field.validation.min}`)
                }

                if(field.validation.max && String(field.value).length > 0){
                    validations.push(`max:${field.validation.max}`)
                }

                if(field.validation.in && String(field.value).length > 0){
                    validations.push(`in:${field.validation.in}`)
                }
            }

            let validation = new Validator({[field.key]: field.value}, {[field.key]: validations})

            if(validation.fails()){
                this.localform.fields[f].success = false
                this.localform.fields[f].error = true
                this.localform.fields[f].error_message = this.localform.fields[f].error_message ? this.localform.fields[f].error_message : validation.errors.first(field.key)
                this.$emit('error', {[field.key]: this.localform.fields[f].error_message})
                log(this.localform.debug, `VEF_ERROR`,  {[field.key]: validation.errors.first(field.key)});
                return false
            }else if(this.localform.fields[f].input && this.localform.fields[f].value && this.localform.fields[f].value.length >= 1){
                this.localform.fields[f].success = true
                this.localform.fields[f].success_message = this.localform.fields[f].success_message ? this.localform.fields[f].success_message : null
                this.localform.fields[f].error = false
                return true
            }
            else{
                this.localform.fields[f].success = false
                this.localform.fields[f].error = false
                return true
            }
        },

        keyupValueByField(field){

            if(field.transform){

                if(field.transform.uppercase){
                    field.value = field.value.toUpperCase()
                }

                if(field.transform.lowercase){
                    field.value = field.value.toLowerCase()
                }

            }

            for(const f in this.localform.fields){
                if(field.key === this.localform.fields[f].key){
                    this.localform.fields[f].value = field.value
                }
            }

            this.$emit(`updated_${field.key}`, field.value)
            log(this.localform.debug, `VEF_UPDATED_${field.key.toUpperCase()}`,  field.value);
        },

        updateValueByField(field){
            for(const f in this.localform.fields){
                if(field.key === this.localform.fields[f].key){
                    this.localform.fields[f].value = field.value

                    if(this.validateField(f, field)){
                        this.$emit(`updated_${field.key}`, field.value)
                        log(this.localform.debug, `VEF_UPDATED_${field.key.toUpperCase()}`,  field.value);
                    }
                }
            }

            let data = {}

            for (const f of this.localform.fields) {
                data[f.key] = f.value
            }

            this.$emit('updated', data)
            log(this.localform.debug, `VEF_UPDATED`,  data);
        },

        updateValueByKeyPair(keypair){
            for(const f in this.localform.fields){
                if(keypair.key === this.localform.fields[f].key){
                    this.localform.fields[f].value = keypair.value

                    if(this.validateField(f, this.localform.fields[f])){
                        this.$emit(`updated_${keypair.key}`, keypair.value)
                        log(this.localform.debug, `VEF_UPDATED_${keypair.key.toUpperCase()}`,  keypair.value);
                    }
                }
            }

            let data = {}

            for (const f of this.localform.fields) {
                data[f.key] = f.value
            }

            this.$emit('updated', data)
            log(this.localform.debug, `VEF VEF_UPDATED`,  data);
        },

        setupForm(form){

            try {
                this.localform = {...form}

                if (this.localform.fields && this.localform.fields.length > 0) {

                    log(this.localform.debug, `VEF SETUP: ${this.localform.fields.length} fields found`);

                    for (const f in this.localform.fields) {
                        if (this.localform.fields[f].value) {
                            this.validateField(f, this.localform.fields[f])
                            log(this.localform.debug, `VEF SETUP: ${this.localform.fields[f].key} checked`);
                        }
                    }
                } else {
                    log(this.localform.debug, `VEF ERROR: No fields found`, this.localform.fields);
                }
            }catch (e) {
                log(this.localform.debug, `VEF ERROR: ${e.message}`,  e.stack);
            }
        }
    },
    watch: {
        form: {
            handler: function(n) {
                log(n.debug, `VEF_CHANGED ${n.name}`, n);
                this.setupForm(n)
            },
            deep: true,
            immediate: true
        },
    },
};
</script>
