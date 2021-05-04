<template>
  <div :class="'mainSelectBox'" @mouseleave="isShow=false" @mousemove="isShow=true">
    <div :class="'selectMenu'">
      <div :class="'selectItems'">
        <transition-group v-for="(item,index) in currentItems" :key="item.id" name="selectAnimation" tag="div">
          <div :class="'selectItem'" :key="item.id">
            <div :class="'selectItemValue'">{{item.name}}</div>
            <div :class="'selectItemButton'" @click="deleteCurrentItems(index)">Button</div>
          </div>
        </transition-group>
      </div>
      <div :class="'showStoreButton'">!</div>
    </div>
    <div :class="'selectData'" v-if="isShow">
      <transition-group v-for="(item,index) in storeItems" :key="item.id" name="storeAnimation" tag="div">
        <div @click="addCurrentItems(index)" :key="item.id">{{index +' '+ item.name  }}</div>
      </transition-group>
    </div>
  </div>
</template>

<script src="./selectBox.ts">
</script>

<style src="./selectBox.css">

</style>