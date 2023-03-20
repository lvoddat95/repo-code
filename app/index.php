<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- khong luu cache-->
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="no-cache" />
    <meta http-equiv="Expires" content="-1">
    <meta http-equiv="Cache-Control" content="no-cache" />
    <!-- khong luu cache-->

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" integrity="sha512-pumBsjNRGGqkPzKHndZMaAG+bir374sORyzM3uulLV14lN5LyykqNk8eEeUlUkB3U0M4FApyaHraT65ihJhDpQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    <title>Trang DM</title>

</head>

<body>
    <div id="main" class="container" v-cloak>

        <div class="container">
            <div class="p-5">

                <div class="gap-2 d-flex justify-content-center">
                    <button @click="openModalUpdate(true)" type="button" class="btn btn-sm btn-primary d-flex">
                        <span class="material-symbols-outlined">
                            add
                        </span>
                        <span>Thêm mới</span>
                    </button>
                    <button @click="deleteItems()" class="btn btn-sm btn-outline-info d-flex">
                        <span class="material-symbols-outlined">
                            forward_to_inbox
                        </span>
                        <span>Gửi Email</span>
                    </button>
                    <button @click="deleteItems()" class="btn btn-sm btn-outline-info d-flex">
                        <span class="material-symbols-outlined">
                            draw
                        </span>
                        <span>Kí điện tử</span>
                    </button>
                    <button @click="deleteItems()" class="btn btn-sm btn-outline-info d-flex border-">
                        <span class="material-symbols-outlined">
                            upload
                        </span>
                        <span>Import bảng kê</span>
                    </button>
                    <button @click="deleteItems()" class="btn btn-sm btn-outline-danger d-flex">Xoá</button>
                </div>

                <!-- data-bs-backdrop="static"
                 data-bs-keyboard="false" -->

                <!-- Modal -->
                <div class="modal " id="formUpdate" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <form @submit.prevent="onSubmit" class="modal-content">
                            <div class="modal-header title-main">
                                <h5 class="modal-title text-dark text-uppercase ">{{modalTitle}}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="dismissModal"></button>
                            </div>
                            <div class="modal-body">
                                <custom-input ref="c_code" id="c_code" label="Mã bảng kê" v-model="c_code"></custom-input>
                                <custom-input ref="c_ten_cong_ty" id="c_ten_cong_ty" label="Tên công ty" v-model="c_ten_cong_ty"></custom-input>
                                <custom-input ref="c_so_hop_dong" id="c_so_hop_dong" label="Số hợp đồng" v-model="c_so_hop_dong"></custom-input>
                                <custom-input ref="c_hieu_luc" id="c_hieu_luc" label="Hiệu lực" v-model="c_hieu_luc"></custom-input>
                                <custom-input ref="c_name" id="c_name" label="Tên người được BH" v-model="c_name"></custom-input>
                                <custom-input ref="c_nam_sinh" id="c_nam_sinh" label="Năm sinh" v-model="c_nam_sinh" data-type="date"></custom-input>
                                <custom-input ref="c_email" id="c_email" label="Email" v-model="c_email" data-type="email"></custom-input>

                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label" for="c_temp">Mẫu thẻ</label>
                                    <div class="col-sm-9">
                                        <select class="form-select" name="c_temp" id="c_temp" v-model="c_temp">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label" for="c_temp">Trạng thái</label>
                                    <div class="col-sm-9">
                                        <div class="form-check form-switch col-form-label mb-0">
                                            <input class="form-check-input" checked type="checkbox" id="c_trang_thai" v-model="c_trang_thai">
                                            <label class="form-check-label" for="c_trang_thai">Hoạt động</label>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal" v-on:click="dismissModal">Đóng</button>
                                <button type="button" @click.prevent="onSubmit()" class="btn btn-primary">Cập nhập</button>
                            </div>
                        </form>
                    </div>
                </div>

                <h2>Danh sách</h2>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th><input class="form-check-input" type="checkbox" v-bind:checked="isCheckedAll" v-on:change="toggleCheckedAll"></th>

                            <th>Mã bảng kê</th>
                            <th>Tên công ty</th>
                            <th>Số hợp đồng</th>
                            <th>Hiệu lực</th>
                            <th>Tên người ĐBH</th>
                            <th>Năm sinh</th>
                            <th>Email</th>
                            <th>Xem thẻ</th>
                            <th>Mẫu thẻ</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in items" :key="item.pk_id">
                            <td>{{i+1}}</td>
                            <td><input class="form-check-input" type="checkbox" v-model="item.isChecked" v-on:change="toggleChecked"></td>

                            <td>{{item.c_code}}</td>
                            <td>{{item.c_ten_cong_ty}}</td>
                            <td>{{item.c_so_hop_dong}}</td>
                            <td>{{item.c_hieu_luc}}</td>
                            <td>{{item.c_name}}</td>
                            <td>{{item.c_nam_sinh}}</td>
                            <td>{{item.c_email}}</td>
                            <td>
                                <a href="" class="text-info">
                                    <span class="material-icons-outlined">
                                        badge
                                    </span>
                                </a>
                            </td>
                            <td>{{item.c_temp}}</td>
                            <td>{{item.c_trang_thai}}</td>
                            <td>
                                <div class="d-flex gap-2">
                                    <a href="" class="link-primary text-decoration-none d-flex" @click.prevent="Edit(item.pk_id)">
                                        <span class="material-symbols-outlined text-warning">edit</span>Sửa
                                    </a>
                                    <a href="" class="link-primary text-decoration-none d-flex" @click.prevent="Delete(item)">
                                        <span class="material-symbols-outlined text-danger">delete</span>Xoá
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>



    </div>

    <script src=" https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="assets/js/script.js"></script>
</body>