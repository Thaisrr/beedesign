<script setup lang="ts">
import { ref } from "vue";
import { BeeAlert, BeeButton } from "@thaisrr/beedesign";

const visible = ref(true);
</script>

<template>
  <BeeAlert v-if="visible" type="info" closable @close="visible = false">
    This alert closes with the X button.
  </BeeAlert>
  <BeeButton v-else variant="secondary" @click="visible = true">Show again</BeeButton>
</template>