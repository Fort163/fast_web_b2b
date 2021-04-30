<template>
  <div class="mainTable">
    <h1>Table</h1>
    <TrCustom :columns="tableColumn" :key="'title'" :isTitle="true" />
    <transition-group :class="'dataTable'" name="dataAnimation" tag="div">
      <TrCustom v-for="item in this.tableData" :key="item.id" :dataItem="item" :isTitle="false"/>
    </transition-group>

  </div>
</template>

<script src="./tableCustom.ts">
</script>

<style src="./tableCustom.css">

</style>