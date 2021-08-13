<template>
  <div :class="'addEmployeeMain'">
    <h1>Выбирите действие</h1>
    <transition-group :class="'employeeItems'" name="notificationAnimation" tag="div">
      <div :class="'employeeItem'" v-for="item in this.claims" :key="item.id">
        <button :class="'button-danger'" @click="this.refuse(item)">
          Отказать
        </button>
        <div :class="'employeeName'">{{item.user.fullName}}</div>
        <button :class="'button-default'" :style="{fontSize : '20px'}" @click="selectConfig(item)">
          Добавить с настройками
        </button>
        <button :class="'button-default'" :style="{fontSize : '18px'}" @click="selectNoConfig(item)">
          Добавить и разрешить редактирование
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script src="./addEmployee.ts">
</script>

<style src="./addEmployee.css">
</style>