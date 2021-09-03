<h2 align="center">Vue2EasyForm</h2>

<p align="center">
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/v/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://npmcharts.com/compare/@me_slack/vue2easyform?minimal=true"><img src="https://img.shields.io/npm/dt/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/l/@me_slack/vue2easyform" alt="NPM"></a>
</p>


##Install

```shell
npm install --save @me_slack/vue2easyform@latest vuesax@^3
```

```javascript
import Vue from 'vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
```

```html
<link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css">
```
##Dependencies 
- We use the [Vuesax 3 framework](https://lusaxweb.github.io/vuesax/development/#quick-start-cdn) to power the form
- We use [boxicons](https://boxicons.com/usage) for rendering some of the modules

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
- ['input', 'dropdown', 'checkbox', 'module', 'submit']: object, see below
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

- icon (string - the actual class eg. bx bxs-heart))


####Example:
```json5

```

###Text Area
https://lusaxweb.github.io/vuesax/components/textarea.html


####Example:
```json5

```

###dropdown (array of options)
https://vuesax.com/docs/components/Select.html#api
 - options - Array of objects
   - value 
   - name
   - disabled
 - multiple(boolean - default: false)

####Example:
```json5

```

###checkbox

https://lusaxweb.github.io/vuesax/components/checkbox.html#change-icon

- disabled (boolean)
- color (defualts to primary)
- i (-pack (string defualts to bx) icon (string - the actual class eg. bx bxs-heart defualts to bx-check))

####Example:
```json5

```

#### button
- label
- i (-before (boolean) - after (boolean) - icon (string - the actual class eg. bx bxs-heart))


###Module

Modules are pre-build form options which you can reuse by just specifying the name:

Options are 

```todo/test```
- language dropdown (-mode -small (just symbols) - medium (just names) - large (names and symbols/shotcodes)) - options (array specify which ones to show otherwise all)
- countires (-mode -small (just flags) - medium (just names) - large (names and flags/names)) - options (array specify which ones to show otherwise all)
- address lookup (input not module) - bring modules out of dropdown into stand alone.
- `timezone_dropdown` - needs fixing/validating
- `markdown`



####Example:
```json5

```


##Submit
https://vuesax.com/docs/components/#api
- label: string - The text for the button

- i (-before (boolean) - after (boolean) - icon (string - the actual class eg. bx bxs-heart))

####Example:
```json5

```

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

##Shell Script

```todo```