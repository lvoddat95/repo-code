<div id="uploadEl">

    <!-- Form Upload-->
    <div id="formUpload" data-te-modal-init class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" tabindex="-1" aria-labelledby="" aria-hidden="true">
        <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
            <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="">
                        {{formTitle}}
                    </h5>
                    <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="relative flex-auto p-4" data-te-modal-body-ref>
                    <div class="row mb-3">
                        <label for="c_code" class="col-sm-4 col-form-label">
                            Mã bảng kê <span class="text-danger">*</span>
                        </label>
                        <div class="col-sm-8">
                            <input id="c_code" v-model="c_code" required="required" type="text" class="form-control bg-gray-50 text-gray-900 border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ">
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
                                    <p class="mt-1 text-sm text-gray-500" id="file_input_help">Vui lòng chọn file định dạng theo mẫu Excel</p>
                                </div>
                            </div>

                            <button v-if="isShowList" data-te-toggle="modal" data-te-target="#exampleModalXl" data-te-ripple-init data-te-ripple-color="light" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Kiểm tra danh sách <span aria-hidden="true">→</span></button>

                        </div>
                    </div>


                </div>
                <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <button type="button" class="inline-block rounded-md bg-[#ffffff] px-3 pt-2.5 pb-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" data-te-modal-dismiss data-te-ripple-init data-te-ripple-color="light">
                        Đóng
                    </button>

                    <button type="button" @click.prevent="onSubmit()" class="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]" data-te-ripple-init data-te-ripple-color="light">
                        Cập nhập
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- End-Form Upload-->

    <div data-te-modal-init class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" id="exampleModalXl" tabindex="-1" aria-labelledby="exampleModalXlLabel" aria-modal="true" role="dialog">
        <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]">
            <div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalXlLabel">
                        Danh sách <span class="text-danger-700">{{items.length}}</span> bản ghi
                    </h5>
                    <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-toggle="modal" data-te-target="#formUpload" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="relative p-4">
                    <table v-if="isShowList" id="tableList" class="table align-middle table-bordered table-striped table-hover text-sm">
                        <thead>
                            <tr class="align-middle">
                                <td rowspan="2" class="text-center">#</td>
                                <th rowspan="2">Tên công ty</th>
                                <th rowspan="2">Tên người được bảo hiểm</th>
                                <th colspan="3" class="text-center">Năm sinh</th>
                                <th rowspan="2">Số hợp đồng</th>
                                <th rowspan="2">Hiệu lực</th>
                                <th rowspan="2">Email</th>
                            </tr>
                            <tr>
                                <th class="text-center">Ngày</th>
                                <th class="text-center">Tháng</th>
                                <th class="text-center">Năm</th>
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