<template>
  <div :class="'modalMask'">
      <div :class="'modalWindow'">
        <h3>{{this.message}}</h3>
        <button :class="'okButton'"  @click="close()"></button>
      </div>
  </div>
</template>

<script src="./infoWindow.ts">
</script>

<style src="./infoWindow.css">

</style>