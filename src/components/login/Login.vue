<template>
  <div>
    <div>
      <h3>Авторизуйтесь с помощью</h3>
    </div>
    <!--
        TEST
    -->
    <button class="google-button" @click="tryLogin('http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:8081/oauth2_redirect')"></button>
    <button class="yandex-button" @click="tryLogin('http://localhost:8080/oauth2/authorize/yandex?redirect_uri=http://localhost:8081/oauth2_redirect')"></button>
    <!--
        WORK
        <button class="google-button" @click="tryLogin('https://quick-peter-b2b.ru/oauth2/authorize/google?redirect_uri=https://quick-peter-b2c.ru')"></button>
        <button class="yandex-button" @click="tryLogin('https://quick-peter-b2b.ru/oauth2/authorize/yandex?redirect_uri=https://quick-peter-b2c.ru')"></button>

     -->
  </div>
</template>

<script src="./login.ts"></script>
<style src="./login.css"></style>