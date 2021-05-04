<template>
  <div :class="'mainRole'">
    <h1>Work Role</h1>
    <div :style="{width:'100%',height:'60px'}">
      <SelectBox :model="this.comboData"></SelectBox>
    </div>

  </div>
</template>

<script src="./createRole.ts">
</script>

<style src="./createRole.css">
</style>