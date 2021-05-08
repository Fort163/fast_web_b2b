<template>
  <div :style="{width:'100%',height:'100%'}">
    <div :style="{width:'100%',height:'30%'}">
    <h2>Create Company {{this.company}}</h2>
      {{this.address}}
      <div v-for="item in this.addressList" :key="item.name">
        {{item.name}} {{item.kind}}
      </div>
    </div>
    <div :style="{width:'100%',height:'70%'}">
      <yandex-map :style="{width:'100%',height:'100%'}" @click="onClick($event)" :settings="settings" :coords="coords" :zoom="17">
        <ymap-marker v-if="company!=null" :coords="company" marker-id="123"  hint-content="Моя компания" :icon="markerCompany"/>
      </yandex-map>
    </div>
  </div>
</template>

<script src="./createCompany.ts">
</script>

<style src="./createCompany.css">
</style>