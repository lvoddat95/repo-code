<!-- Form Update-->
<div id="formUpdate" data-te-modal-init class="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" tabindex="-1" aria-labelledby="" aria-hidden="true">
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

                <custom-input ref="c_code" id="c_code" name="c_code" label="Mã bảng kê" v-model="updateParams.c_code"></custom-input>
                <custom-input ref="c_ten_cong_ty" id="c_ten_cong_ty" name="c_ten_cong_ty" label="Tên công ty" v-model="updateParams.c_ten_cong_ty"></custom-input>
                <custom-input ref="c_so_hop_dong" id="c_so_hop_dong" name="c_so_hop_dong" label="Số hợp đồng" v-model="updateParams.c_so_hop_dong"></custom-input>
                <custom-input ref="c_hieu_luc" id="c_hieu_luc" name="c_hieu_luc" label="Hiệu lực" v-model="updateParams.c_hieu_luc"></custom-input>
                <custom-input ref="c_name" id="c_name" name="c_name" label="Tên người được BH" v-model="updateParams.c_name"></custom-input>
                <custom-input ref="c_nam_sinh" id="c_nam_sinh" name="c_nam_sinh" label="Năm sinh" v-model="updateParams.c_nam_sinh" data-type="date"></custom-input>
                <custom-input ref="c_email" id="c_email" name="c_email" label="Email" v-model="updateParams.c_email" data-type="email"></custom-input>

                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label" for="c_temp">Mẫu thẻ</label>
                    <div class="col-sm-8">
                        <select ref="c_temp" name="c_temp" id="c_temp" v-model="updateParams.c_temp" class="form-select bg-gray-50 text-gray-900 border-gray-300 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label" for="c_temp">
                        Trạng thái
                    </label>
                    <div class="col-sm-8">
                        <div class="col-form-label">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input ref="c_trang_thai" id="c_trang_thai" v-model="updateParams.c_trang_thai" :checked="updateParams.c_trang_thai === 0" type="checkbox" value="" class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Hoạt động</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button type="button" class="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200" data-te-modal-dismiss data-te-ripple-init data-te-ripple-color="light">
                    Đóng
                </button>
                <button type="button" @click.prevent="onSubmitFormUpdate()" class="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]" data-te-ripple-init data-te-ripple-color="light">
                    Cập nhập
                </button>
            </div>
        </div>
    </div>
</div>
<!-- End-Form Update -->