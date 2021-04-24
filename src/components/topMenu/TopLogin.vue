<template>
  <div :class="{'logined' : isLogin}">
    <div :class="[isLogin ? 'topMenuLogin' : 'inactive' ]">
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
  </div>
</template>

<script>
import Vue from 'vue';
import LoginInfoModel from '../../store/model.ts';

export default class TopLogin extends Vue {

  props: {
    userObject: LoginInfoModel;
  }
  data(){
    return {
      asd:'asd'
    }
  }

}
</script>

<style scoped>

</style>