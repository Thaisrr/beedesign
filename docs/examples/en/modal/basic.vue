<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeFlex, BeeModal } from "@thaisrr/beedesign";

const open = ref(false);
</script>

<template>
  <BeeButton @click="open = true">Delete the draft</BeeButton>

  <BeeModal v-model:open="open" title="Delete this draft?">
    <p class="text">The text will be permanently lost. This action cannot be undone.</p>
    <BeeFlex justify="flex-end" :gap="8" :responsive="false">
      <BeeButton variant="ghost" @click="open = false">Cancel</BeeButton>
      <BeeButton @click="open = false">Delete</BeeButton>
    </BeeFlex>
  </BeeModal>
</template>

<style scoped>
.text {
  margin: 0 0 1.25rem;
  color: var(--bd-color-text-muted);
}
</style>