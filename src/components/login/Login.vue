<template>
  <div>
    <div>
      <h3>Авторизуйтесь с помощью</h3>
    </div>
    <FastWebApi/>
    <button class="google-button" @click="tryLogin('http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:8081/oauth2_redirect')"></button>
    <button class="yandex-button" @click="tryLogin('http://localhost:8080/oauth2/authorize/yandex?redirect_uri=http://localhost:8081/oauth2_redirect')"></button>
    {{count}}{{user}}
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FastWebApi from '@/components/api/FastWebApi.vue'
export default {
    name:'Login',
    components: {
      FastWebApi
    },
    created(){
      var params = window.location.search
      let number = params.indexOf("?accessToken=");
      if (number > -1) {
        const accessToken = params.substring(params.indexOf("=") + 1);
        this.$store.commit('login',accessToken);
        const user = FastWebApi.methods.getApi('/user/me');
        this.$store.commit('setCurrentUser',user);
        window.history.replaceState({}, document.title, "http://localhost:8081/");
      }
    },
    computed:mapState({
      count: state => state.count,
      user: state => state.accessToken,
    }),
    methods: {
      tryLogin(url) {
        window.location.href = url;
      }
    }
  };
</script>

<style scoped>

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
    outline: none;
  }

  .google-button:focus{
    outline: none;
  }

  .topMenuLogin{
    font-family: cursive;
    display: flex;
    flex-direction: row;
  }

  .photo{
    width: 50px;
    height: 50px;
    border-radius: 40px;
  }

  .exit-button {
    width: 42px;
    height: 42px;
    border: none;
    background-color: white;
    background-image: url(../../assets/login/exit_min.png);
    margin: 10px;
  }

  .exit-button:hover{
    background-color: #ffcfcf;
    border-radius: 10px;
    box-shadow:0 0 30px rgb(252, 153, 165);
  }

  .exit-button:focus{
    outline: none;
  }

  .settings-button {
    width: 42px;
    height: 42px;
    border: none;
    background-color: white;
    background-image: url(../../assets/login/settings_min.png);
    margin: 10px;
  }

  .settings-button:hover{
    background-color: #a7ffe7;
    border-radius: 10px;
    box-shadow:0 0 30px rgb(104, 255, 224);
  }

  .settings-button:focus{
    outline: none;
  }

  .topMenuButtons{
    display: flex;
    flex-direction: column;
  }

  .logined{
    align-self: flex-end;
  }

  .active {
    display: block;
  }

  .inactive {
    display: none;
  }
</style>