<template>
  <div :class="'mainWarnings'">
    <div v-if="!noPhone" :class="'errorMessage'">Не указан телефон!<br>
      Если хотите получать уведомления по SMS укажите телефон, во вкладке редактировать пользователя.</div>
    <div v-if="false" :class="'warningMessage'">Нет телефона</div>
  </div>
</template>

<script src="./warningWindow.ts"></script>

<style src="./warningWindow.css"></style>