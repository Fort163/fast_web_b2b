<template>
  <div :class="'topMenuLogin'">
    <div>
      <img class="photo" alt="No photo" :src="this.userpic">
      <div>{{this.welcome}}</div>
      <div>{{this.companyName}}</div>
      <div>{{this.employee}}</div>
    </div>
    <div class="topMenuButtons">
      <button class="exit-button" v-on:click="logout"></button>
      <button class="settings-button" v-on:click="settings"></button>
    </div>
  </div>
</template>

<script>
  import Component from "vue-class-component";
  import Vue from "vue";

  @Component({
    components: {
    }
  })
  export default class TopMenu extends Vue {

  }
</script>

<style scoped>

</style>