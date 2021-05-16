<template>
  <div class="work-place">
    <input v-model="item1">
    <button @click="send">sdf</button>
    <h1>{{item2}}</h1>
    <transition name="placer" mode="out-in">
      <CreatePermission v-if="this.currentFrame==='ROLE_CREATE_PERMISSION'" :key="'createPermission'"></CreatePermission>
      <CreateRole v-if="this.currentFrame==='ROLE_CREATE_ROLE'" :key="'createRole'"></CreateRole>
      <CreateCompany v-if="this.currentFrame==='ROLE_CREATE_COMPANY'" :key="'createRole'"></CreateCompany>
      <CreateActivity v-if="this.currentFrame==='ROLE_CREATE_ACTIVITY'" :key="'createActivity'"></CreateActivity>
      <ClaimCompany v-if="this.currentFrame==='ROLE_CLAIM_COMPANY'" :key="'claimCompany'"></ClaimCompany>
    </transition>
  </div>
</template>

<script src="./workPlace.ts"></script>

<style src="./workPlace.css"></style>