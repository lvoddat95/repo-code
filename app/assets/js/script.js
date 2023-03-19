Vue.component("custom-input", {
    props: {
        id: {
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
    },
    data() {
        return {
            error: null,
            controlClass: "form-control",
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
        <label :for="id" class="col-sm-3 col-form-label">{{ label }} <span class="text-danger">*</span></label>
        <div class="col-sm-9">
            <input :id="id" :type="type" :data-type="dataType" v-model="inputValue" :required="isRequired" 
            v-bind:class="[{ 'is-invalid': error }, controlClass]" >
            <div v-if="error" class="invalid-feedback">
                {{ error }}
            </div>
        </div>
    </div>`,
});

var formUpdate = new Vue({
    el: "#main",
    data: {
        items: [],
        c_code: "",
        c_ten_cong_ty: "",
        c_name: "",
        c_nam_sinh: "",
        c_so_hop_dong: "",
        c_hieu_luc: "",
        c_email: "",
        c_temp: 1,
        c_trang_thai: true,
        errors: {}
    },
    watch: {},
    methods: {
        Add: function () {

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
                data.append("c_temp", this.c_temp);
                data.append("c_trang_thai", this.c_trang_thai);

                axios.post('http://localhost/repo-code/app/backend/api.php?action=add', data)
                    .then((res) => {
                        if (res.data.error) {
                            alert("Error");
                            return;
                        }

                        $("#formUpdate").modal("hide");
                        this.getList();
                        alert(res.data.message);

                    }).catch((err) => {
                        console.log(err);
                    })
            }
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
            let formData = new FormData();
            formData.append("id", id);

            axios({
                url: "http://localhost/repo-code/app/backend/api.php?action=edit",
                method: "post",
                data: formData,
            }).then((res) => {
                if (res.data.error === false) {

                    console.log()

                    this.$refs.c_code.inputValue = res.data.body.c_code;
                    this.$refs.c_ten_cong_ty.inputValue = res.data.body.c_ten_cong_ty;
                    this.$refs.c_name.inputValue = res.data.body.c_name;
                    this.$refs.c_nam_sinh.inputValue = res.data.body.c_nam_sinh;
                    this.$refs.c_so_hop_dong.inputValue = res.data.body.c_so_hop_dong;
                    this.$refs.c_hieu_luc.inputValue = res.data.body.c_hieu_luc;
                    this.$refs.c_email.inputValue = res.data.body.c_email;
                    this.c_temp = res.data.body.c_temp;
                    this.c_trang_thai = res.data.body.c_trang_thai;

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

        openModal: function (resetData = false) {
            console.log(resetData)
            if (resetData) {
                this.resetRef();
            }
        },
        dismissModal: function () {
            this.resetRef();

            // Đóng modal
        },
        getList: _.debounce(
            function () {
                axios.get('http://localhost/repo-code/app/backend/api.php?action=getall')
                    .then(function (res) {
                        this.items = res.data.body;
                    }.bind(this)) // Ràng buộc ngữ cảnh của từ khoá 'this' với đối tượng Vue
                    .catch(function (error) {
                        this.error = 'Lỗi! Không thể truy cập API. ' + error
                    })
            },
            100
        ),
        editItem: function () { },
        deleteItem: function () { },
    },
    mounted: function () {
        console.log("mounted")
        this.getList();
    },
    created: function () {
        console.log("created")
    },
});
