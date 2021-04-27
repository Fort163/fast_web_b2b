<template>
  <div>
    <div>
      <h3>Авторизуйтесь с помощью</h3>
    </div>
    <button class="google-button" @click="tryLogin('http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:8081/oauth2_redirect')"></button>
    <button class="yandex-button" @click="tryLogin('http://localhost:8080/oauth2/authorize/yandex?redirect_uri=http://localhost:8081/oauth2_redirect')"></button>
  </div>
</template>

<script src="./login.ts"></script>
<style src="./login.css"></style>