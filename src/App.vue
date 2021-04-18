<template>
  <div class="main">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <Login @login="onLogin" />
    <div v-if="isAutorized">
      <HelloWorld message='Привет, Vue!'/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/login/Login.vue'

export default {
  name: 'App',
  components: {
    Login,
    HelloWorld
  }
  ,data(){
    return{
      isAutorized:false
    }
  }
  ,methods: {
    onLogin(data){
      this.isAutorized=data;
    }
  }
}
</script>

<style>

.main{
  font-family: verdana;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  height: 100%;
  width: 100%;
}

</style>
