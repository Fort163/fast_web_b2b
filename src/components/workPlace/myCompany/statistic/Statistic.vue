<template>
  <div :class="'mainStatistic'">
      Статистика в разработке
    <iframe width="100%" height="60%" :src="this.companyId"></iframe>
  </div>
</template>

<script src="./statistic.ts">
</script>

<style src="./statistic.css">
</style>