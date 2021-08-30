<template>
    <div>
        <div v-if="localform.fields">
            <div
            v-for="[key, record] of Object.entries(localform.fields)"
            :key="key"
            :class="record.div.classes ? record.div.classes : ''"
            :style="record.div.styles ? record.div.styles : ''"
          >

            <div
                 :class="record.col && record.col.classes ? record.col.classes : 'col'"
                 :style="record.col && record.col.styles ? record.col.styles : ''"
            >

                <div v-if="record.loading">
                    <Loading width="50"></Loading>
                </div>
                <div v-else>

                    <label class="placeholder-label">{{ record.label }} </label>
                    <label v-if="record.input ? record.input.required : record.dropdown ? record.dropdown.required : false"
                           class="placeholder-label"
                           style="font-size: smaller; color: red;">&nbsp;&nbsp; (Required)
                    </label>

                    <div v-if="record.input">
                        <input
                        :placeholder="record.placeholder"
                        :type="record.input.type"
                        :class="record.input && record.input.classes ? record.input.classes : ''"
                        :style="record.input && record.input.styles ? record.input.styles : ''"
                        v-model="record.value"
                        :required="record.input.required ? record.input.required : false"
                        :disabled="record.disabled ? record.disabled : false"
                        @change="updateValueByKey({key: key, value: record.value})"
                    />
                    </div>

                    <div v-else-if="record.dropdown">

                        <div v-if="record.dropdown.model">
                            <FormModels :record="record" :index="key" @changed="updateValueByKey"></FormModels>
                        </div>

                        <div v-else>
                            <select
                                v-model="record.value"
                                :class="record.dropdown.classes ? record.dropdown.classes : ''"
                                :style="record.dropdown.styles ? record.dropdown.styles : ''"
                                :disabled="record.disabled ?record.disabled : false"
                                @changed="updateValueByKey"
                            >
                                <option :key="index" :value="item.value" v-for="(item,index) in record.dropdown.options" >{{item.name}}</option>
                            </select>
                        </div>

                    </div>

                    <div v-else-if="record.checkbox">
                        <input type="checkbox"
                            v-model="record.value"
                            :class="record.checkbox.classes ? record.checkbox.classes : ''"
                            :style="record.checkbox.styles ? record.checkbox.styles : ''"
                            :disabled="record.disabled ?record.disabled : false"
                            @changed="updateValueByKey"
                        >
                    </div>

                    <div v-else-if="record.button">
                       <button
                           :class="record.button.classes ? record.button.classes : ''"
                           :style="record.button.styles ? record.button.styles : ''"
                           @click="buttonClicked(key)"
                           :disabled="record.disabled ?record.disabled : false"
                       >
                           {{record.button.label}}
                       </button>
                    </div>

                    <label
                        v-if="record.description"
                        class="placeholder-label"
                        :class="record.description && record.description.classes ? record.description.classes : ''"
                        :style="record.description && record.description.styles ? record.description.styles : 'font-size: smaller; color: rgba(0,0,0,.4);'"
                    >
                        {{ record.description }}
                    </label>

                </div>

            </div>
        </div>
        </div>
        <div v-if="localform.submit"
            :class="submit.col && submit.col.classes ? submit.col.classes : 'col'"
            :style="submit.col && submit.col.styles ? submit.col.styles : ''"
        >
            <button
                :class="submit.classes ? submit.classes : ''"
                :style="submit.styles ? submit.styles : ''"
                @click="submit()"
            >
                {{ localform.submit.label }}
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
