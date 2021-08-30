<template>
    <div id="VEF_container"
        :class="localform.classes ? localform.classes : null"
        :style="localform.styles ? localform.styles : null"
    >
        <div v-if="localform.fields"
             id="VEF_fields"
             :class="localform.fields.classes ? localform.fields.classes : null"
             :style="localform.fields.styles ? localform.fields.styles : null"
        >
            <div
            v-for="[key, field] of Object.entries(localform.fields)"
            :key="key"
            id="VEF_div"
            :class="field.div ? field.div.classes ? field.div.classes : null : null"
            :style="field.div ? field.div.styles ? field.div.styles : null : null"
          >

                <span v-if="field.loading">
                    <Loading id="VEF_loading" width="50"></Loading>
                </span>
                <span v-else>

                    <label
                        v-if="field.label && field.required.text"
                        id="VEF_label"
                        :class="field.label ? field.label.classes ? field.label.classes : null : null"
                        :style="field.label ? field.label.styles ? field.label.styles : null : null"
                    >{{ field.label.text }}
                    </label>

                    <label v-if="field.required && field.required.required"
                           id="VEF_required"
                           :class="field.required ? field.required.classes ? field.required.classes : null : null"
                           :style="field.required ? field.required.styles ? field.required.styles : null : null"
                    > {{field.required.text}}
                    </label>

                     <label
                         v-if="field.description && field.description.location && field.description.location === 'top'"
                         class="placeholder-label"
                         :class="field.description ? field.description.classes ? field.description.classes : null : null"
                         :style="field.description ? field.description.styles ? field.description.styles : null : null"
                     >
                        {{ field.description.text }}
                    </label>

                        <input
                            id="VEF_input"
                            v-if="field.input"
                        :placeholder="field.placeholder"
                        :type="field.input.type"
                        :class="field.input ? field.input.classes ? field.input.classes : null : null"
                        :style="field.input ? field.input.styles ? field.input.styles : null : null"
                        v-model="field.value"
                        :required="field.required"
                        :disabled="field.disabled"
                        @keyup="updateValueByKey({key: key, value: field.value})"
                    />
                       <select
                           v-if="field.dropdown && !field.dropdown.model"
                           id="VEF_select"
                           v-model="field.value"
                           :disabled="field.disabled"
                           :required="field.required"
                           :class="field.dropdown.classes ? field.dropdown.classes : null"
                           :style="field.dropdown.styles ? field.dropdown.styles : null"
                           :multiple="field.dropdown.multiple"
                           @changed="updateValueByKey"
                       >
                                <option id="VEF_select_option" :key="index" :value="item.value" v-for="(item,index) in field.dropdown.options" :disabled="item.disabled">{{item.name}}</option>
                            </select>

                            <FormModels
                                id="VEF_select_model"
                                v-if="field.dropdown && field.dropdown.model"
                                :field="field"
                                :index="key"
                                @changed="updateValueByKey"
                            ></FormModels>



                        <input type="checkbox"
                               id="VEF_checkbox"
                            v-if="field.checkbox"
                            v-model="field.value"
                            :class="field.checkbox.classes ? field.checkbox.classes : null"
                            :style="field.checkbox.styles ? field.checkbox.styles : null"
                            :disabled="field.disabled ?field.disabled : false"
                            @changed="updateValueByKey"
                        >

                       <button
                           v-if="field.button"
                           id="VEF_button"
                           :class="field.button.classes ? field.button.classes : ''"
                           :style="field.button.styles ? field.button.styles : ''"
                           @click="buttonClicked(key)"
                           :disabled="field.disabled ?field.disabled : false"
                       >
                           {{field.button.label}}
                       </button>

                    <label
                        v-if="field.description && field.description.location && field.description.location === 'bottom'"
                        class="placeholder-label"
                        :class="field.description ? field.description.classes ? field.description.classes : null : null"
                        :style="field.description ? field.description.styles ? field.description.styles : null : null"
                    >
                        {{ field.description.text }}
                    </label>

                </span>

            </div>
        </div>
        <div v-if="localform.submit"
             id="VEF_submit"
            :class="submit.classes ? submit.classes : null"
            :style="submit.styles ? submit.styles : null"
        >
            <button
                v-if="localform.submit.button"
                id="VEF_submit_button"
                :class="submit.button.classes ? submit.button.classes : null"
                :style="submit.button.styles ? submit.button.styles : null"
                @click="submit()"
            >
                {{ localform.submit.button.label }}
            </button>
        </div>
    </div>
</template>

<script>
import * as Validator from 'validatorjs';
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
            let passed = this.validateForm()
            if (passed) {
                let data = {}
                if(this.localform.fields){
                    for (const [name, field] of Object.entries(this.localform.fields)) {
                        data[name] = field.value
                    }
                }
                this.$emit('submit', data)
                this.buttonClicked('submit')
            }
        },

        buttonClicked(key){
            this.$emit('form_button_clicked', key)
        },

        validateField(key, field){
            let field_passed = true
            if (field.input) {
                if (field.input.required) {
                    let validation = new Validator({[key]: field.value}, {[key]: ['required', 'string', field.input.validation.min ? `min:${field.input.validation.min}`: null, field.input.validation.max ? `max:${field.input.validation.max}`: null]})

                    if(validation.fails()){
                        field_passed = false
                        this.localform.fields[key].success = false
                        this.localform.fields[key].error = true
                        this.$emit('error', validation.errors.first(key))
                        return false
                    }
                }

                if(field.input.validation){
                    if (field.input.validation.type === 'url') {
                        let validation = new Validator({[key]: field.value}, {[key]: ['url']})
                        if(validation.fails()){
                            field_passed = false
                            this.localform.fields[key].success = false
                            this.localform.fields[key].error = true
                            this.$emit('error', validation.errors.first(key))
                            return false
                        }
                    }
                    if (field.input.validation.type === 'email') {
                        let validation = new Validator({[key]: field.value}, {[key]: ['email']})
                        if(validation.fails()){
                            field_passed = false
                            this.localform.fields[key].success = false
                            this.localform.fields[key].error = true
                            this.$emit('error', validation.errors.first(key))
                            return false
                        }
                    }
                }

                if(field_passed){
                    this.localform.fields[key].success = true
                    this.localform.fields[key].error = false
                }
            }
            if (field.dropdown) {
                if (field.dropdown.required) {

                    let validation = new Validator({[key]: field.value}, {[key]: ['required', 'string']})

                    if(validation.fails()){
                        field_passed = false
                        this.localform.fields[key].success = false
                        this.localform.fields[key].error = true
                        this.$emit('error', validation.errors.first(key))
                        return false
                    }
                }
            }
            return true
        },

        validateForm(){
            let passed = true

            for (const [key, field] of Object.entries(this.localform.fields)) {
                passed = this.validateField(key, field)
            }

            return passed
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
