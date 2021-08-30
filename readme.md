<h2 align="center">Vue2EasyForm</h2>

<p align="center">
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/v/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://npmcharts.com/compare/@me_slack/vue2easyform?minimal=true"><img src="https://img.shields.io/npm/dt/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/l/@me_slack/vue2easyform" alt="NPM"></a>
</p>

## Introduction


Description

Image (small video/gif)


# INPUT object

```json5
{
    fields: {
        first_name: {
            label: 'First Name',
            description: 'This is where you add your first name',
            placeholder: 'First Name',
            input: {
                type: 'text',
            },
        },
    },
    submit: {
        label: 'Submit'
    }
}
```
## Fields
- label 'string'
- description {text, location=['top' 'bottom']}
- ['input', 'dropdown', 'checkbox', 'submit']: object, see below
- required: {required: boolean, text: string}
- disabled: boolean
- success: boolean
- error: boolean
- value: <mixed> holds the current value of the field
- loading: boolean

###input
- type ['text', 'url', 'email']
- min (number) - chars
- max (number) - chars
- icon {before: boolean, after: boolean, bx: 'string' - [boxicons](https://boxicons.com/) e.g. vuejs
- placeholder 'string'

###dropdown (array of options)
 - options - Array of objects
   - value 
   - name
   - disabled
 - multiple(boolean - default: false)


##Submit
- text
- 
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
cd example && npm install && npm run serve
```

Also available on [CodeSandbox.io](https://codesandbox.io/s/dazzling-mountain-lhhwu)