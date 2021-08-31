<h2 align="center">Vue2EasyForm</h2>

<p align="center">
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/v/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://npmcharts.com/compare/@me_slack/vue2easyform?minimal=true"><img src="https://img.shields.io/npm/dt/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/l/@me_slack/vue2easyform" alt="NPM"></a>
</p>


##Install

```shell
npm install @me_slack/vue2easyform
```
We use the Vuesax 4 framework to power the form, please ensure you have the next version installed.

```shell
npm install vuesax@next
```

## Introduction


Description

Image (small video/gif)


# INPUT object

```json5
{
    fields: {
        first_name: {
            description: 'This is where you add your first name',
            
            input: {
                type: 'text',
               'label-placeholder': 'First Name',
            },
        },
    },
    submit: {
       label: 'Submit'
    }
}
```
## Fields
- description: string
- ['input', 'dropdown', 'checkbox', 'submit']: object, see below
- required: {required: boolean, text: string}
- disabled: boolean
- success: boolean
- error: boolean
- error_message: string - if the field failed validation
- loading: boolean
- validation: {min: int, max: int}
- value: <mixed> - holds the current value of the field

###input
https://vuesax.com/docs/components/Input.html#api

###dropdown (array of options)
https://vuesax.com/docs/components/Select.html#api
 - model: ['timezone']
 - options - Array of objects
   - value 
   - name
   - disabled
 - multiple(boolean - default: false)


##Submit
https://vuesax.com/docs/components/#api
- label: string - the button text 


##classes

##styles


Output table

###@emit

'submit'
- a validated JSON

'updated_{{field}}'
- a validated output

'updated'
- unvalidated live JSON object

'clicked'
- the name of the button clicked

'error'
- returns validation errors for you to handle

##Example

You can run the example as follows:

```shell
cd examples && npm install && npm run serve
```

Also available on [CodeSandbox.io](https://codesandbox.io/s/dazzling-mountain-lhhwu)