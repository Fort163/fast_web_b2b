import Vue from 'vue';
import axios from 'axios/index'


Vue.component("login",{
    data() {
        return {
            state: 'Жду...',
            fullName: '',
            accessToken: '',
            userObject: {}
        }
    },
    created(){
        var params = window.location.search
        let number = params.indexOf("?accessToken=");
        if(number > -1){
            this.accessToken = params.substring(params.indexOf("=")+1);
            this.state = 'Авторизован';
            console.log(this.accessToken)
            window.history.replaceState({}, document.title, "http://localhost:8081/");
            axios.get('http://localhost:8080/user/me',
                    { headers: {"Authorization" : "Bearer " + this.accessToken }}
                )
                .then(response => {
                        this.userObject = response.data;
                        this.fullName = response.data.fullName
                    }
                )
                .catch(function (error) {
                    'Ошибка! Не могу связаться с API. ' + error;
                })
        }
    }
    ,methods:{
        logout:function (){
            this.accessToken='';
            this.fullName='';
            this.state = 'Жду...';
            this.userObject = {};
        }
    }
});