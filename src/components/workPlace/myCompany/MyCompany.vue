<template>
  <div :class="'mainMyCompany'">
    <div :class="'menuMyCompany'">
      <button :class="[this.currentFrame==='STATISTIC' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('STATISTIC')">
        Статистика
      </button>
      <button :class="[this.currentFrame==='EMPLOYEES' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('EMPLOYEES')">
        Сотрудники
      </button>
      <button :class="[this.currentFrame==='CREATE_SERVICE_TYPE' ? 'button-default-press' : '','button-default myCompanyButton']" @click="setFrame('CREATE_SERVICE_TYPE')">
        Типы услуг
      </button>
    </div>
    <div :class="'tableMyCompany'">
      <Statistic v-if="this.currentFrame==='STATISTIC'" :key="'statistic'"></Statistic>
      <Employees v-if="this.currentFrame==='EMPLOYEES'" :key="'employees'"></Employees>
      <CreateServiceType v-if="this.currentFrame==='CREATE_SERVICE_TYPE'" :key="'createServiceType'"></CreateServiceType>
    </div>
  </div>
</template>

<script src="./myCompany.ts">
</script>

<style src="./myCompany.css">
</style>