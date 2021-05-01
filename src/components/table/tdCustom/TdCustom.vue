<template>
  <div :class="'tdMain'" :style="{width:this.width}">
    <div v-if="this.isTitle">{{this.value}}</div>
    <div v-else>
      <input v-if="type.toString()==='text'" type="text" v-model="this.value">
      <input v-if="type.toString()==='date'" type="date" v-model="this.value">
      <input v-if="type.toString()==='datetime'" type="datetime" v-model="this.value">
      <input v-if="type.toString()==='email'" type="email" v-model="this.value">
      <input v-if="type.toString()==='number'" type="number" v-model="this.value">
      <input v-if="type.toString()==='checkbox'" type="checkbox" v-model="this.value">
      <input v-if="type.toString()==='radio'" type="radio" v-model="this.value">
      <!--TODO-->
      <!--<input v-if="type.toString()==='file'" type="file" v-model="this.value">-->

    </div>
  </div>
</template>

<script src="./tdCustom.ts">
</script>

<style src="./tdCustom.css">

</style>