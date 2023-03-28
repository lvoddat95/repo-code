<!-- Modal -->

<div id="uploadEl">

    <!-- Form Upload-->
    <div id="formUpload" class="modal top fade" tabindex="-1" aria-labelledby="" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header flex items-center">
                    <h5 class="modal-title">
                        <svg class="inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                            <path fill="#4CAF50" d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z" />
                            <path fill="#FFF" d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25 25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z" />
                            <path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z" />
                            <path fill="#FFF" d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.04c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z" />
                        </svg>
                        {{formTitle}}

                    </h5>
                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="row mb-3">
                        <label for="c_code" class="col-sm-4 col-form-label">
                            Mã bảng kê <span class="text-danger">*</span>
                        </label>
                        <div class="col-sm-8">
                            <input id="c_code" v-model="c_code" ref="c_code" type="text" v-bind:class="[{ 'is-invalid': errors.c_code }, controlClass]">
                            <div v-if="errors.c_code" class="invalid-feedback position-static">
                                {{ errors.c_code }}
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="c_temp" class="col-sm-4 col-form-label">Chọn mẫu thẻ <span class="text-danger">*</span></label>
                        <div class="col-sm-8">
                            <select id="c_temp" v-model="c_temp" ref="c_temp" v-bind:class="[{ 'is-invalid': errors.c_temp }, controlClass]" class="form-select">
                                <option value="">Chọn</option>
                                <option value="1">Mẫu VNICare InSmart</option>
                                <option value="2">Mẫu T&amp;T Care</option>
                                <option value="3">Mẫu BSH T&amp;T Group</option>
                                <option value="4">Mẫu VNICare</option>
                                <option value="5">Mẫu SHB ATACC</option>
                                <option value="6">Mẫu LeapStack</option>
                                <option value="7">Mẫu VNICare ATSK</option>
                            </select>
                            <div v-if="errors.c_temp" class="invalid-feedback position-static">
                                {{ errors.c_temp }}
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <label for="formFile" class="col-sm-4 col-form-label">
                            Chọn file Upload <span class="text-danger">*</span>
                        </label>
                        <div class="col-sm-8">
                            <div class="flex justify-center mb-2">
                                <div class="w-100">
                                    <input id="formFile" ref="formFile" @change="handleFileUploadXLSX" type="file" accept=".xlsx, .xls" v-bind:class="[{ 'is-invalid': errors.formFile }, 'form-control']" type="file" />
                                    <div v-if="errors.formFile" class="invalid-feedback position-static">
                                        {{ errors.formFile }}
                                    </div>
                                    <p class="mt-1 mb-0 text-sm text-gray-500" id="file_input_help">Vui lòng chọn file định dạng theo mẫu Excel</p>
                                </div>
                            </div>

                            <!-- Note: class .show is used for demo purposes. Remove it when using it in the real project. -->
                            <div v-if="errors.listItemError.length !== 0" class="alert alert-danger mb-0 p-2 px-3" role="alert">
                                <i class="fa-solid fa-triangle-exclamation me-2"></i>
                                Có <span>{{errors.listItemError.length}}</span> lỗi cần sửa
                            </div>
                            <button v-if="isShowList" data-mdb-toggle="modal" href="#ListItemUpload" role="button" data-te-ripple-init data-te-ripple-color="light" class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <span class="material-icons-round">
                                    subdirectory_arrow_right
                                </span>Kiểm tra danh sách {{items.length}} bản ghi</button>
                        </div>
                    </div>

                    <div v-if="uploading">{{ progressPercentage }}% Đang tải lên...</div>


                    <div class="progress" v-if="uploading">
                        <div class="progress-bar" role="progressbar" :style="{ width: progressPercentage + '%' }" :aria-valuenow="progressPercentage" aria-valuemin="0" aria-valuemax="100">{{ progressPercentage }}%</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-mdb-dismiss="modal" aria-label="Close" class="btn btn-light ripple-surface-dark" data-mdb-ripple-color="dark">
                        Đóng
                    </button>
                    <button type="button" @click.prevent="onSubmitFormUpload()" class="btn btn-primary me-1">
                        Cập nhập
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- End-Form Upload-->


    <div id="ListItemUpload" class="modal fade" aria-hidden="true" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> Danh sách <span class="text-danger-700">{{items.length}}</span> bản ghi</h5>
                    <button type="button" class="flex items-center" data-mdb-toggle="modal" href="#formUpload" role="button">
                        <span class="material-icons-round text-base me-1">
                            arrow_back_ios
                        </span>
                        <span>
                            Quay lại
                        </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="relative text-sm">
                        <div class="alert alert-danger mb-3" role="alert" v-if="errors.listItemError.length !== 0" >
                            <div class="mb-1 font-medium">Vui lòng cập nhập các thông tin sau:</div>
                            <div v-for="(itemError, index) in errors.listItemError" :key="index">
                                {{itemError}}
                            </div>
                        </div>
                        <table v-if="isShowList" id="tableList" class="table table-striped w-100 align-middle table-hover">
                            <thead class="table-light">
                                <tr class="align-middle">
                                    <th rowspan="2" class="!w-[1%] p-2 text-center align-middle"></th>
                                    <th rowspan="2" class="!w-[30%] p-2 align-middle">Tên công ty</th>
                                    <th rowspan="2" class="!w-[20%] p-2 align-middle">Tên người ĐBH</th>
                                    <th colspan="3" class="p-2 align-middle text-center">Năm sinh</th>
                                    <th rowspan="2" class="!w-[10%] p-2 align-middle">Số hợp đồng</th>
                                    <th rowspan="2" class="!w-[10%] p-2 align-middle">Hiệu lực</th>
                                    <th rowspan="2" class="!w-[10%] p-2 align-middle">Email</th>
                                </tr>
                                <tr>
                                    <th class="text-center !w-[5%] p-2 align-middle">Ngày</th>
                                    <th class="text-center !w-[5%] p-2 align-middle">Tháng</th>
                                    <th class="text-center !w-[5%] p-2 align-middle">Năm</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- <tr v-for="(item, index) in items" :key="index">
                                <td class="text-center">{{ index+1 }}</td>
                                <td>{{ item.A_ten_cong_ty }}</td>
                                <td>{{ item.B_ten_ndbh }}</td>
                                <td class="text-center">{{ item.C_ngay }}</td>
                                <td class="text-center">{{ item.D_thang }}</td>
                                <td class="text-center">{{ item.E_nam }}</td>
                                <td>{{ item.F_so_hop_dong }}</td>
                                <td>{{ item.G_hieu_luc }}</td>
                                <td>{{ item.H_email }}</td>
                            </tr> -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>