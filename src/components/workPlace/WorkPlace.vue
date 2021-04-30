<template>
  <div class="work-place">
    <transition name="placer" mode="out-in">
      <CreatePermission v-if="this.currentFrame==='Создать/изменить разрешения'" :key="'createPermission'"></CreatePermission>
      <CreateRole v-if="this.currentFrame==='Создать/изменить роль'" :key="'createRole'"></CreateRole>
    </transition>
  </div>
</template>

<script src="./workPlace.ts"></script>

<style src="./workPlace.css"></style>