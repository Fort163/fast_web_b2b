<template>
  <div class="work-place">
    <transition name="placer" mode="out-in">
      <CreatePermission v-if="this.currentFrame==='ROLE_CREATE_PERMISSION'" :key="'createPermission'"></CreatePermission>
      <CreateRole v-if="this.currentFrame==='ROLE_CREATE_ROLE'" :key="'createRole'"></CreateRole>
      <CreateCompany v-if="this.currentFrame==='ROLE_CREATE_COMPANY'" :key="'createRole'"></CreateCompany>
    </transition>
  </div>
</template>

<script src="./workPlace.ts"></script>

<style src="./workPlace.css"></style>