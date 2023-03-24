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
        resetSearch: function () {
            this.searchParams.c_code = '';
            this.searchParams.c_ten_cong_ty = '';
            this.searchParams.c_name = '';
            this.searchParams.c_trang_thai = '';
        },
        formSearch: function () {
            axios.get('http://localhost/repo-code/app/backend/api.php?action=search', {
                params: this.searchParams
            }).then((res) => {
                console.log(res)
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
        error: null,
        isLoading: false,
        isShowList: false,
        c_code: "",
        c_temp: 1,
        formTitle: "Import bảng kê",
        controlClass: "form-control bg-gray-50 text-gray-900 border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2",
    },

    watch:{
        c_code: function(e){
            console.log(e)
        }
    },

    methods: {
        resetFormUpload: function () {
            this.items = [];
            this.error = null;
            this.c_code = "";
            this.c_file = "";
            this.c_temp = "";
            this.$refs.formFile.value = "";
            this.isShowList = false;
        },

        handleFileUploadXLSX(event) {
            this.isLoading = true;
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, {
                    type: 'binary'
                });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const range = 'A3:H' + (worksheet['!ref'].split(':')[1]);
                const decodedRange = XLSX.utils.decode_range(range);
                const header = ['A_ten_cong_ty', 'B_ten_ndbh', 'C_ngay', 'D_thang', 'E_nam', 'F_so_hop_dong', 'G_hieu_luc', 'H_email'];

                const jsonDatatable = XLSX.utils.sheet_to_json(worksheet, {
                    range: decodedRange,
                    header: 1
                });

                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    range: decodedRange,
                    header: header
                });

                // Thêm cột đầu tiên chứa giá trị index tăng dần
                const jsonDataWithIndex = jsonData.map((row, index) => {
                    return {
                        index: index + 1,
                        ...row
                    };
                });

                this.items = jsonData;
                console.log(jsonData)
                $('#tableList').DataTable().destroy();
                $('#tableList').DataTable({
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json',
                    },
                    data: jsonDataWithIndex,
                    columns: [{
                            data: 'index',
                            className: "whitespace-nowrap p-2 text-center font-medium"
                        },
                        {
                            data: 'A_ten_cong_ty',
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: 'B_ten_ndbh',
                            className: "whitespace-nowrap p-2",

                        },
                        {
                            data: 'C_ngay',
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: 'D_thang',
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: 'E_nam',
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: 'F_so_hop_dong',
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: 'G_hieu_luc',
                            className: "whitespace-nowrap p-2",
                        },
                        {
                            data: 'H_email',
                            className: "whitespace-nowrap p-2",
                        },

                    ]
                });
            };
            this.isLoading = false;
            this.isShowList = true;

            reader.readAsBinaryString(file);
        },

        async handleFileUpload() {
            const file = this.$refs.c_file.files[0];
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost/repo-code/app/backend/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            this.items = response.data;
        },

        onInputChange(event) {
            const filteredInput = this.filterInput(event.target.value);
            this.c_code = filteredInput;
        },

        filterInput(inputString) {
            const uppercaseString = inputString.toUpperCase();
            const filteredString = uppercaseString.replace(/[^A-Z0-9]/g, '');
            return filteredString;
        },

        validateInput(value, rules) {
            this.error = null;
            // Loop through the rules array
            console.log(value)
            return;
            for (let i = 0; i < rules.length; i++) {
                // Split each rule into its individual parts (e.g. "minLength:5" becomes ["minLength", "5"])
                let ruleParts = rules[i].split(':');
                let ruleName = ruleParts[0];
                let ruleParam = ruleParts[1];

                // Call the appropriate rule validation function based on the rule name
                switch (ruleName) {
                    case 'required':
                        if (!value || value.length === 0) {
                            return this.error = 'Thông tin bắt buộc nhập.';
                        }
                        break;

                    case 'minLength':
                        if (value.length < ruleParam) {
                            return this.error = `This field must be at least ${ruleParam} characters long.`;
                        }
                        break;

                    case 'email':
                        let emailRegex = /\S+@\S+\.\S+/;
                        if (!emailRegex.test(value)) {
                            return this.error = 'Please enter a valid email address.';
                        }
                        break;

                    case 'noSpace':
                        if (/\s/.test(value)) {
                            return this.error = 'This field cannot contain spaces.';
                        }
                        break;

                    case 'excel':
                        let fileExtension = value.split('.').pop().toLowerCase();
                        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
                            return this.error = 'Please upload an Excel file (XLSX or XLS format).';
                        }
                        break;

                    case 'code':
                        if (!value || value.length === 0) {

                            return this.error = 'Thông tin bắt buộc nhập.';
                        }
                        break;

                    default:
                        break;
                }
            }

            // If all rules pass, return null (no error message)
            return null;
        },

        onSubmitFormUpload: function () {
            // this.validateInput(this.c_code);
            // // Validate các component custom-input
            // let isValid = true;
            // Object.values(this.$refs).forEach((component) => {
            //     if (component.validate && !component.validate()) {
            //         isValid = false;
            //     }
            // });
            // // Nếu các giá trị nhập vào không hợp lệ thì không submit form
            // if (!isValid) {
            //     return;
            // }
        }
    },
});

var openModalUpload = function () {
    formUpload.resetFormUpload();
    $('#tableList').DataTable().clear().draw();
}
var deleteItems = function () {
    appEl.deleteItems();
}

$(function () {

    const formUpdateModal = new mdb.Modal($('#formUpdate'))
    $('#formUpdate').on('hidden.mdb.modal', function (event) {
        formUpdate.resetInput();
    });

    const formUploadModal = new mdb.Modal($('#formUpload'))
    $('#formUpload').on('hide.mdb.modal', function (event) {});

    $('#formUpload').on('hidden.mdb.modal', function (event) {});

    console.log("ready!");

});