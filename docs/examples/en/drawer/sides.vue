<script setup lang="ts">
import { ref } from "vue";
import { BeeButton, BeeDrawer, BeeFlex } from "@thaisrr/beedesign";

type Side = "left" | "right" | "top" | "bottom";

const open = ref(false);
const side = ref<Side>("right");

function show(value: Side) {
  side.value = value;
  open.value = true;
}
</script>

<template>
  <BeeFlex justify="flex-start" :gap="12" :responsive="false">
    <BeeButton variant="secondary" @click="show('left')">Left</BeeButton>
    <BeeButton variant="secondary" @click="show('right')">Right</BeeButton>
    <BeeButton variant="secondary" @click="show('top')">Top</BeeButton>
    <BeeButton variant="secondary" @click="show('bottom')">Bottom</BeeButton>
  </BeeFlex>

  <BeeDrawer v-model:open="open" :side="side" :title="`From ${side}`">
    <p class="text">This panel slides in from the {{ side }} edge.</p>
  </BeeDrawer>
</template>

<style scoped>
.text {
  margin: 0;
  color: var(--bd-color-text-muted);
}
</style>