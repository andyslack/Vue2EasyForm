<h2 align="center">Vue2EasyForm</h2>

<p align="center">
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/v/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://npmcharts.com/compare/@me_slack/vue2easyform?minimal=true"><img src="https://img.shields.io/npm/dt/@me_slack/vue2easyform" alt="NPM"></a>
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/l/@me_slack/vue2easyform" alt="NPM"></a>
</p>

Vue2EasyForm is a Vue2 component which makes working with forms very easy indeed.

Simply pass the [Form Prop](#props) into the component and it will [Emit Events](#events) as they happen.

On submit it will validate the inputs and return [@error](#@error) or if successful a [@submit](@submit) {key:value} object.

* [ ] Image (small video/gif)

## Install

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

## Dependencies

- We require the [Vuesax 3 framework](https://lusaxweb.github.io/vuesax/development/#quick-start-cdn)

## Usage

```javascript
import VueEasyForm from "@me_slack/vue2easyform"

data: () => ({
    contact_form: {
        fields:{
            email: {
                value: '',
                input: {
                    type: 'email',
                    placeholder: 'Email',
                },
                required: true
            }
        },
        submit: {
            label: 'Send Email'
        }
    },
})
```

```html
<VueEasyForm :form="conact_form" @submit="sendEmail" @updated_email="updateEmail"></VueEasyForm>
```

## Props

The only prop you need is `form` this is the JSON object which builds out the form fields, buttons, etc.

This is made up as follows:

- error_message: string - if the field failed validation
- validation: {min: int, max: int}
- value: <mixed> - holds the current value of the field


| Property         | Type      | Required | Description                                                                                                                                                 | Div #id              |
| ------------------ | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| [fields](#fields) | `object`  | `true`   | An object holding a number of field objects.<br /> <br /> Options include: `input`, `textarea`, `dropdown`,  <br /> `checkbox`, `module`, `button`, `submit` | `vef_fields`         |
| [submit](#submit)  | `object` |         | If you wish to show a submit button which validates <br /> the inputs and returns the [@error](#@error) or <br /> the [@submit](@submit) {key:value} object.                                                                                                                                                      |                      |

## Fields

Include your fields name as the key and the following data as the object, for example:

```javascript
fields:{
    email: {
        value: 'me@me.com'
    }
}
```

This is the `key` you will get back in any [events](#events). For example: 

```javascript
{
    email: 'me@me.com'
}
```

You can pass the following values:

| Property         | Type      | Required | Description
| `<mixed>`        | `object`  |  `true`  | See below for a list of available field types.| See below | 
| `value`          | `<mixed>` | `true`   | The property which holds the user input.                                          |                      |
| `loading`        | `boolean` |          | Show a loading spinner in place of the field.<br /> <br /> Helpful if you are populating from an API                                                        | `vef_loading_${key}` |
| `description`    | `string`  |      | Show the user a message below the field.                                       |       `vef_description`               |
| `required ` | `boolean`       |          |  If this a required field                                                                                                                                                       |                      |
| `disabled` | `boolean`       |          |   If the field should be disabled                                                                                                                                                          |                      |
| `success`  | `boolean`       |          |  If the field has been successfully validated   |                      |
| `error` | `boolean`       |          |   If the field has failed validation    |                      |
| `error_message`| `string`       |          | The error message | `vef_error_message` | 


###input

| Property | Type | Required | Description | Div #id |
| ---------- | ------ | ---------- | ------------- | --------- |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |

https://vuesax.com/docs/components/Input.html#api

- icon (string - the actual class eg. bx bxs-heart))

####Example:

```json5

```

###Text Area
https://lusaxweb.github.io/vuesax/components/textarea.html


| Property | Type | Required | Description | Div #id |
| ---------- | ------ | ---------- | ------------- | --------- |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |

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


| Property | Type | Required | Description | Div #id |
| ---------- | ------ | ---------- | ------------- | --------- |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |

####Example:

```json5

```

###checkbox


| Property | Type | Required | Description | Div #id |
| ---------- | ------ | ---------- | ------------- | --------- |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |

https://lusaxweb.github.io/vuesax/components/checkbox.html#change-icon

- disabled (boolean)
- color (defualts to primary)
- i (-pack (string defualts to bx) icon (string - the actual class eg. bx bxs-heart defualts to bx-check))

####Example:

```json5

```

#### button


| Property | Type | Required | Description | Div #id |
| ---------- | ------ | ---------- | ------------- | --------- |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |

- label
- i (-before (boolean) - after (boolean) - icon (string - the actual class eg. bx bxs-heart))

###Module

Modules are pre-build form options which you can reuse by just specifying the name:

Options are


| Property | Type | Required | Description | Div #id |
| ---------- | ------ | ---------- | ------------- | --------- |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |

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


| Property | Type | Required | Description | Div #id |
| ---------- | ------ | ---------- | ------------- | --------- |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |
| ` `      | ` `  |          |             |         |

- label: string - The text for the button
- i (-before (boolean) - after (boolean) - icon (string - the actual class eg. bx bxs-heart))

####Example:

```json5

```

## Shared

The following are reused elements

### Icons



## Events

The following events will be emitted to allow maximum flexibility to your application:

### @submit

- a validated JSON

'updated_{{field}}'

- a validated output

'updated'

- unvalidated live JSON object

'clicked'

- the name of the button clicked

### @error

- returns validation errors for you to handle as they happen (multiple error $emits per form submissios)

## Examples

You can run the example as follows:

```shell
cd examples && npm install && npm run serve
```

Also available on [CodeSandbox.io](https://codesandbox.io/s/dazzling-mountain-lhhwu)

##Shell Script

```todo```
