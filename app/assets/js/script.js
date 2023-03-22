Vue.component("custom-input", {
    props: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        value: {
            type: [String, Number],
            default: "",
        },
        isRequired: {
            type: Boolean,
            default: true,
        },
        "data-type": {
            type: String,
            default: "",
        },
        "label-class": {
            type: String,
            default: "col-sm-4 col-form-label",
        },
        "content-class": {
            type: String,
            default: "col-sm-8",
        },
    },
    data() {
        return {
            error: null,
            controlClass: "form-control bg-gray-50 text-gray-900 border-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ",
            // Thêm một data property mới để giữ giá trị của prop "value"
            inputValue: this.value,
            initialValue: this.value, // Giá trị ban đầu của prop "value"
        };
    },
    watch: {
        // Theo dõi sự thay đổi của data property mới thay vì prop "value"
        inputValue(newValue) {
            // Kiểm tra nếu giá trị mới khác với giá trị ban đầu thì reset error về null
            if (this.isRequired && !newValue && newValue.length == 0) {
                this.error = `${this.label} bắt buộc nhập.`;
            } else if (newValue && this.dataType === "date" && !this.validateDate(newValue)) {
                this.error = `Định dạng ngày không hợp lệ. Vui lòng nhập ngày theo định dạng dd/mm/yyyy`;
            } else if (newValue && this.dataType === "email" && !this.validateEmail(newValue)) {
                this.error = `Định dạng Email không hợp lệ.`;
            } else if (newValue !== this.initialValue) {
                this.error = null;
                return
            }
            // Giữ giá trị mới này đồng bộ với prop "value"
            this.$emit("input", newValue);
        },
    },
    methods: {
        setError(message) {
            this.error = message;
        },
        resetError() {
            this.error = null;
        },
        resetInput() {
            this.inputValue = null;
        },
        reset() {
            // Reset giá trị của inputValue và error về giá trị ban đầu
            this.inputValue = this.initialValue;
            this.error = null;
        },
        validateDate(dateString) {
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!regex.test(dateString)) {
                return false;
            }
            const dateParts = dateString.split("/");
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10);
            const year = parseInt(dateParts[2], 10);
            if (year < 1000 || year > 9999 || month == 0 || month > 12) {
                return false;
            }
            const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
                monthLength[1] = 29;
            }
            return day > 0 && day <= monthLength[month - 1];
        },
        validateEmail(emailString) {
            // regular expression for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // check if email matches the regular expression
            if (emailRegex.test(emailString)) {
                // email is valid
                return true;
            } else {
                // email is invalid
                return false;
            }
        },
        validate() {
            if (this.isRequired && !this.inputValue) {
                this.setError(`${this.label} bắt buộc nhập.`);
                return false;
            } else if (this.dataType === "date" && !this.validateDate(this.inputValue)) {
                this.setError(
                    `Định dạng ngày không hợp lệ. Vui lòng nhập ngày theo định dạng dd/mm/yyyy`
                );
                return false;
            } else if (this.dataType === "email" && !this.validateEmail(this.inputValue)) {
                this.setError(`Định dạng Email không hợp lệ.`);
                return false;
            } else {
                this.resetError();
            }
            return true;
        },
    },
    template: `
    <div class="row mb-3">
        <label :for="id" :class="[labelClass]">{{ label }} <span class="text-danger">*</span></label>
        <div :class="[contentClass]">
            <input :id="id" :type="type" :name="name" :data-type="dataType" v-model="inputValue" :required="isRequired" 
            v-bind:class="[{ 'is-invalid': error }, controlClass]" >
            <div v-if="error" class="invalid-feedback">
                {{ error }}
            </div>
        </div>
    </div>`,
});

