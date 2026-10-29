<script lang="ts">
import { camelCase } from "lodash-es";
import { message } from "./message.js";
console.log(camelCase(message));

let count = $state(0);
</script>
<button onclick={() => count++}>Count: {count}</button>
<style>button { font-size: 18px; }</style>
