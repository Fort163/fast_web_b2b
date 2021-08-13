<template>
  <div :class="'mainMyCompany'">
    <div :class="'menuMyCompany'">
      Меню
    </div>
    <div :class="'tableMyCompany'">
      <Statistic v-if="this.currentFrame==='STATISTIC'" :key="'statistic'"></Statistic>
    </div>
  </div>
</template>

<script src="./myCompany.ts">
</script>

<style src="./myCompany.css">
</style>