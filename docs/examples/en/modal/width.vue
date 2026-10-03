<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeFlex, BeeModal } from "@thaisrr/beedesign";

const narrow = ref(false);
const wide = ref(false);
</script>

<template>
  <BeeFlex justify="flex-start" :gap="12" :responsive="false">
    <BeeButton variant="secondary" @click="narrow = true">Narrow modal</BeeButton>
    <BeeButton variant="secondary" @click="wide = true">Wide modal</BeeButton>
  </BeeFlex>

  <BeeModal v-model:open="narrow" title="Narrow" width="min(90vw, 18rem)">
    <p class="text">Up to 18rem wide.</p>
  </BeeModal>

  <BeeModal v-model:open="wide" title="Wide" width="min(90vw, 40rem)">
    <p class="text">Up to 40rem wide, and 90% of the screen on mobile.</p>
  </BeeModal>
</template>

<style scoped>
.text {
  margin: 0;
  color: var(--bd-color-text-muted);
}
</style>