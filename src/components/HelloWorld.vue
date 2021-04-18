<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <h1>{{ item1 }}</h1>
    <h1>{{ item2 }}</h1>
    <button @click="setValue">Установить</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    message: String
  },
  data(){
    return {
      item1:"",
      item2:""
    }
  },
  methods:{
    setValue(){
      this.item1 = "Hello";
      this.item2 = "world";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
