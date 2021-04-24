<template>
  <div :class="'topMenuLogin'">
    <div>
      <img class="photo" alt="No photo" :src="this.userObject.userpic">
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
export default {
  name: "TopMenu"
}
</script>

<style scoped>

</style>