<script setup lang="ts">
import { BeeButton, BeeFlex } from "@thaisrr/beedesign";
</script>

<template>
  <BeeFlex direction="column" align="flex-start" :gap="12" :responsive="false">
    <BeeButton>Save</BeeButton>
    <BeeButton variant="secondary">Cancel</BeeButton>
    <BeeButton variant="ghost">Learn more</BeeButton>
  </BeeFlex>
</template>