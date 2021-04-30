<template>
  <div class="mainTable">
    <h1>Table</h1>
    <TrCustom :columns="tableColumn" :key="'title'" :isTitle="true" />
    <transition-group :class="'dataTable'" name="dataAnimation" tag="div">
      <TrCustom v-for="(item,index) in this.tableData" :key="index" :dataItem="item" :isTitle="false" :index="index"/>
    </transition-group>
    <button :class="'tableAdd'" @click="addItem()"></button>
  </div>
</template>

<script src="./tableCustom.ts">
</script>

<style src="./tableCustom.css">

</style>