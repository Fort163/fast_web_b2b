<template>
  <div :class="'addEmployeeMain'">
    <div v-if="this.currentFrame === 'MAIN'" :class="'addEmployeeMain'">
      <h1>Выбирите действие</h1>
      <transition-group :class="'employeeItems'" name="notificationAnimation" tag="div">
        <div :class="'employeeItem'" v-for="item in this.claims" :key="item.id">
          <button :class="'button-danger'" @click="this.refuse(item)">
            Отказать
          </button>
          <div :class="'employeeName'">{{item.user.fullName}}</div>
          <button :class="'button-default'" :style="{fontSize : '20px'}" @click="selectWithConfig(item)">
            Добавить с настройками
          </button>
          <button :class="'button-default'" :style="{fontSize : '18px'}" @click="selectWithOutConfig(item)">
            Добавить и разрешить редактирование
          </button>
        </div>
      </transition-group>
    </div>
    <WithConfig v-if="this.currentFrame === 'WITH_CONFIG'" :employee="this.selectRequest" v-on:back-frame="backFrame()"></WithConfig>
    <With-out-config v-if="this.currentFrame === 'WITH_OUT_CONFIG'" :employee="this.selectRequest" v-on:back-frame="backFrame()"></With-out-config>
  </div>
</template>

<script src="./addEmployee.ts">
</script>

<style src="./addEmployee.css">
</style>