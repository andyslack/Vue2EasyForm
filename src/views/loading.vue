<template>
    <div class="load">
        <img src="../assets/loading.gif" :width="width" alt="Loading"/>
    </div>
</template>

<script>
export default {
    name: "loading",
    props:{
        width: {
            type: String,
            default: '100px'
        },
    }
}
</script>