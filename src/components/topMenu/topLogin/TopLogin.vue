<template>
    <div class="topMenuLogin">
      <div class="loginInfo">
        <img class="photo" alt="No photo" :src="this.userpic">
        <div>{{this.welcome}}</div>
        <div>{{this.companyName}}</div>
        <div>{{this.employeeName}}</div>
      </div>
      <div class="loginButtons">
        <button class="exit-button" @click="logout"></button>
        <button class="settings-button" @click="settings"></button>
      </div>
    </div>
</template>

<script src="./topLogin.ts"></script>

<style src="./topLogin.css"></style>