<div id="uploadEl">

    <!-- Form Upload-->
    <div id="formUpload" data-te-modal-init class="modal" tabindex="-1" aria-hidden="true">
        <div data-te-modal-dialog-ref class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header flex items-center">
                    <h5 class="modal-title">
                        <svg class="inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                            <path fill="#4CAF50" d="M41,10H25v28h16c0.553,0,1-0.447,1-1V11C42,10.447,41.553,10,41,10z" />
                            <path fill="#FFF" d="M32 15H39V18H32zM32 25H39V28H32zM32 30H39V33H32zM32 20H39V23H32zM25 15H30V18H25zM25 25H30V28H25zM25 30H30V33H25zM25 20H30V23H25z" />
                            <path fill="#2E7D32" d="M27 42L6 38 6 10 27 6z" />
                            <path fill="#FFF" d="M19.129,31l-2.411-4.561c-0.092-0.171-0.186-0.483-0.284-0.938h-0.037c-0.046,0.215-0.154,0.541-0.324,0.979L13.652,31H9.895l4.462-7.001L10.274,17h3.837l2.001,4.196c0.156,0.331,0.296,0.725,0.42,1.179h0.04c0.078-0.271,0.224-0.68,0.439-1.22L19.237,17h3.515l-4.199,6.939l4.316,7.059h-3.74V31z" />
                        </svg>{{formTitle}}
                    </h5>
                    <button type="button" class="btn-close" data-te-modal-dismiss aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div data-te-modal-body-ref>
                        <div class="row mb-3">
                            <label for="c_code" class="col-sm-4 col-form-label">
                                Mã bảng kê <span class="text-danger">*</span>
                            </label>
                            <div class="col-sm-8">
                                <input id="c_code" v-model="c_code" required="required" type="text" class="form-control bg-gray-50 text-gray-900 border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ">
                                <div v-if="error" class="invalid-feedback">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label class="col-sm-4 col-form-label" for="c_temp">Chọn mẫu thẻ</label>
                            <div class="col-sm-8">
                                <select class="form-select bg-gray-50 text-gray-900 border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2" name="c_temp" id="c_temp" v-model="c_temp">
                                    <option value="1">Mẫu VNICare InSmart</option>
                                    <option value="2">Mẫu T&amp;T Care</option>
                                    <option value="3">Mẫu BSH T&amp;T Group</option>
                                    <option value="4">Mẫu VNICare</option>
                                    <option value="5">Mẫu SHB ATACC</option>
                                    <option value="6">Mẫu LeapStack</option>
                                    <option value="7">Mẫu VNICare ATSK</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="c_code" class="col-sm-4 col-form-label">
                                Chọn file Upload <span class="text-danger">*</span>
                            </label>
                            <div class="col-sm-8">
                                <div class="flex justify-center">
                                    <div class="w-100">
                                        <input ref="fileInput" @change="handleFileUploadXLSX" type="file" id="formFile" accept=".xlsx, .xls" class="form-control text-sm" type="file" id="formFile" />
                                        <div v-if="error" class="invalid-feedback">
                                            {{ error }}
                                        </div>
                                        <p class="mt-1 text-sm text-gray-500" id="file_input_help">Vui lòng chọn file định dạng theo mẫu Excel</p>
                                    </div>
                                </div>
                                <button v-if="isShowList" data-te-toggle="modal" data-te-target="#ListItemUpload" data-te-ripple-init data-te-ripple-color="light" class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    <span class="material-icons-round">
                                        subdirectory_arrow_right
                                    </span>Kiểm tra danh sách </button>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="inline-block rounded-md bg-[#ffffff] px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" data-te-modal-dismiss data-te-ripple-init data-te-ripple-color="light">
                        Đóng
                    </button>

                    <button type="button" @click.prevent="onSubmit()" class="ml-1 inline-block rounded bg-indigo-600 px-3 py-2 text-sm font-semibold leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-500 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-500 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-indigo-600-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]" data-te-ripple-init data-te-ripple-color="light">
                        Cập nhập
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- End-Form Upload-->


    <div id="ListItemUpload" data-te-modal-init data-te-backdrop="static" data-te-keyboard="false" class="modal" tabindex="-1" aria-hidden="true">
        <div data-te-modal-dialog-ref class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"> Danh sách <span class="text-danger-700">{{items.length}}</span> bản ghi</h5>
                    <button type="button" class="flex items-center" data-te-toggle="modal" data-te-target="#formUpload" aria-label="Close">
                        <span class="material-icons-round text-base me-1">
                            arrow_back_ios
                        </span>
                        <span>
                            Quay lại
                        </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div data-te-modal-body-ref>
                        <div class="relative">
                            <table v-if="isShowList" id="tableList" class="table is-striped cell-border w-100 align-middle table-hover text-xs">
                                <thead class="table-light">
                                    <tr class="align-middle">
                                        <th rowspan="2" class="!w-[1%] text-center align-middle">#</th>
                                        <th rowspan="2" class="!w-[20%] align-middle">Tên công ty</th>
                                        <th rowspan="2" class="!w-[20%] align-middle">Tên người ĐBH</th>
                                        <th colspan="3" class="align-middle text-center">Năm sinh</th>
                                        <th rowspan="2" class="!w-[10%] align-middle">Số hợp đồng</th>
                                        <th rowspan="2" class="!w-[10%] align-middle">Hiệu lực</th>
                                        <th rowspan="2" class="align-middle">Email</th>
                                    </tr>
                                    <tr>
                                        <th class="text-center !w-[5%] align-middle">Ngày</th>
                                        <th class="text-center !w-[5%] align-middle">Tháng</th>
                                        <th class="text-center !w-[5%] align-middle">Năm</th>
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

</div>