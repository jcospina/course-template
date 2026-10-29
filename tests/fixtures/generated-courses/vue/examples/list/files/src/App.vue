<script setup lang="ts">
import {ref,computed} from "vue";
import {short} from "./filter";
const onlyShort=ref(false);const names=ref(["Ada","Lin","Alexandra"]);
const visible=computed(()=>onlyShort.value ? names.value.filter(short) : names.value);
</script>
<template><button @click="onlyShort = !onlyShort">Show short</button><p>Visible: {{visible.length}}</p><ul><li v-for="name in visible" :key="name">{{name}}</li></ul></template>
