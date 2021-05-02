<template>
  <div class="mainTable">
    <div :class="'columnTable'">
      <TrCustom :columns="tableColumn" :key="'title'" :isTitle="true" />
    </div>
    <transition-group :class="'dataTable'" name="dataAnimation" tag="div">
      <TrCustom v-for="(item,index) in this.tableData" :key="index" :isTitle="false" :index="index"/>
    </transition-group>
    <button v-if="tableColumn" :class="'tableAdd'" @click="addItem()"></button>
  </div>
</template>

<script src="./tableCustom.ts">
</script>

<style src="./tableCustom.css">

</style>