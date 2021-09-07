## Vue2EasyForm

<p style="text-align: center;">
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/npm/v/@me_slack/vue2easyform" alt="Version"></a>
<a href="https://npmcharts.com/compare/@me_slack/vue2easyform?minimal=true"><img src="https://img.shields.io/npm/dt/@me_slack/vue2easyform" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@me_slack/vue2easyform"><img src="https://img.shields.io/bundlephobia/minzip/@me_slack/vue2easyform/latest" alt="Size"></a>
<a href="https://github.com/andyslack/Vue2EasyForm/issues"><img src="https://img.shields.io/github/issues-raw/andyslack/vue2easyform" alt="Issues"></a>

</p>

Vue2EasyForm is a Vue2 component which makes working with forms very easy indeed.

Simply pass the [Form Prop](#props) into the component and it will [Emit Events](#events) as they happen.

On submit it will validate the inputs and return [@error](#@error) or if successful a [@submit](#submit) {key:value} object.

* [ ] Image (small video/gif)

## Install

```shell
npm install --save @me_slack/vue2easyform@latest vuesax@^3 @boxicons@^2
```

```javascript
import Vue from 'vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
```

```html
<link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css">
```

## Required Dependencies

- We require the [Vuesax 3 framework](https://lusaxweb.github.io/vuesax/development/#quick-start-cdn).

## Optional Dependencies

- We recommend [Boxicons](https://boxicons.com/) and use it as fallbacks in places.

## Usage

```javascript
import VueEasyForm from "@me_slack/vue2easyform"

data: () => ({
    contact_form: {
        name: 'contact_form',
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

| Property         | Type      | Required | Description                                                                                                                                                 | Div #id              |
| ------------------ | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| name | `string`  | `true`   | Used to help differentiate between multiple forms on the same page | `vef_form_${name}`   |
| [fields](#fields) | `object`  | `true`   | An object holding a number of field objects.<br /> <br /> Options include: `input`, `textarea`, `dropdown`,  <br /> `checkbox`, `module`, `button`, `submit`, `markdown`, `submit` | `vef_fields`         |

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

| Property         | Type      | Required | Description | Div #id |
| ------------------ | ----------- | ---------- | --------------------------------------------------------------------------------- | ---------------------- |
| `<mixed>`        | `object`  |  `true`  | We currently support the following fields: <br /><br /> [input](#input), [textarea](#textarea), [dropdown](#dropdown), [checkbox](#checkbox), [button](#button), [module](#module), [markdown](#markdown), [submit](#submit) |  `vef_field_${key}` |
| `value`          | `<mixed>` | `true`   | The property which holds the user input.                                          |                      |
| `loading`        | `boolean` |          | Show a loading spinner in place of the field.<br /> <br /> Helpful if you are populating from an API                                                        | `vef_loading_${key}` |
| `description`    | `string`  |      | Show the user a message below the field.                                       |       `vef_description`               |
| `required ` | `boolean`       |          |  If this a required field                                                                                                                                                       |                      |
| `disabled` | `boolean`       |          |   If the field should be disabled                                                                                                                                                          |                      |
| `responsive` | `object`       |          |  Allows you to set the width of the column ```{lg: 6, sm: 12, xs: 12}```                                                                                                                                                          |                      |
| `class` | `string`       |          |  Allows you to pass in classes dynamically                                                                                                                                                           |                      |
| `style` | `string`       |          |  Allows you to pass in styles dynamically                                                                                                                                                               |                      |
| `success`  | `boolean`       |          |  If the field has been successfully validated   |                      |
| `error` | `boolean`       |          |   If the field has failed validation    |                      |
| `error_message`| `string`       |          | The error message | `vef_error_message` |
| [validation](#validation)  | `object` | | Pass additional validation params, see [validation](#validation)  | |                                                                                                                                                 |                      |
| [transform](#transform)  | `object` | | Pass additional transformation params, see [transform](#transform) | |

### Input

A field with the Div #id `vef_input_${key}`

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `type`      | `string`  |   `true`       | Currently supports `text` `email` `url` |         
| `label`      | `string`  |          |    The label of the input         |         
| ` placeholder`      | ` string`  |          |             |         
| `label-placeholder	`      | `string`  |          |             |         
| `i`      | `object`  |          | [See Icon](#icons)     |         |
| `i_success`      | `object `  |          | [See Icon](#icons),  defaults to `bx bx-check` |         
| `i_error`      | ` object`  |          |   [See Icon](#icons),  defaults to `bx bx-error`    |         


#### Example:

```json5
{
    email: {
        type: 'email',
        label: 'Email Address',
        value: 'me@me.com',
        placeholder: 'jon.doe@email.com',
    }
}
```

### Textarea

A field with the Div #id `vef_textarea_${key}`

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `label`      | `string`  |        | The label of the textarea.  |   
| `counter`      | `Number`  |        | Determines the maximum number of characters.  |   
| `width`      | `string`  |        | Set the width of the textarea  |   
| `height`      | `string`  |        | Set the width of the textarea   |   

#### Example:

```json5
{
    message: {
        label: 'Message',
        counter: 150
    }
}
```

### Dropdown

A field with the Div #id `vef_dropdown_${key}`

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `label`      | `string`  |        | The label of the dropdown.  | 
| `options`      | `array`  |  `true`      | The dropdown options passed as an array.  | 
| `multiple`      | `boolean`  |        | Determines whether the selection is of multiple selection.  | 
| `autocomplete`      | `boolean`  |        | Enables the use of autocomplete in the select.  | 
| `i`      | `object`  |          | Element icon [See Icon](#icons)     |         |

#### Example:

```json5
{
   label: "Do you want a truth or dare?",
   options: [{value: 'TRUTH', name: "Truth"}, {value: 'DARE', name: "Dare"}]
}
```

### Checkbox

A field with the Div #id `vef_checkbox_${key}`

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `label`      | `string`  |         | If you wish to add a label to the checkbox, Div #id `vef_checkbox_label_${key}` |  
| `color`      | `string`  |         | Color options for checkBox. |  
| `i`      | `object`  |          | [See Icon](#icons) defaults to bx-check   |

#### Button

An input field with the Div #id `vef_input_${key}`

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `label`      | `string`  |         | The text for the button |  
| `i`      | `object`  |          | [See Icon](#icons)   |

### Module

Modules are pre-built form options which can reused with the Div #id `vef_module_${key}`, support types are:

`timezone_dropdown`, `country_dropdown`

An input field 

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `type`      | `string`  |   `true`       | The type of module to render |  

Pass the following properities depending on the type:

#### timezone_dropdown

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `timezone`      | `string`  |         | The timezone you wish to set as the default |  

#### country_dropdown

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `country`      | `string (ISO2)`  |         | The country you wish to set as the default,  if not passed we will <br> attempt to lookup from browser settings.  |  




* [ ] language dropdown (-mode -small (just symbols) - medium (just names) - large (names and symbols/shotcodes)) - options (array specify which ones to show otherwise all)
* [ ] countires (-mode -small (just flags) - medium (just names) - large (names and flags/names)) - options (array specify which ones to show otherwise all)
* [ ] address lookup - Will need to look for external modules
* [ ] google maps - show on a map the location passed (will require google api keys to be passed)
* [ ] `markdown`
* [ ] light/dark switcher

#### Example:

```json5
{
    type: 'timezone_dropdown'
}
```

### Markdown

A field with the Div #id `vef_markdown_${key}`

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `markdown`      | `strong`  |        | Some markdown to print to screen |    

#### Example:

```json5
{
    markdown: '# H1 ## H2 ### H3'
}
```

## Submit

The forms submit button with Div #id `vef_submit` and `vef_submit_button`

| Property | Type | Required | Description |
| ---------- | ------ | ---------- | ------------- | 
| `label`      | `string`  |         | The text for the button |  
| `i`      | `object`  |          | [See Icon](#icons)   |


#### Example:

```json5
{
    label: "Submit"
}
```

## Shared

The following are reused elements

### Validation

We are using [ValidatorJS](https://www.npmjs.com/package/validatorjs) for validation. 

| Property | Type | Description |
| ---------- | ------ | ---------- |
| `min`      | `number`  |  Validate that the value is at least a given size.  |  
| `max`      | `number`  |  Validate that the value  is no greater than a given size.  |
| `in`      | `array`  |  Validate that the value is in array, e.g. `['truth', 'dare']`  |

* [ ] Add more validation options

### Transform

Some fields allow you to transform content as it is entered, see below:

| Property | Type | Description |
| ---------- | ------ | ---------- |
| `uppercase`      | `boolean`  |  If passed we will transform `input` `textarea` to uppercase  |  
| `lowercase`      | `boolean`  |  If passed we will transform `input` `textarea` to lowercase  |  

* [ ] Add more transform options

### Icons

| Property | Type | Description |
| ---------- | ------ | ---------- | 
| `icon`      | `string`  |  The icon you wish to use, e.g. `bxs-heart`   |  
| `pack`      | `string`  |  The icon-pack you have installed e.g. `bx`  |
| `after`      | `string`  |  Puts your icon after the element `input` `button` `submit` |

## Events

The following events will be emitted to allow maximum flexibility to your application:

### @submit

Once the submit button is pressed (if you have one), it will validate the form and return a json object with a `{field: value}` pair:

```javascript
{
    email: 'users@email.address'
    message: 'The users message here'
}
```

### @updated_{{field}}

- Watch a single field for changes, you will get the `value` object emitted when it changes and passes validation. 

### @updated

- Watch the entire form for changes, you will get the same object of results as [@submit](#@submit) each time the form is updated, however this will not have been validated.

### @clicked

If a user clicks on a [button](#button) element, this event will fire with the name of your field as the value. This will also fire on [submit](#@submit)

### @error

Each time a field fails a validation check an @error event will fire, you can choose to consume it if you wish. You will receive a `{field: message}` object for failing fields.

*Note:* Validation checks happen both when field values change and on submit, you might receive multiple errors on a single form submission.

## Examples

You can see some prebuild examples here: 

* [Basic](https://codesandbox.io/s/dazzling-mountain-lhhwu)

* [ ] Share more advanced examples 

##Shell Script

* [ ] Create a `runner.sh` script which will allow users to build the form json by entering commands for even easier form setup.
