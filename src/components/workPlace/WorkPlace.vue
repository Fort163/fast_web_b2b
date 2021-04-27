<template>
  <div class="work-place">
    <ul>
      <li v-for="item in roleList" v-bind:key="item.id">
        <h2>Роль {{item.name}}</h2>
        <ul>
          <li v-for="permission in item.permissionList" v-bind:key="permission.id">
            <h3>Пермишен {{permission.permission}}</h3>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script src="./workPlace.ts"></script>

<style src="./workPlace.css"></style>