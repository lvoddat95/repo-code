var app = new Vue({
    el: '#app',
    data: {
        message: 'Do you wanna build a Vue app?'
    }
})


var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'Bạn đã mở trang này vào ' + new Date().toLocaleString()
    }
})


var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: false
    }
})


var app4 = new Vue({
    el: '#app-4',
    data: {
        list: [{
                text: 'Học JavaScript'
            },
            {
                text: 'Học Vue'
            },
            {
                text: 'Xây dựng cái gì đó hay ho'
            }
        ]
    }
})

app4.list.push({
    text: 'Nghỉ ngơi'
})


var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'qua lại khách chờ sông lặng sóng'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split(' ').reverse().join(' ')
        }
    }
})


var app6 = new Vue({
    el: '#app-6',
    data: {
        message: ''
    }
})


Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [{
                id: 0,
                text: 'Cà pháo'
            },
            {
                id: 1,
                text: 'Mắm tôm'
            },
            {
                id: 2,
                text: 'Miễn ăn được là được'
            }
        ]
    }
})


Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})


new Vue({
    el: '#blog-post-demo',
    data: {
        posts: [{
                id: 1,
                title: 'Giới thiệu về Vue'
            },
            {
                id: 2,
                title: 'Các khái niệm trong Vue'
            },
            {
                id: 3,
                title: 'Vue căn bản và vô cùng nâng cao'
            }
        ]
    }
})


var obj = {
    mess: 'bar'
}

Object.freeze(obj)

new Vue({
    el: '#app-8',
    data: obj
})


new Vue({
    el: '#app-9',
    data: {
        rawHtml: "<span style=\"color: red\"></span>",
        isButtonDisabled: false,
        title: "Hòn Vọng Phu",
        seen: true,
        url: "#123"
    },
    methods: {
        toggleDisable() {
            this.isButtonDisabled = !this.isButtonDisabled
        }
    }
})


var vm = new Vue({
    el: '#example',
    data: {
        message: 'người đông bến đợi thuyền xuôi ngược'
    },
    computed: {
        now: function () {
            return Date.now()
        },
        // một computed getter
        reversedMessage: function () {
            // `this` trỏ tới đối tượng vm
            return this.message.split(' ').reverse().join(' ')
        }
    },

})


// var vm2 = new Vue({
//     el: '#demo',
//     data: {
//         firstName: 'Trần',
//         lastName: 'Lập',
//         fullName: 'Trần Lập'
//     },
//     watch: {
//         firstName: function (val) {
//             this.fullName = val + ' ' + this.lastName
//         },
//         lastName: function (val) {
//             this.fullName = this.firstName + ' ' + val
//         }
//     }
// })


var vm3 = new Vue({
    el: '#demo',
    data: {
        firstName: 'Evan',
        lastName: 'You'
    },
    // computed: {
    //     fullName: function () {
    //         return this.firstName + ' ' + this.lastName
    //     }
    // },
    computed: {
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                console.log(names)
                this.lastName = names[names.length - 1]
            }
        }
    }
})



var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'Không thể trả lời nếu bạn chưa đặt câu hỏi!'
    },
    watch: {
        // bất cứ lúc nào câu hỏi thay đổi, hàm bên dưới sẽ chạy
        question: function (newQuestion, oldQuestion) {
            this.answer = 'Đang chờ bạn đặt xong câu hỏi...'
            this.getAnswer()
        }
    },
    methods: {
        // _.debounce là một hàm do Lodash cung cấp
        // Để tìm hiểu rõ hơn cách hoạt động của hàm này,
        // bạn có thể truy cập: https://lodash.com/docs#debounce 
        getAnswer: _.debounce(
            function () {
                if (this.question.indexOf('?') === -1) {
                    this.answer = 'Câu hỏi thì thường chứa một dấu "?" ;-)'
                    return
                }
                this.answer = 'Đang suy nghĩ...'
                var vm = this
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        console.log(response)
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Lỗi! Không thể truy cập API. ' + error
                    })
            },
            // Đây là thời gian (đơn vị mili giây) chúng ta đợi người dùng dừng gõ.
            500
        )
    }
})


var bindClass = new Vue({
    el: "#demo-bindding-class",
    data: {
        isActive: true,
        hasError: true,
        activeClass: "activeClass",
        errorClass: "errorClass",
        // classObj: {
        //     "active": true,
        //     'text-info': true
        // }
        ok: true,
        type: "",
        show: true
    },
    computed: {
        classObj: function () {
            return {
                active: this.isActive && this.hasError,
                'text-danger': this.hasError && this.hasError.type === 'false'
            }
        }
    }
});