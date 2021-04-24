
<template>
  <div></div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import axios from 'axios';
import Vue from 'vue';

const FastWebApi = Vue.extend({
  computed: mapState({
    accessToken : state => state.accessToken
  }),
  methods:{
    getApi(uri : string): Promise<any> {
      return axios.get('http://localhost:8080' + uri,
          {headers: {"Authorization": "Bearer " + this.accessToken}}
      )
          .then(response => {
                return response.data;
              }
          )
          .catch(function (error) {
            console.log('Ошибка! Не могу связаться с API. ' + error);
          })
    },
    postApi(uri : string) : Promise<any>{
      return axios.post('http://localhost:8080' + uri,
          {headers: {"Authorization": "Bearer " + this.accessToken}}
      )
          .then(response => {
                return response.data;
              }
          )
          .catch(function (error) {
            console.log('Ошибка! Не могу связаться с API. ' + error);
          })
    }

  }
});
Vue.component('FastWebApi',new FastWebApi());
</script>