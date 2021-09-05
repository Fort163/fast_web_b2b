<template>
  <div :class="'mainEmployees'">
    Сотрудники в разработке
    <iframe width="100%" height="60%" :src="this.companyId"></iframe>
    {{this.frame}}
  </div>
</template>

<script src="./employees.ts">
</script>

<style src="./employees.css">
</style>