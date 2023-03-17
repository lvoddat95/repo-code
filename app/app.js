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


var v_show_if = new Vue({
    el: "#show_if",
    data: {
        showDetails: false
    }
});

Vue.component('todo-item', {
    template: `
      <li>
        {{ title }}
        <button v-on:click="$emit('remove')">X</button>
      </li>
    `,
    props: ['title']
})
var todo = new Vue({
    el: "#todo-list-example",
    data: {
        newTodoText: "",
        nextTodoId: 5,
        todos: [{
                id: 1,
                title: "One",
            },
            {
                id: 2,
                title: "Two",
            },
            {
                id: 3,
                title: "Three",
            },
            {
                id: 4,
                title: "Four",
            },
        ]
    },
    methods: {
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    }
});


var demCuu = new Vue({
    el: "#dem-cuu",
    data: {
        counter: 0,
    }
});


var example2 = new Vue({
    el: '#example-2',
    data: {
        name: 'Vue.js'
    },
    // định nghĩa phương thức trong object `methods`
    methods: {
        greet: function (event) {
            // bên trong một phương thức, `this` trỏ đến đối tượng Vue
            alert('Xin chào ' + this.name + '!')
            // `event` là sự kiện DOM native
            if (event) {
                alert(event.target.tagName)
            }
        }
    }
})

// bạn cũng có thể gọi phương thức từ JavaScript
// example2.greet() // => 'Xin chào Vue.js!'


var example3 = new Vue({
    el: '#example-3',
    data: {
        name: 'Vue.js',
        checked: true
    },
    // định nghĩa phương thức trong object `methods`
    methods: {
        warn: function (message, event) {
            // bây giờ chúng ta có thể truy xuất đến sự kiện DOM native
            if (event) event.stopPropagation()
            alert(message)
        }
    }
})

// Định nghĩa một component với tên là "button-counter"
Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">Bạn đã bấm {{ count }} lần.</button>'
})

new Vue({
    el: '#components-demo'
})


Vue.component('blog-post', {
    props: ['post'],
    template: `
      <div class="blog-post">
        <h3>{{ post.title }}</h3>
        <button v-on:click="$emit('enlarge-text', 0.1)">
  Phóng to
</button>
        <div v-html="post.content"></div>
      </div>
    `
})


new Vue({
    el: '#blog-posts-events-demo',
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
        ],
        postFontSize: 1
    },
    methods: {
        onEnlargeText: function (enlargeAmount) {
            this.postFontSize += enlargeAmount
        }
    }
})


Vue.component('custom-input', {
    props: ['value'],
    template: `
      <input
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    `
});


var v_model_component = new Vue({
    el: "#v-model-component",
    data: {
        searchText: ""
    }
});


Vue.component('alert-box', {
    template: `
      <div class="demo-alert-box">
        <strong>Lỗi!</strong>
        <slot></slot>
      </div>
    `
})


Vue.component('base-input', {
    inheritAttrs: false,
    props: ['label', 'value'],
    template: `
      <label>
        {{ label }}
        <input
          v-bind="$attrs"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
        >
      </label>
    `
})