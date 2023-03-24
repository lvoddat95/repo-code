<!-- Form Update-->

<div id="formUpdate" class="modal top fade" tabindex="-1" aria-labelledby="" aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{formTitle}}</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <custom-input ref="c_code" id="c_code" name="c_code" label="Mã bảng kê" v-model="updateParams.c_code"></custom-input>
                <custom-input ref="c_ten_cong_ty" id="c_ten_cong_ty" name="c_ten_cong_ty" label="Tên công ty" v-model="updateParams.c_ten_cong_ty"></custom-input>
                <custom-input ref="c_so_hop_dong" id="c_so_hop_dong" name="c_so_hop_dong" label="Số hợp đồng" v-model="updateParams.c_so_hop_dong"></custom-input>
                <custom-input ref="c_hieu_luc" id="c_hieu_luc" name="c_hieu_luc" label="Hiệu lực" v-model="updateParams.c_hieu_luc"></custom-input>
                <custom-input ref="c_name" id="c_name" name="c_name" label="Tên người ĐBH" v-model="updateParams.c_name"></custom-input>
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
                    <label class="col-sm-4 col-form-label" for="c_trang_thai">
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
            <div class="modal-footer">
                <button type="button" data-mdb-dismiss="modal" aria-label="Close" class="btn btn-light ripple-surface-dark" data-mdb-ripple-color="dark">
                    Đóng
                </button>
                <button type="button" type="button" @click.prevent="onSubmitFormUpdate()" class="btn btn-primary me-1">
                    Cập nhập
                </button>
            </div>
        </div>
    </div>
</div>

<!-- End-Form Update -->