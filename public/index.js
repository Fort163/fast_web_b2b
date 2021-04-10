var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        name: '',
        userName: 'Пока вы не зададите вопрос, я не могу ответить!',
        token:''
    },
    watch: {
        // эта функция запускается при любом изменении вопроса
        question: function (newQuestion, oldQuestion) {
            this.userName = 'Ожидаю, авторизации...'
        }
    },
    methods: {
        getLogin: function () {
            auth2.grantOfflineAccess()
                .then(result => {
                    console.log(result);
                    this.token= result.code;
                })
                .catch(reault => {
                    console.log(reault);
                });
        }
        ,onSuccess:function (){
            axios.post('http://localhost:8080/api/auth/login',JSON.stringify({login:this.token,password:"asdasd"}),{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(responce => {
                    this.name=responce;
                }).catch(responce => {
                    console.log(responce);
                });
        }
    }
});