var appEl = new Vue({
    el: "#appEl",
    data: {
        items: [],
        errors: {},
        modalTitle: "Thêm mới",
        isCheckedAll: false,
        isChecked: false,
        currentPage: 1,
        perPage: 5,
        // totalPages: 0,
        // totalItems: 0
    },
    watch: {},
    computed: {
        totalItems: {
            get: function () {
                return this.items.length;
            },
            set: function (value) {
                this.totalItems = value;
            }
        },
        totalPages: function () {
            return Math.ceil(this.totalItems / this.perPage);
        }
    },
    methods: {

        paginate: function (items) {
            let start = (this.currentPage - 1) * this.perPage;
            let end = start + this.perPage;

            return items.slice(start, end);
        },

        updatePage: function (page) {
            this.currentPage = page;
        },

        toggleCheckedAll() {
            this.isCheckedAll = !this.isCheckedAll;
            this.items.forEach(item => {
                item.isChecked = this.isCheckedAll;
            });
        },

        toggleChecked(item) {
            item.isChecked = !item.isChecked;
            this.isCheckedAll = this.items.every(item => item.isChecked);
        },

        deleteItems: function () {
            let hasChecked = true;
            for (let prop in this.items) {
                if (this.items[prop].isChecked) {
                    hasChecked = false;
                    break;
                }
            }

            if (hasChecked) {
                alert("Chưa chọn");
            }

            let ids = [];
            this.items.forEach(item => {
                if (item.isChecked) {
                    // this.DeleteIds(item);
                    ids.push(item.pk_id);
                }
            });
            if (window.confirm("Xoá nha? \n")) {
                let formData = new FormData();
                formData.append("ids", ids);

                axios({
                    url: "http://localhost/repo-code/app/backend/api.php?action=deleteItems",
                    method: "post",
                    data: formData,
                }).then((res) => {
                    if (res.data.error) {
                        alert("Error");
                        return;
                    }

                    alert("Đã xoá thành công");
                    this.getList();

                }).catch((err) => {
                    console.log(err);
                });
            };
        },

        onSubmit: function () {


        },

        Delete: function (item) {
            if (window.confirm("Xoá nha? \n" + item.c_name)) {
                let formData = new FormData();
                formData.append("id", item.pk_id);

                axios({
                    url: "http://localhost/repo-code/app/backend/api.php?action=delete",
                    method: "post",
                    data: formData,
                }).then((res) => {
                    if (res.data.error) {
                        alert("Error");
                        return;
                    }

                    alert("Đã xoá thành công");
                    this.getList();

                }).catch((err) => {
                    console.log(err);
                });
            };
        },

        Edit: function (id) {
            formUpdate.formTitle = "Cập nhập";
            formUpdate.pk_id = id;

            let formData = new FormData();
            formData.append("id", id);

            axios({
                url: "http://localhost/repo-code/app/backend/api.php?action=edit",
                method: "post",
                data: formData,
            }).then((res) => {
                if (res.data.error === false) {
                    formUpdate.$refs.c_code.inputValue = res.data.body.c_code;
                    formUpdate.$refs.c_ten_cong_ty.inputValue = res.data.body.c_ten_cong_ty;
                    formUpdate.$refs.c_name.inputValue = res.data.body.c_name;
                    formUpdate.$refs.c_nam_sinh.inputValue = res.data.body.c_nam_sinh;
                    formUpdate.$refs.c_so_hop_dong.inputValue = res.data.body.c_so_hop_dong;
                    formUpdate.$refs.c_hieu_luc.inputValue = res.data.body.c_hieu_luc;
                    formUpdate.$refs.c_email.inputValue = res.data.body.c_email;
                    formUpdate.c_temp = res.data.body.c_temp;
                    formUpdate.c_trang_thai = parseInt(res.data.body.c_trang_thai);
                    $("#formUpdate").modal("show");
                }
            }).catch((err) => {
                console.log(err);
            });
        },

        resetRef: function () {
            for (let refName in this.$refs) {
                const ref = this.$refs[refName];
                if (ref.$options.name === 'custom-input') {
                    ref.reset();
                }
            }
        },

        resetRefError: function () {
            for (let refName in this.$refs) {
                const ref = this.$refs[refName];
                if (ref.$options.name === 'custom-input') {
                    ref.resetError();
                }
            }
        },

        setRefError: function (message) {
            for (let refName in this.$refs) {
                const ref = this.$refs[refName];
                if (ref.$options.name === 'custom-input') {
                    ref.setError(message);
                }
            }
        },

        openModalUpdate: function (resetData = false) {
            this.modalActionAdd = true;
            $("#formUpdate").modal("show");
            console.log(resetData)
            if (resetData) {
                this.resetRef();
            }
        },

        dismissModal: function () {
            this.resetRef();
        },

        getList: _.debounce(
            function () {
                axios.get('http://localhost/repo-code/app/backend/api.php?action=getall')
                    .then(function (res) {
                        this.items = res.data.body;
                        this.totalItems = res.data.body.length;
                        this.totalPages = Math.ceil(this.totalItems / this.perPage);
                    }.bind(this)) // Ràng buộc ngữ cảnh của từ khoá 'this' với đối tượng Vue
                    .catch(function (error) {
                        this.error = 'Lỗi! Không thể truy cập API. ' + error
                    })
            },
            100
        ),

    },
    mounted: function () {
        this.getList();
    },
    created: function () {},
});


