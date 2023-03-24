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
    },
    methods: {
        resetFormUpload: function () {
            this.items = [];
            this.error = null;
            this.c_code = "";
            this.c_file = "";
            this.c_temp = 1;
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