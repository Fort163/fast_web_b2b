<template>
  <div id="loginId">
    <div :class="[isActive ? 'inactive' : 'active' ]">
      <div>
        <h3>Авторизуйтесь с помощью</h3>
      </div>
      <button class="google-button" @click="tryLogin('http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:8081/oauth2_redirect')"></button>
      <button class="yandex-button" @click="tryLogin('http://localhost:8080/oauth2/authorize/yandex?redirect_uri=http://localhost:8081/oauth2_redirect')"></button>
    </div>
    <div :class="[isActive ? 'active' : 'inactive' ]">
      <div>{{this.state}}</div>
      <div>Пользователь : {{this.fullName}}</div>
      <button v-on:click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

  export default {
    name: 'Login',
    data() {
      return {
        logined:false,
        state: 'Добро пожаловать',
        fullName: '',
        accessToken: '',
        userObject: {}
      }
    },
    created() {
      var params = window.location.search
      let number = params.indexOf("?accessToken=");
      if (number > -1) {
        this.accessToken = params.substring(params.indexOf("=") + 1);
        this.state = 'Авторизован';
        console.log(this.accessToken)
        window.history.replaceState({}, document.title, "http://localhost:8081/");
        axios.get('http://localhost:8080/user/me',
            {headers: {"Authorization": "Bearer " + this.accessToken}}
        )
            .then(response => {
                  this.userObject = response.data;
                  this.fullName = response.data.fullName;
                  this.logined = true;
                  this.$emit('login',true)
                }
            )
            .catch(function (error) {
              console.log('Ошибка! Не могу связаться с API. ' + error);
            })
      }
    }
    ,computed:{
      isActive: function (){
        return this.logined
      }
    }
    , methods: {
      logout() {
        this.$emit('login',false)
        this.logined = false;
        this.accessToken = '';
        this.fullName = '';
        this.state = 'Жду...';
        this.userObject = {};
      },
      tryLogin(url){
        window.location.href = url;
      }
    }
  };
</script>

<style scoped>

  .choseAuthorize {

  }

  .selectAuthorize {

  }

  .google-button {
    width: 99px;
    height: 33px;
    border: none;
    background-color: white;
    background-image: url(../../assets/login/google_33.png);
    padding-bottom: 4px;
    margin: 10px;
  }

  .google-button:hover{
    background-color: #cbf4ff;
    border-radius: 10px;
    box-shadow:0 0 30px rgb(153, 231, 252);
  }
  .yandex-button {
    width: 83px;
    height: 33px;
    border: none;
    background-color: white;
    background-image: url(../../assets/login/yandex_33.png);
    margin: 10px;
  }

  .yandex-button:hover{
    background-color: #ffcfcf;
    border-radius: 10px;
    box-shadow:0 0 30px rgb(252, 153, 165);
  }

  .yandex-button:focus{
    outline-color: #fdcece;
  }

  .google-button:focus{
    outline-color: #cbf4ff;
  }

  .active {
    display: block;
  }

  .inactive {
    display: none;
  }
</style>