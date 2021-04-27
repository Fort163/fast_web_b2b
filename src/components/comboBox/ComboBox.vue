<template >
  <div :class="'combobox'" @mousemove="setEnter(true)" @mouseleave="setEnter(false)">
    <label :class="'combobox-label'">{{this.title}}</label>
    <ul :class="this.enter?'combobox-ul':'combobox-ul-hidden'">
      <li :class="'li-combobox first'" @click="func(item)" v-for="(item) in this.items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script src="./comboBox.ts">
</script>

<style src="./comboBox.css">
</style>