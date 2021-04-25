<template>
  <div class="main">
    <div v-if="!isAuthorized">
      <Login></Login>
    </div>
    <div v-if="isAuthorized">
      <TopPanel></TopPanel>
    </div>
  </div>
</template>

<script src="./app.ts"></script>
<style src="./app.css"></style>
