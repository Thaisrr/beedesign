<script setup lang="ts">
import { ref } from "vue";
import { BeeAlert, BeeButton } from "@thaisrr/beedesign";

const visible = ref(true);
</script>

<template>
  <BeeAlert v-if="visible" type="info" closable @close="visible = false">
    Cette alerte se ferme avec la croix.
  </BeeAlert>
  <BeeButton v-else variant="secondary" @click="visible = true">Afficher à nouveau</BeeButton>
</template>