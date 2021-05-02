<template>
  <div :class="'tdMain'" :style="{width:this.width}">
    <div v-if="this.isTitle" :class="'tdTitle'">{{this.value}}</div>
    <div v-else :class="'tdData'">
      <textarea v-if="type.toString()==='text'" :class="'tdAll text'" v-model="value"/>
      <input v-if="type.toString()==='date'" :class="'tdAll date'" type="date" v-model="value"/>
      <input v-if="type.toString()==='datetime'" :class="'tdAll datetime'" type="datetime" v-model="value"/>
      <input v-if="type.toString()==='email'" :class="'tdAll email'" type="email" v-model="this.value"/>
      <input v-if="type.toString()==='number'" :class="'tdAll number'" type="number" step="0.01" v-model="value"/>
      <div v-if="type.toString()==='checkbox'" :class="'checkbox'" v-on:click="value=!value">
        <div :class="[this.value ? 'check' : 'uncheck']"/>
      </div>

      <input v-if="type.toString()==='radio'" :class="'tdAll radio'" type="radio" v-model="value"/>
      <!--TODO-->
      <!--<input v-if="type.toString()==='file'" type="file" v-model="this.value">-->

    </div>
  </div>
</template>

<script src="./tdCustom.ts">
</script>

<style src="./tdCustom.css">

</style>