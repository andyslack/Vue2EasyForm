<h2 align="center">Vue2EasyForm</h2>

<p align="center">
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/v/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://npmcharts.com/compare/@me_slack/vue2easyform?minimal=true"><img src="https://img.shields.io/npm/dt/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/l/@me_slack/vue2easyform" alt="NPM"></a>
</p>


##Install

```shell
npm install @me_slack/vue2easyform@latest
```
We use the Vuesax 3 framework to power the form, please ensure you have this installed.

https://lusaxweb.github.io/vuesax/development/#quick-start-cdn

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
| Object | Type  | Required  | Description | #id |
|---|---|---|---|---|
| `description`  | `string` |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |
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
- pre: html - a hook to insert html immediately before the field
- post: html a hook to insert html immediately after the field

###input
https://vuesax.com/docs/components/Input.html#api

icon -> we use the https://boxicons.com/

###dropdown (array of options)
https://vuesax.com/docs/components/Select.html#api
 - model: ['timezone']
 - options - Array of objects
   - value 
   - name
   - disabled
 - multiple(boolean - default: false)

###checkbox

https://lusaxweb.github.io/vuesax/components/checkbox.html#change-icon

- disabled (boolean)
- color (defualts to primary)
- icon (boxicon)


##Submit
https://vuesax.com/docs/components/#api
- label: string - The text for the button

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