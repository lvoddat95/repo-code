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
                <custom-input v-format-date ref="c_nam_sinh" id="c_nam_sinh" name="c_nam_sinh" label="Năm sinh" v-model="updateParams.c_nam_sinh" data-type="date"></custom-input>
                <custom-input ref="c_email" id="c_email" name="c_email" label="Email" v-model="updateParams.c_email" data-type="email"></custom-input>

                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label" for="c_temp">Mẫu thẻ</label>
                    <div class="col-sm-8">
                        <select ref="c_temp" name="c_temp" id="c_temp" v-model="updateParams.c_temp" class="form-select form-control">
                            <option value="">Chọn</option>
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
                    <label class="col-sm-4 col-form-label" for="c_trang_thai">
                        Trạng thái
                    </label>
                    <div class="col-sm-8">
                        <div class="col-form-label">
                            <div class="form-check form-switch">
                                <input class="form-check-input" ref="c_trang_thai" id="c_trang_thai" v-model="updateParams.c_trang_thai" :checked="updateParams.c_trang_thai === 0" type="checkbox" role="switch" />
                                <label class="form-check-label" for="c_trang_thai">Hoạt động</label>
                            </div>
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