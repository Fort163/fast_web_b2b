<template>
  <div :class="'mainPermission'">
    <TableCustom :tableSettings="this.settings"></TableCustom>
    <div v-if="this.isShow">
      <h6  v-for="(item,index) in this.settings.data" :key="index">{{item}}</h6>
    </div>
  </div>
</template>

<script src="./createPermission.ts">

</script>

<style src="./createPermission.css">

</style>