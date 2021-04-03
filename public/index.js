var app3 = new Vue({
    el: '#app3',
    data: {
        message: 'Привет, Vue!'
    }
})

var app2 = new Vue({
    el: '#app-2',
    data: {
        seen:true,
        message: 'Вы загрузили эту страницу: ' + new Date().toLocaleString()
    }
})

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Изучить JavaScript' },
            { text: 'Изучить Vue' },
            { text: 'Создать что-нибудь классное' }
        ]
    }
})
var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Привет, Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})
var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Привет, Vue!'
    }
})