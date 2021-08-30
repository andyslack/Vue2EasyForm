## Vue2EasyForm

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
- label { text, classes, styles }
- description {location=['top' 'bottom'], text, classes, styles}
- placeholder 'string'
- {input, dropdown, checkbox, submit} (see below)
- required { required, text, classes, styles}
- disabled: boolean
- success: boolean
- error: boolean
- value: <mixed> holds the current value of the field
- classes: string
- styles: string
- loading: boolean

###input
- 

###dropdown (array of options)
 - options - Array of objects
   - value 
   - name
   - disabled
 - multiple(boolean - default: false)
 - classes
 - styles

##Submit
- label
- classes
- styles

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

'form_button_clicked'
- the name of the button clicked

'error'
- returns validation errors for you to handle

##Example

You can run the example as follows:

```shell
cd example && npm install && npm run serve
```

Also available on [CodeSandbox.io](https://codesandbox.io/s/dazzling-mountain-lhhwu)