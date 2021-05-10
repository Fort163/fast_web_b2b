<template>
  <div :class="'mainSelectBox'" @mouseleave="isShow=false" @mousemove="isShow=true">
    <div :class="'selectMenu'">
      <transition-group :class="'selectItems'" name="selectAnimation" tag="div">
        <div v-for="(item,index) in currentItems" :style="{width:selectWidth}" :class="'selectItem'" :key="item.id">
          <div :class="'selectItemValue'">{{item.name}}</div>
          <div v-if="!singleValue" :class="'selectItemButton'" :title="'Удалить'" @click="deleteCurrentItems(index)"/>
        </div>
      </transition-group>
      <div :class="'showStoreButton'"/> <!--:style="{position: arrowPosition}"-->
    </div>
    <div :class="'selectData'" >
      <transition-group :class="'storeItems'" name="storeAnimation" tag="div">
        <div :class="'storeItem'" v-for="(item,index) in this.storeItems" @click="addCurrentItems(index)" :key="index">
          <div :class="'storeItemValue'">{{item.name}}</div>
          <div :class="'storeItemButton'"/>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script src="./selectBox.ts">
</script>

<style src="./selectBox.css">

</style>