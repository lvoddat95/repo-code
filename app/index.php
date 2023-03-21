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

    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" integrity="sha512-pumBsjNRGGqkPzKHndZMaAG+bir374sORyzM3uulLV14lN5LyykqNk8eEeUlUkB3U0M4FApyaHraT65ihJhDpQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css" rel="stylesheet" />

    <title>Trang DM</title>

</head>

<body>

    <!-- Modal Upload-->
    <div class="modal " id="formUpload" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <form @submit.prevent="" class="modal-content" novalidate>
                <div class="modal-header ">
                    <h5 class="modal-title text-xl font-semibold text-gray-900">Import bảng kê Excel</h5>
                    <button class="btn-close text-sm text-gray-900" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="row mb-3">
                        <label for="c_code" class="col-sm-4 col-form-label">
                            Mã bảng kê <span class="text-danger">*</span>
                        </label>
                        <div class="col-sm-8">
                            <input id="c_code" v-model="c_code" required="required" type="text" class="form-control bg-gray-50 text-gray-900 border-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-4 col-form-label" for="c_temp">Chọn mẫu thẻ</label>
                        <div class="col-sm-8">
                            <select class="form-select bg-gray-50 text-gray-900 border-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2" name="c_temp" id="c_temp" v-model="c_temp">
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
                            <input ref="fileInput" @change="handleFileUpload" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" accept=".xlsx, .xls">
                            <p class="mt-1 text-sm text-gray-500" id="file_input_help">Vui lòng chọn file định dạng theo mẫu Excel</p>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <td>{{ item.name }}</td>
                                <td>{{ item.age }}</td>
                                <td>{{ item.email }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="modal-footer bg-gray-50">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" @click.prevent="onUpload()" class="flex items-center btn text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium">Cập nhập</button>
                </div>
            </form>
        </div>
    </div>

    <div id="main" class="container">

        <div class="container">
            <div class="p-5">

                <div class="gap-2 d-flex justify-content-center">
                    <button @click="openModalUpdate(true)" class="flex items-center py-1.5 px-3 rounded-md text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium">
                        <span class="material-symbols-outlined">
                            add
                        </span>
                        <span>Thêm mới</span>
                    </button>

                    <button @click="" class="flex items-center py-1.5 px-3 rounded-md text-sm font-semibold text-gray-900 border-solid border-1 border-gray-300 hover:bg-gray-50">
                        <span class="material-symbols-outlined text-red-700">
                            forward_to_inbox
                        </span>
                        <span>Gửi Email</span>
                    </button>

                    <button @click="" class="flex items-center py-1.5 px-3 rounded-md text-sm font-semibold text-gray-900 border-solid border-1 border-gray-300 hover:bg-gray-50">
                        <span class="material-symbols-outlined text-blue-700">
                            draw
                        </span>
                        <span>Kí điện tử</span>
                    </button>

                    <button @click="" data-bs-toggle="modal" data-bs-target="#formUpload" class="flex items-center py-1.5 px-3 rounded-md text-sm font-semibold text-gray-900 border-solid border-1 border-gray-300 hover:bg-gray-50">
                        <span class="material-icons-sharp text-green-700">
                            upload
                        </span>
                        <span>Import bảng kê</span>
                    </button>

                    <button @click="deleteItems()" class="flex items-center py-1.5 px-3 rounded-md  text-sm font-semibold text-red-700 border-solid border-1 border-red-700 hover:bg-gray-50 hover:text-red-700">Xoá</button>
                </div>

                <!-- Modal Update-->
                <div class="modal " id="formUpdate" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <form @submit.prevent="onSubmit" class="modal-content" novalidate>
                            <div class="modal-header ">
                                <h5 class="modal-title text-xl font-semibold text-gray-900">{{modalTitle}}</h5>
                                <button class="btn-close text-sm text-gray-900" data-bs-dismiss="modal" aria-label="Close" v-on:click="dismissModal"></button>
                            </div>
                            <div class="modal-body">
                                <custom-input ref="c_code" id="c_code" name="c_code" label="Mã bảng kê" v-model="c_code"></custom-input>
                                <custom-input ref="c_ten_cong_ty" id="c_ten_cong_ty" name="c_ten_cong_ty" label="Tên công ty" v-model="c_ten_cong_ty"></custom-input>
                                <custom-input ref="c_so_hop_dong" id="c_so_hop_dong" name="c_so_hop_dong" label="Số hợp đồng" v-model="c_so_hop_dong"></custom-input>
                                <custom-input ref="c_hieu_luc" id="c_hieu_luc" name="c_hieu_luc" label="Hiệu lực" v-model="c_hieu_luc"></custom-input>
                                <custom-input ref="c_name" id="c_name" name="c_name" label="Tên người được BH" v-model="c_name"></custom-input>
                                <custom-input ref="c_nam_sinh" id="c_nam_sinh" name="c_nam_sinh" label="Năm sinh" v-model="c_nam_sinh" data-type="date"></custom-input>
                                <custom-input ref="c_email" id="c_email" name="c_email" label="Email" v-model="c_email" data-type="email"></custom-input>

                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label" for="c_temp">Mẫu thẻ</label>
                                    <div class="col-sm-9">
                                        <select class="form-select bg-gray-50 text-gray-900 border-gray-300 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2" name="c_temp" id="c_temp" v-model="c_temp">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <label class="col-sm-3 col-form-label" for="c_temp">
                                        Trạng thái
                                    </label>
                                    <div class="col-sm-9">
                                        <!-- <div class="form-check form-switch col-form-label mb-0">
                                            <input class="form-check-input" checked type="checkbox" id="c_trang_thai" v-model="c_trang_thai">
                                            <label class="form-check-label" for="c_trang_thai">Hoạt động</label>
                                        </div> -->
                                        <div class="col-form-label">
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" class="sr-only peer" id="c_trang_thai" v-model="c_trang_thai" :checked="c_trang_thai === 0">
                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Hoạt động</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div class="modal-footer bg-gray-50">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal" v-on:click="dismissModal">Đóng</button>
                                <button type="button" @click.prevent="onSubmit()" class="flex items-center btn text-sm text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium">Cập nhập</button>
                            </div>
                        </form>
                    </div>
                </div>


                <h2 class="text-2xl font-bold leading-7 text-gray-900 mb-3">Danh sách</h2>
                <div class="" style="min-height: 250px;">
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
                            <tr v-for="(item, i) in paginate(items)" :key="item.pk_id">
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
                <div class="d-flex justify-content-between align-items-center">
                    <p>
                        Hiển thị {{ (currentPage - 1) * perPage + 1 }} đến {{ (currentPage - 1) * perPage + paginate(items).length }} của {{ totalItems }} mục
                    </p>
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li v-bind:class="[{ disabled: currentPage == 1 }, 'page-item']">
                                <a class="page-link" href="#" aria-label="Previous" v-on:click.prevent="updatePage(currentPage - 1)">
                                    <span aria-hidden="true"><span class="material-icons-round text-xs">arrow_back_ios</span> Trang trước</span>
                                </a>
                            </li>
                            <li v-for="page in totalPages" v-bind:class="[{ active: currentPage == page }, 'page-item']">
                                <a class="page-link" href="#" v-on:click.prevent="updatePage(page)">{{ page }}</a>
                            </li>
                            <li v-bind:class="[{ disabled: currentPage == totalPages }, 'page-item']">
                                <a class="page-link" href="#" aria-label="Next" v-on:click.prevent="updatePage(currentPage + 1)">
                                    <span aria-hidden="true">Trang sau <span class="material-icons-round text-xs">arrow_forward_ios</span></span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>
        </div>



    </div>

    <script src=" https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="assets/js/script.js"></script>
</body>