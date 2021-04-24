<template>
  <div class="simple">
    <h1>{{ message }}</h1>
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
      user:{},
      item2:""
    }
  },
  methods:{
    setValue(){

    },
    addUser(user){
      this.item2 = "User set";
      this.user = user;
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
