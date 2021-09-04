<template>
  <div :class="'main-see-claim-service'" :style="{width:'100%',height:'300px'}">
    <SearchService></SearchService>
    <TableCustom :tableSettings="this.settings"></TableCustom>
  </div>
</template>

<script src="./seeClaimService.ts"></script>

<style src="./seeClaimService.css"></style>