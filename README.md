## VSwitch

A `<VSwitch>` component for Vue.js 3.

## Installation

```sh
yarn add @me_slack/vueeasyform

npm install @me_slack/vueeasyform
```

## Usage


```vue
<template>
  <!-- demo coming soon-->
  <VueEasyForm></VueEasyForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueEasyForm from '@me_slack/vueeasyform'

export default defineComponent({
  components: {
    VueEasyForm
  }
})
</script>
```

If you are using the browser build, or you like to register components globally, that works fine, too:

```js
// with a bundler
import { createApp } from 'vue'
const app = createApp(/* ... */)
app.component('VueEasyForm', VueEasyForm)

// or using the global build
// assumes Vue is available globally - VueEasyForm is available globally via `VueEasyForm`
const app = Vue.createApp(/* ... */)
app.component('VueEasyForm', VueEasyForm)
```

## License

MIT
