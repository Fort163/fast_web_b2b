<template>
  <div class="topMenu">
    <div class="topItems">
      <ComboBox v-if="this.showAdmin" v-bind:style="{width: this.sizeCombo+'%'}" v-bind:title="'Администрирование'" v-bind:items="this.topMenu.admin" v-bind:func="this.setItem"></ComboBox>
      <ComboBox v-if="this.showCompany" v-bind:style="{width: this.sizeCombo+'%'}" v-bind:title="'Моя компания'" v-bind:items="this.topMenu.company" v-bind:func="this.setItem"></ComboBox>
      <ComboBox v-if="this.showService" v-bind:style="{width: this.sizeCombo+'%'}" v-bind:title="'Мои заказы'" v-bind:items="this.topMenu.service" v-bind:func="this.setItem"></ComboBox>
      <ComboBox v-if="this.showOther" v-bind:style="{width: this.sizeCombo+'%'}" v-bind:title="'Разное'" v-bind:items="this.topMenu.other" v-bind:func="this.setItem"></ComboBox>
    </div>
    <transition name="labelAnimation" mode="out-in">
      <div class="topSelect" :key="this.item()">{{this.item()}}</div>
    </transition>
  </div>
</template>

<script src="./topMenu.ts">

</script>

<style src="./topMenu.css">

</style>