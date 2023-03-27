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
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap" rel="stylesheet" />



    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="assets/css/style.css">


    <script src="https://cdn.tailwindcss.com/3.2.4"></script>
    <script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                fontFamily: {
                    sans: ["Roboto", "sans-serif"],
                    body: ["Roboto", "sans-serif"],
                    mono: ["ui-monospace", "monospace"],
                },
            },
            corePlugins: {
                preflight: false,
            },
        };
    </script>

    <title>Trang DM</title>

</head>

<body>

    <!-- Modal -->
    <?php include 'backend/template/dsp_form_upload.php'; ?>
    <?php include 'backend/template/dsp_form_update.php'; ?>

    <div class="container">
        <div class="p-5">

            <h2 class="h3">Danh sách</h2>

            <div class="gap-2 d-flex justify-content-start mb-3">
                <button @click="openModalUpdate(true)" data-mdb-toggle="modal" data-mdb-target="#formUpdate" data-te-ripple-init data-te-ripple-color="light" class="inline-flex items-center rounded bg-primary px-4 pt-[6px] pb-[5px] text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                    <span class="material-symbols-outlined">
                        add
                    </span>
                    <span>Thêm mới</span>
                </button>

                <button @click="" class="d-none inline-flex items-center rounded bg-[#ffffff] border border-primary-100 py-1.5 px-3 text-sm font-medium leading-normal text-dark-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
                    <span class="material-symbols-outlined text-red-700">
                        forward_to_inbox
                    </span>
                    <span>Gửi Email</span>
                </button>

                <button @click="" class="d-none inline-flex items-center rounded bg-[#ffffff] border border-primary-100 py-1.5 px-3 text-sm font-medium leading-normal text-dark-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
                    <span class="material-symbols-outlined text-blue-700">
                        draw
                    </span>
                    <span>Kí điện tử</span>
                </button>

                <button onclick="openModalUpload()" role="button" data-te-ripple-init data-te-ripple-color="light" class="inline-flex items-center rounded bg-[#ffffff] border border-primary-100 py-1.5 px-3 text-sm font-medium leading-normal text-dark-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
                    <span class="material-icons-sharp text-green-700">
                        upload
                    </span>
                    <span>Import bảng kê</span>
                </button>

                <button onclick="deleteItems()" class="inline-flex items-center rounded bg-[#ffffff] border border-primary-100 py-1.5 px-3 text-sm font-medium leading-normal text-red-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">Xoá</button>
            </div>


            <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">

                <form id="formSearch" @submit.prevent="formSearch">
                    <div class="border-b-2 border-neutral-100 py-3 px-6 dark:border-neutral-600 dark:text-neutral-50 text-sm">
                        <div class="row">
                            <div class="col-2">
                                <div class="form-group">
                                    <label for="" class="mb-1 font-medium">Mã bảng kê</label>
                                    <input type="text" v-model="searchParams.c_code" class="form-control">
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <label for="" class="mb-1 font-medium">Tên công ty</label>
                                    <input type="text" v-model="searchParams.c_ten_cong_ty" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="form-group">
                                    <label for="" class="mb-1 font-medium">Tên người ĐBH</label>
                                    <input type="text" v-model="searchParams.c_name" placeholder="" class="form-control">
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="form-group">
                                    <label for="" class="mb-1 font-medium">Trạng thái</label>
                                    <select v-model="searchParams.c_trang_thai" class="form-select form-control">
                                        <option value="">Chọn</option>
                                        <option value="1">Hoạt động</option>
                                        <option value="0">Không hoạt động</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group">
                                    <label class="mb-1">&nbsp;</label>
                                    <div class="flex gap-2">
                                        <button type="submit" class="btn btn-primary shadow-sm flex items-center">
                                            <span>Tìm kiếm</span>
                                        </button>
                                        <button @click="resetSearch()" data-mdb-ripple-color="dark" class="btn btn-light ripple-surface-dark">
                                            <span>Xoá bộ lọc</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div id="appEl" class="p-6">

                    <div id="app">
                        <img src="https://kttt.bhhk.vn:4433/vni-re/Data/Files/The_Dien_Tu/Template/images/card11.jpg" style="position:absolute; z-index:-1; width:100%; height:100%">
                        <div style="position:absolute; top:100px; left:200px">
                            <p>Company Name: {{ companyName }}</p>
                            <p>Address: {{ address }}</p>
                            <p>Phone: {{ phone }}</p>
                        </div>
                    </div>

                    <div class="flex flex-col min-h-[250px]">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-left text-sm font-light table table-striped table-hover">
                                        <thead class="align-middle border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                            <tr>
                                                <th scope="col" class="p-2"></th>
                                                <th scope="col" class="p-2">
                                                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                                        <input v-bind:checked="isCheckedAll" v-on:change="toggleCheckedAll" class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                                    </div>
                                                </th>
                                                <th scope="col" class="p-2">Mã bảng kê</th>
                                                <th scope="col" class="p-2">Tên công ty</th>
                                                <th scope="col" class="p-2">Số hợp đồng</th>
                                                <th scope="col" class="p-2">Hiệu lực</th>
                                                <th scope="col" class="p-2">Tên người ĐBH</th>
                                                <th scope="col" class="p-2">Năm sinh</th>
                                                <th scope="col" class="p-2">Email</th>
                                                <th scope="col" class="p-2">Xem thẻ</th>
                                                <th scope="col" class="p-2">Mẫu thẻ</th>
                                                <th scope="col" class="p-2">Trạng thái</th>
                                                <th scope="col" class="p-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody class="font-normal align-middle">
                                            <tr v-for="(item, i) in paginate(items)" :key="item.pk_id" class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                <td class="p-2 font-medium">{{i+1}}</td>
                                                <td class="p-2">
                                                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                                        <input v-model="item.isChecked" v-on:change="toggleChecked" class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                                    </div>
                                                </td>
                                                <td class="p-2">{{item.c_code}}</td>
                                                <td class="p-2">{{item.c_ten_cong_ty}}</td>
                                                <td class="p-2">{{item.c_so_hop_dong}}</td>
                                                <td class="p-2">{{item.c_hieu_luc}}</td>
                                                <td class="p-2">{{item.c_name}}</td>
                                                <td class="p-2">{{item.c_nam_sinh}}</td>
                                                <td class="p-2">{{item.c_email}}</td>
                                                <td class="p-2">
                                                    <a href="" class="text-info">
                                                        <span class="material-icons-outlined">
                                                            badge
                                                        </span>
                                                    </a>
                                                </td>
                                                <td class="p-2">{{item.c_temp}}</td>
                                                <td class="p-2">{{item.c_trang_thai}}</td>
                                                <td class="p-2">
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
                                            <tr v-if="items.length === 0">
                                                <td colspan="20" class="text-center">Không tìm thấy bản ghi!</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="items.length !== 0" class="d-flex justify-content-between align-items-center text-sm">
                        <p>
                            Hiển thị {{ (currentPage - 1) * perPage + 1 }} đến {{ (currentPage - 1) * perPage + paginate(items).length }} của {{ totalItems }} mục
                        </p>
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                                <li v-bind:class="[{ disabled: currentPage == 1 }, 'page-item']">
                                    <a class="page-link" href="#" aria-label="Previous" v-on:click.prevent="updatePage(currentPage - 1)">
                                        <span class="flex items-center" aria-hidden="true"><span class="material-icons-round text-sm">arrow_back_ios</span> Trang trước</span>
                                    </a>
                                </li>

                                <li v-for="page in totalPages" v-bind:class="[{ active: currentPage == page }, 'page-item']" v-if="page <= 3 || page == currentPage - 1 || page == currentPage || page == currentPage + 1 || page >= totalPages - 2">
                                    <a class="page-link" href="#" v-on:click.prevent="updatePage(page)">{{ page }}</a>
                                </li>

                                <li v-bind:class="[{ disabled: currentPage == totalPages }, 'page-item']">
                                    <a class="page-link" href="#" aria-label="Next" v-on:click.prevent="updatePage(currentPage + 1)">
                                        <span class="flex items-center" aria-hidden="true">Trang sau <span class="material-icons-round text-sm">arrow_forward_ios</span></span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>



        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></script>
    <script src=" https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.js"></script>

    <script src="assets/js/app.js"></script>
    <script src="assets/js/script.js"></script>
</body>