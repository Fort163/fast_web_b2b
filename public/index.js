const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Oauth2 = { template: '<div>Авторизован</div>' }

const router = new VueRouter({
    routes:[
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar },
        { path: '/oauth2_redirect', component: Oauth2,props: (route) => ({ query: route.query.token }) }
    ]
})

var app = new Vue({
    el: '#app',
    data:{
       state:'Жду...',
       fullName:'',
       accessToken:'',
       userObject: {}
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
                    this.state = 'Ошибка! Не могу связаться с API. ' + error;
                })
        }
    }
    ,computed:{
        isActive: function (){
            return this.fullName && this.fullName != null
        }
    }
    ,methods:{
        logout:function (){
            this.accessToken='';
            this.fullName='';
            this.state = 'Жду...';
        }
    }
});