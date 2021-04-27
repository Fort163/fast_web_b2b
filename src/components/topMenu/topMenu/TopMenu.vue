<template>
  <div class="topMenu">
    <ComboBox v-bind:title="'Администрирование'" v-bind:items="this.adminMenu" v-bind:func="this.setItem"></ComboBox>
    <ComboBox v-bind:title="'Моя компания'" v-bind:items="this.adminMenu" v-bind:func="this.setItem"></ComboBox>
    <ComboBox v-bind:title="'Мои заказы'" v-bind:items="this.adminMenu" v-bind:func="this.setItem"></ComboBox>
    <ComboBox v-bind:title="'Разное'" v-bind:items="this.adminMenu" v-bind:func="this.setItem"></ComboBox>
    <div>{{this.item()}}</div>
  </div>
</template>

<script src="./topMenu.ts">

</script>

<style src="./topMenu.css">

</style>