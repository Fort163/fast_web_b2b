<template>
  <div class="search-main">
    <div class="search-block">
      <div class="search-combo" v-if="showEmployee" :style="{width:getWidthCombo}">
        <label class="comboLabel">Сотрудник</label>
        <SelectBox :model="comboEmployee" :value="this.selectEmployee" :singleValue="true" class="comboBox"/>
      </div>
      <div class="search-combo" :style="{width:getWidthCombo}">
        <label class="comboLabel">Вид услуги</label>
        <SelectBox :model="comboServiceType" :value="this.selectServiceType" :singleValue="true" :class="'comboBox'"/>
      </div>
    </div>
    <div class="search-block">
      <div class="search-combo" :style="{width:'200px'}">
        <label class="comboLabel">Дата с</label>
        <input class="searchDate" v-model="fromDate" type="date"/>
      </div>
      <div class="search-combo" :style="{width:'200px'}">
        <label class="comboLabel">Дата по</label>
        <input class="searchDate" v-model="toDate" type="date"/>
      </div>
      <div class="search-combo">
        <label class="comboLabel">Телефон клиента</label>
        <input class="text-field search-phone" v-model="phone" type="number" />
      </div>
    </div>
    <button :class="'button-default'" :style="{fontSize : '20px',width : '150px',marginLeft : '15px'}" @click="search()">
      Поиск
    </button>
  </div>
</template>

<script src="./searchService.ts"></script>

<style src="./searchService.css"></style>