// $('#formUpdate').on('hidden.bs.modal', function (event) {
//     formUpdate.resetRef();
// });

var formSearch = new Vue({
    el: "#formSearch",
    data: {
        searchParams: {
            c_code: '',
            c_ten_cong_ty: '',
            c_name: '',
            c_trang_thai: '',
        },
        items: [],
    },
    methods: {
        formSearch: function () {
            axios.get('http://localhost/repo-code/app/backend/api.php?action=search', {
                params: this.searchParams
            }).then((res) => {
                console.log(res)
                appEl.items = res.data.body;
            });
        },

    },
});

var formUpdate = new Vue({
    el: "#formUpdate",
    data: {
        formTitle: "Thêm mới",
        pk_id: '',
        updateParams: {
            c_code: '',
            c_ten_cong_ty: '',
            c_so_hop_dong: '',
            c_hieu_luc: '',
            c_name: '',
            c_nam_sinh: '',
            c_email: '',
            c_temp: 1,
            c_trang_thai: 1,
        },
        items: [],
        errors: {},
    },
    methods: {
        onSubmitFormUpdate: function () {
            // Validate các component custom-input
            let isValid = true;
            Object.values(this.$refs).forEach((component) => {
                if (component.validate && !component.validate()) {
                    isValid = false;
                }
            });
            // Nếu các giá trị nhập vào không hợp lệ thì không submit form
            if (!isValid) {
                return;
            }

            if (Object.keys(this.errors).length === 0) {
                let data = new FormData();

                data.append("c_code", this.$refs.c_code.inputValue);
                data.append("c_ten_cong_ty", this.$refs.c_ten_cong_ty.inputValue);
                data.append("c_name", this.$refs.c_name.inputValue);
                data.append("c_nam_sinh", this.$refs.c_nam_sinh.inputValue);
                data.append("c_so_hop_dong", this.$refs.c_so_hop_dong.inputValue);
                data.append("c_hieu_luc", this.$refs.c_hieu_luc.inputValue);
                data.append("c_email", this.$refs.c_email.inputValue);
                data.append("c_temp", this.$refs.c_email.value);
                data.append("c_trang_thai", this.$refs.c_trang_thai.value);

                let url_action = "add";

                if (this.pk_id.length > 0) {
                    url_action = "udpate";
                    data.append("pk_id", this.pk_id);
                }

                axios.post("http://localhost/repo-code/app/backend/api.php?action=" + url_action, data)
                    .then((res) => {
                        if (res.data.error) {
                            alert("Error");
                            return;
                        }
                        alert(res.data.message);
                        $("#formUpdate").modal("hide");
                        appEl.getList();

                    }).catch((err) => {
                        console.log(err);
                    })
            }
        }

    },
});


// var formUpload = new Vue({
//     el: "#formUpload",
//     data: {
//         items: [],
//         c_code: "",
//         c_temp: 1,
//         modalTitle: "Import bảng kê",
//     },
//     methods: {
//         onUpload: function () {

//         },
//         handleFileUpload() {
//             const fileInput = this.$refs.fileInput;
//             const file = fileInput.files[0];
//             const formData = new FormData();

//             console.log(file)
//             console.log(formData)

//             formData.append('file', file);

//             fetch('http://localhost/repo-code/app/backend/process-excel.php', {
//                 method: 'POST',
//                 body: formData,
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     this.items = data;
//                 })
//                 .catch((error) => {
//                     console.error('Error:', error);
//                 });
//         },
//     },
// });