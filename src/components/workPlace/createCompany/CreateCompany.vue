<template>
  <div :style="{width:'100%',height:'100%'}">
<!--    <h6>Create Company {{this.company}}</h6>-->
    <div v-if="this.step==='Step_1'" :class="'bodyCompany'">
      <h1>Шаг 1.</h1>
      <h1>Укажите название и сферу деятельности вашей компании.</h1>
      <input :class="'companyName'" v-model="companyName" :placeholder="'Введите название компании'" />
      <div v-if="comboData.length>0" >
        <h1>Выберите вид деятельности</h1>
        <SelectBox :model="comboData" :value="this.companyActivity" :class="'companyActivity'"/>
      </div>
    </div>
    <div v-if="this.step==='Step_2'" :class="'bodyCompany'">
      <h1>Шаг 2.</h1>
      <h1>Укажите время для онлайн записи в вашу компаниию</h1>
      <TableCustom :tableSettings="scheduleTable"></TableCustom>
    </div>
    <div v-if="this.step==='Step_3'" :class="'bodyCompany'">
      <h1>Шаг 3.</h1>
      <h1>Укажите на карте адрес вашей компании.</h1>
      <div :style="{width:'100%',height:'70%'}">
        <yandex-map :style="{width:'100%',height:'100%'}" @click="onClick($event)" :settings="settings" :coords="coords" :zoom="17">
          <ymap-marker v-if="companyCoords" :coords="companyCoords" marker-id="123"  hint-content="Моя компания" :icon="markerCompany"/>
        </yandex-map>
      </div>
    </div>
    <div v-if="this.step==='Step_4'" :class="'bodyCompany'">
      <h1>Шаг 4.</h1>
      <h1>Проверьте данные</h1>
      <div :class="'companyData'">
        <div :class="'chose'"><div :class="'choseLabel'">Название компании : </div><div :class="'choseValue'">{{this.companyName}}</div></div>
        <div :class="'chose'"><div :class="'choseLabel'">Адрес компании : </div><div :class="'choseValue'">{{this.address}}</div></div>
        <div :class="'chose'"><div :class="'choseLabel'">Сферы деятельности : </div><div :class="'choseValue'">{{this.companyActivityString}}</div></div>
        <div :class="'chose'">
          <div :class="'choseLabel'">Режим работы : </div>
          <div :class="'choseSchedule'">
            <div v-for="item in this.schedulesList" :key="item.dayOfWeek">
              <div v-if="item.work" :class="'choseValue'">
                {{item.dayOfWeek}} {{item.clockFrom}}-{{item.clockTo}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="'footerCompany'">
      <div :class="'footerLeft'">
        <button v-if="this.step!='Step_1'" :class="'left-button'" @click="this.previous"/>
      </div>
      <div :class="'footerRight'">
        <button v-if="this.step!='Step_4'" :disabled="this.isDisabled(this.step)" :class="'right-button'" @click="this.next" />
        <button v-if="this.step==='Step_4'" :class="'button-save'" @click="this.save">
          Все верно!
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./createCompany.ts">
</script>

<style src="./createCompany.css">
</style>