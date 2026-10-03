<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeDrawer, BeeFlex } from "@thaisrr/beedesign";

const wide = ref(false);
const short = ref(false);
</script>

<template>
  <BeeFlex justify="flex-start" :gap="12" :responsive="false">
    <BeeButton variant="secondary" @click="wide = true">Wide panel</BeeButton>
    <BeeButton variant="secondary" @click="short = true">Short bottom panel</BeeButton>
  </BeeFlex>

  <BeeDrawer v-model:open="wide" title="Wide" size="min(90vw, 40rem)">
    <p class="text">Up to 40rem wide.</p>
  </BeeDrawer>

  <BeeDrawer v-model:open="short" title="Short" side="bottom" size="12rem">
    <p class="text">Up to 12rem tall, the content scrolls beyond that.</p>
  </BeeDrawer>
</template>

<style scoped>
.text {
  margin: 0;
  color: var(--bd-color-text-muted);
}
</style>