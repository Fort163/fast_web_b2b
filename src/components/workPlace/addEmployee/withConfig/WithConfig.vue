<template>
  <div>
    <button :class="'left-button'" @click="$emit('back-frame')"/>
    С конфигом
  </div>
</template>

<script src="./withConfig.ts">
</script>

<style src="./withConfig.css">
</style>