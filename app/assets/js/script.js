

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
            const formatCode = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            this.c_code = formatCode;
            this.validateInput(value, "c_code", ['required']);
        },
        c_temp: function (newVal, oldVal) {
            console.log("Selected value changed from " + oldVal + " to " + newVal);
            this.validateInput(newVal, "c_temp", ['required']);
        },
    },

    methods: {

        resetFormUpload: function () {
            this.dataListDestroy();
            this.items = [];
            this.c_code = "";
            this.c_temp = "";
            this.errors = {};
            this.$refs.formFile.value = "";
            this.isShowList = false;
        },

        dataListDestroy: function () {
            $('#tableList').DataTable().destroy();
        },

        validateExcelFile: function (worksheet) {
            const validHeaders = ['Tên Công Ty', 'Tên NĐBH', 'Năm Sinh', 'Số Hợp Đồng', 'Hiệu lực', 'Email'];
            const headersX = [];
            const rangeX = XLSX.utils.decode_range(worksheet['!ref']);
            for (let C = rangeX.s.c; C <= rangeX.e.c; ++C) {
                const headerCell = worksheet[XLSX.utils.encode_cell({ r: rangeX.s.r, c: C })];
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
                    type: 'binary'
                });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const range = 'A3:H' + (worksheet['!ref'].split(':')[1]);
                const decodedRange = await XLSX.utils.decode_range(range);
                const header = ['A_ten_cong_ty', 'B_ten_ndbh', 'C_ngay', 'D_thang', 'E_nam', 'F_so_hop_dong', 'G_hieu_luc', 'H_email'];
                const jsonData = await XLSX.utils.sheet_to_json(worksheet, { range: decodedRange, header: header, defval: "", });

                this.items = jsonData.map((row, index) => ({ index: index + 1, ...row }));

                const isValidFile = this.validateExcelFile(worksheet);
                if (!isValidFile) {
                    this.errors.formFile = 'Không đúng định dạng file Excel mẫu.';
                    this.dataListDestroy();
                    this.items = [];
                    this.isShowList = false;
                    return;
                }

                this.dataListDestroy();

                // console.log(this.items)

                $('#tableList').DataTable({
                    language: {
                        url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json',
                    },
                    data: this.items,
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
            formData.append('file', file);

            const response = await axios.post('http://localhost/repo-code/app/backend/upload.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            this.items = response.data;
        },

        validateInput(value, model, rules) {
            let error = "";
            for (let i = 0; i < rules.length; i++) {
                // Split each rule into its individual parts (e.g. "minLength:5" becomes ["minLength", "5"])
                let ruleParts = rules[i].split(':');
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
                    case 'required':
                        if (!value || value.length === 0) {
                            error = 'Thông tin bắt buộc nhập.';
                        }
                        break;

                    case 'minLength':
                        if (value.length < ruleParam) {
                            error = `Trường này phải có ít nhất ${ruleParam} kí tự.`;
                        }
                        break;

                    case 'email':
                        let emailRegex = /\S+@\S+\.\S+/;
                        if (!emailRegex.test(value)) {
                            error = 'Vui lòng nhập một địa chỉ Email hợp lệ.';
                        }
                        break;

                    case 'noSpace':
                        if (/\s/.test(value)) {
                            error = 'Trường này không thể chứa khoảng trắng.';
                        }
                        break;

                    case 'excel':
                        let fileExtension = value.split('.').pop().toLowerCase();
                        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
                            error = 'Vui lòng tải lên tệp Excel (định dạng XLSX hoặc XLS).';
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

            let formData = new FormData();
            formData.append("data", JSON.stringify(this.items));
            formData.append("c_code", this.$refs.c_code.value);
            formData.append("c_temp", this.$refs.c_temp.value);

            axios.post('http://localhost/repo-code/app/backend/api.php?action=updateSheet', formData, {
                onUploadProgress: progressEvent => {
                    console.log(progressEvent);
                    // cập nhật phần trăm tiến trình
                    this.progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                },
            }).then(() => {
                // xử lý khi upload hoàn thành
                this.uploading = false; // kết thúc tiến trình
                console.log(response.data);
            }).catch(() => {
                // xử lý khi có lỗi xảy ra
                this.uploading = false; // kết thúc tiến trình
            });

        }
    },
});

function openModalUpload() {
    formUpload.resetFormUpload();
    $('#formUpload').modal("show");
}
function deleteItems() {
    appEl.deleteItems();
}



const formUpdateModal = new mdb.Modal($('#formUpdate'))
$('#formUpdate').on('hidden.mdb.modal', function (event) {
    formUpdate.resetInput();
});

const formUploadModal = new mdb.Modal($('#formUpload'))
$('#formUpload').on('hidden.mdb.modal', function (event) { });

console.log("ready!");
