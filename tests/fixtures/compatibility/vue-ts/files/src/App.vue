<script setup lang="ts">
import { camelCase } from "lodash-es";
import { message } from "./message.js";
console.log(camelCase(message));

import { ref } from "vue";
const count = ref(0);
</script>
<template><button @click="count++">Count: {{ count }}</button></template>
<style>button { font-size: 18px; }</style>
