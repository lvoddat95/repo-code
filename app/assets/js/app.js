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
            } else if (
                newValue &&
                this.dataType === "date" &&
                !this.validateDate(newValue)
            ) {
                this.error = `Định dạng ngày không hợp lệ. Vui lòng nhập ngày theo định dạng dd/mm/yyyy`;
            } else if (
                newValue &&
                this.dataType === "email" &&
                !this.validateEmail(newValue)
            ) {
                this.error = `Định dạng Email không hợp lệ.`;
            } else if (newValue !== this.initialValue) {
                this.error = null;
                return;
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
        reset: function () {
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
            } else if (
                this.dataType === "date" &&
                !this.validateDate(this.inputValue)
            ) {
                this.setError(
                    `Định dạng ngày không hợp lệ. Vui lòng nhập ngày theo định dạng dd/mm/yyyy`
                );
                return false;
            } else if (
                this.dataType === "email" &&
                !this.validateEmail(this.inputValue)
            ) {
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
            <div v-if="error" class="invalid-feedback position-static">
                {{ error }}
            </div>
        </div>
    </div>`,
});

Vue.directive("format-date", {
    bind: function (el) {
        el.addEventListener("input", function (e) {
            if (e.target.value.length === 2 || e.target.value.length === 5) {
                e.target.value += "/";
            }
        });
        el.addEventListener("keypress", function (e) {
            var charCode = e.which ? e.which : e.keyCode;
            if (charCode < 48 || charCode > 57) {
                e.preventDefault();
            }
        });
    },
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
    },
    watch: {},
    computed: {
        totalItems: {
            get: function () {
                return this.items.length;
            },
            set: function (value) {
                this.totalItems = value;
            },
        },

        totalPages: function () {
            if (this.perPage == 0) {
                return this.totalItems > 0 ? 1 : 0;
            }
            return Math.ceil(this.totalItems / this.perPage);
        },
    },
    methods: {
        paginate: function (items) {
            if (!items || !Array.isArray(items)) {
                return [];
            }

            let start = (this.currentPage - 1) * this.perPage;
            let end = start + this.perPage;
            end = Math.min(end, items.length); // Kiểm tra và giới hạn giá trị của end

            return items.slice(start, end);
        },

        updatePage: function (page) {
            this.currentPage = page;
        },

        toggleCheckedAll() {
            this.isCheckedAll = !this.isCheckedAll;
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            const currentPageItems = this.items.slice(start, end);
            currentPageItems.forEach((item) => {
                item.isChecked = this.isCheckedAll;
            });
        },

        toggleChecked(item) {
            item.isChecked = !item.isChecked;
            this.isCheckedAll = this.items.every((item) => item.isChecked);
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
            this.items.forEach((item) => {
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
                })
                    .then((res) => {
                        if (res.data.error) {
                            alert("Error");
                            return;
                        }

                        alert("Đã xoá thành công");
                        this.getList();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
                })
                    .then((res) => {
                        if (res.data.error) {
                            alert("Error");
                            return;
                        }

                        alert("Đã xoá thành công");
                        this.getList();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
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
            })
                .then((res) => {
                    if (res.data.error === false) {
                        formUpdate.$refs.c_code.inputValue = res.data.body.c_code;
                        formUpdate.$refs.c_ten_cong_ty.inputValue =
                            res.data.body.c_ten_cong_ty;
                        formUpdate.$refs.c_name.inputValue = res.data.body.c_name;
                        formUpdate.$refs.c_nam_sinh.inputValue = res.data.body.c_nam_sinh;
                        formUpdate.$refs.c_so_hop_dong.inputValue =
                            res.data.body.c_so_hop_dong;
                        formUpdate.$refs.c_hieu_luc.inputValue = res.data.body.c_hieu_luc;
                        formUpdate.$refs.c_email.inputValue = res.data.body.c_email;
                        formUpdate.c_temp = res.data.body.c_temp;
                        formUpdate.c_trang_thai = parseInt(res.data.body.c_trang_thai);
                        $("#formUpdate").modal("show");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getList: _.debounce(function () {
            axios
                .get("http://localhost/repo-code/app/backend/api.php?action=getall")
                .then(
                    function (res) {
                        // console.log(res)
                        this.items = res.data.body;
                        if (this.items && this.perPage > 0) {
                            this.totalItems = this.items.length;
                            this.totalPages = Math.ceil(this.totalItems / this.perPage);
                        }
                    }.bind(this)
                ) // Ràng buộc ngữ cảnh của từ khoá 'this' với đối tượng Vue
                .catch(function (error) {
                    this.error = "Lỗi! Không thể truy cập API. " + error;
                });
        }, 100),
    },
    mounted: function () {
        this.getList();
    },
    created: function () { },
});

var formSearch = new Vue({
    el: "#formSearch",
    data: {
        searchParams: {
            c_code: "",
            c_ten_cong_ty: "",
            c_name: "",
            c_trang_thai: "",
        },
        items: [],
    },
    methods: {
        resetSearch: function () {
            this.searchParams.c_code = "";
            this.searchParams.c_ten_cong_ty = "";
            this.searchParams.c_name = "";
            this.searchParams.c_trang_thai = "";
        },
        formSearch: function () {
            axios
                .get("http://localhost/repo-code/app/backend/api.php?action=search", {
                    params: this.searchParams,
                })
                .then((res) => {
                    console.log(res);
                    if (!res.data.error) {
                        appEl.items = res.data.body;
                    } else {
                        appEl.items = [];
                    }
                });
        },
    },
});

var formUpdate = new Vue({
    el: "#formUpdate",
    data: {
        formTitle: "Thêm mới",
        pk_id: "",
        updateParams: {
            c_code: "",
            c_ten_cong_ty: "",
            c_so_hop_dong: "",
            c_hieu_luc: "",
            c_name: "",
            c_nam_sinh: "",
            c_email: "",
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

                axios
                    .post(
                        "http://localhost/repo-code/app/backend/api.php?action=" +
                        url_action,
                        data
                    )
                    .then((res) => {
                        if (res.data.error) {
                            alert("Error");
                            return;
                        }
                        alert(res.data.message);
                        $("#formUpdate").modal("hide");
                        appEl.getList();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },

        resetInput: function () {
            for (let refName in this.$refs) {
                const ref = this.$refs[refName];
                if (typeof ref.$options !== "undefined") {
                    // console.log(ref)
                    ref.reset();
                }
            }
        },

        openModalUpdate: function (resetData = false) {
            $("#formUpdate").modal("show");
            if (resetData) {
                this.resetInput();
            }
        },

        dismissModal: function () {
            this.resetInput();
        },
    },
});

var formUpload = new Vue({
    el: "#uploadEl",
    data: {
        items: [],
        c_code: "",
        c_temp: "",
        errors: {},
        isLoading: false,
        isShowList: false,
        formTitle: "Import bảng kê",
        controlClass: "form-control",
        uploading: false, // biến lưu trạng thái tiến trình
        progressPercentage: 0, // biến lưu phần trăm tiến trình
    },

    watch: {
        c_code: function (value) {
            const formatCode = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
            this.c_code = formatCode;
            this.validateInput(value, "c_code", ["required"]);
        },
        c_temp: function (newVal, oldVal) {
            console.log("Selected value changed from " + oldVal + " to " + newVal);
            this.validateInput(newVal, "c_temp", ["required"]);
        },
    },

    methods: {
        resetFormUpload: function () {
            this.dataListDestroy();
            this.items = [];
            this.c_code = "";
            this.c_temp = "";
            this.errors = {
                listItemError: []
            };
            this.$refs.formFile.value = "";
            this.isShowList = false;
        },

        dataListDestroy: function () {
            $("#tableList").DataTable().destroy();
        },

        validateExcelFile: function (worksheet) {
            const validHeaders = [
                "Tên Công Ty",
                "Tên NĐBH",
                "Năm Sinh",
                "Số Hợp Đồng",
                "Hiệu lực",
                "Email",
            ];
            const headersX = [];
            const rangeX = XLSX.utils.decode_range(worksheet["!ref"]);
            for (let C = rangeX.s.c; C <= rangeX.e.c; ++C) {
                const headerCell =
                    worksheet[
                    XLSX.utils.encode_cell({
                        r: rangeX.s.r,
                        c: C,
                    })
                    ];
                if (!headerCell) {
                    continue;
                }
                headersX.push(headerCell.w);
            }

            if (headersX.length !== validHeaders.length) {
                return false;
            }

            for (let i = 0; i < validHeaders.length; i++) {
                if (headersX[i] !== validHeaders[i]) {
                    return false;
                }
            }
            return true;
        },

        resetFileUpload: function () {
            this.dataListDestroy();
            this.items = [];
            this.$refs.formFile.value = "";
            this.isShowList = false;
            return;
        },

        async handleFileUploadXLSX(event) {
            const file = event.target.files[0];
            this.isLoading = true;
            this.errors.formFile = "";

            if (!file) {
                this.resetFileUpload();
            }

            const reader = new FileReader();

            reader.onload = async (e) => {
                const data = e.target.result;
                const workbook = await XLSX.read(data, {
                    type: "binary",
                });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const range = "A3:H" + worksheet["!ref"].split(":")[1];
                const decodedRange = await XLSX.utils.decode_range(range);
                const header = [
                    "A_ten_cong_ty",
                    "B_ten_ndbh",
                    "C_ngay",
                    "D_thang",
                    "E_nam",
                    "F_so_hop_dong",
                    "G_hieu_luc",
                    "H_email",
                ];
                const jsonData = await XLSX.utils.sheet_to_json(worksheet, {
                    range: decodedRange,
                    header: header,
                    defval: "",
                });

                this.items = jsonData.map((row, index) => ({
                    index: index + 1,
                    ...row,
                }));

                const isValidFile = this.validateExcelFile(worksheet);
                if (!isValidFile) {
                    this.errors.formFile = "Không đúng định dạng file Excel mẫu.";
                    this.dataListDestroy();
                    this.items = [];
                    this.isShowList = false;
                    return;
                }

                this.dataListDestroy();

                // console.log(this.items)

                $("#tableList").DataTable({
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json",
                    },
                    data: this.items,
                    columns: [
                        {
                            data: "index",
                            className: "whitespace-nowrap p-2 text-center font-medium",
                        },
                        {
                            data: "A_ten_cong_ty",
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: "B_ten_ndbh",
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: "C_ngay",
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: "D_thang",
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: "E_nam",
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: "F_so_hop_dong",
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: "G_hieu_luc",
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: "H_email",
                            className: "whitespace-nowrap p-2",
                        },
                    ],
                });
            };

            this.isShowList = true;

            reader.onerror = () => {
                reader.abort();
                this.errors.formFile = "Đã xảy ra lỗi khi đọc tệp";
                this.isLoading = false;
            };

            if (file instanceof Blob) {
                reader.readAsBinaryString(file);
            }
        },

        async handleFileUploadPHP() {
            const file = this.$refs.c_file.files[0];
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                "http://localhost/repo-code/app/backend/upload.php",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            this.items = response.data;
        },

        validateInput(value, model, rules) {
            let error = "";
            for (let i = 0; i < rules.length; i++) {
                // Split each rule into its individual parts (e.g. "minLength:5" becomes ["minLength", "5"])
                let ruleParts = rules[i].split(":");
                let ruleName = ruleParts[0];
                let ruleParam = ruleParts[1];

                // Call the appropriate rule validation function based on the rule name
                switch (ruleName) {
                    case "name":
                        // Kiểm tra tên
                        if (!/^[a-zA-Z\s]*$/.test(value)) {
                            error = "Tên chỉ được phép chứa chữ cái và khoảng trắng";
                        }
                        break;
                    case "required":
                        if (!value || value.length === 0) {
                            error = "Thông tin bắt buộc nhập.";
                        }
                        break;

                    case "minLength":
                        if (value.length < ruleParam) {
                            error = `Trường này phải có ít nhất ${ruleParam} kí tự.`;
                        }
                        break;

                    case "email":
                        let emailRegex = /\S+@\S+\.\S+/;
                        if (!emailRegex.test(value)) {
                            error = "Vui lòng nhập một địa chỉ Email hợp lệ.";
                        }
                        break;

                    case "noSpace":
                        if (/\s/.test(value)) {
                            error = "Trường này không thể chứa khoảng trắng.";
                        }
                        break;

                    case "excel":
                        let fileExtension = value.split(".").pop().toLowerCase();
                        if (fileExtension !== "xlsx" && fileExtension !== "xls") {
                            error = "Vui lòng tải lên tệp Excel (định dạng XLSX hoặc XLS).";
                        }
                        break;

                    default:
                        break;
                }
                // Cập nhật errors object
                // this.errors = { ...this.errors, [model]: error };
                this.$set(this.errors, model, error);
            }

            // If all rules pass, return null (no error message)
            return null;
        },

        onSubmitFormUpload: function () {
            console.log(this.items)
            // this.validateInput(this.$refs.c_code.value, "c_code", ['required']);
            // this.validateInput(this.$refs.c_temp.value, "c_temp", ['required']);

            // if (this.items.length === 0) {
            //     this.errors.formFile = "Thông tin bắt buộc nhập.";
            // }

            // if (Object.keys(this.errors).length > 0 && this.items.length === 0) {
            //     console.log("Có lỗi xảy ra");
            //     // Hiển thị các lỗi đó cho người dùng
            //     return;
            // }

            this.errors.listItemError = [];
            let emptyFields = [];
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i]["A_ten_cong_ty"] === "" || this.items[i]["C_ngay"] === "") {
                  emptyFields.push(`Dòng ${i+1} có ${this.items[i]["A_ten_cong_ty"] === "" ? "A_ten_cong_ty" : ""}${this.items[i]["A_ten_cong_ty"] === "" && this.items[i]["C_ngay"] === "" ? ", " : ""}${this.items[i]["C_ngay"] === "" ? "C_ngay" : ""} trống`);
                }
              }

            for (let index = 0; index < this.items.length; index++) {
                const element = this.items[index];

                let emptyFields = [];

                for (let prop in element) {

                    if (element["A_ten_cong_ty"] === "") {
                        emptyFields.push("Tên công ty");
                    }
                    else if (element["B_ten_ndbh"] === "") {
                        emptyFields.push("Tên người ĐBH");
                    }
                    else if (element["F_so_hop_dong"] === "") {
                        emptyFields.push("Số hợp đồng");
                    }
                    else if (element["G_hieu_luc"] === "") {
                        emptyFields.push("Hiệu lực");
                    }
                    else if (element["H_email"] === "") {
                        emptyFields.push("Email");
                    }
                }

                if (emptyFields.length > 0) {
                    this.errors.listItemError.push(`Dòng <b>${index + 1}</b> có ${emptyFields.join(", ")} trống`);
                }

            }


            // if (this.errors.listItemError.length > 0) {
            //     console.log(this.errors.listItemError.join("\n"));
            // }

            console.log(this.errors.listItemError);
            return;


        },
    },

    created: function () {
        this.errors.listItemError = [];
    },
});

const formUpdateModal = new mdb.Modal($("#formUpdate"));
$("#formUpdate").on("hidden.mdb.modal", function (event) {
    formUpdate.resetInput();
});

const formUploadModal = new mdb.Modal($("#formUpload"));
$("#formUpload").on("hidden.mdb.modal", function (event) { });

function openModalUpload() {
    formUpload.resetFormUpload();
    $("#formUpload").modal("show");
}

function deleteItems() {
    appEl.deleteItems();
}
