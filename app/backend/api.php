<?php
include "model.db.php";
$modelDB = new ModelDB();

if (isset($_SERVER['HTTP_ORIGIN'])) {
	// Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
	// you want to allow, and if so:
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 1000');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
		// may also be using PUT, PATCH, HEAD etc
		header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
	}

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
		header("Access-Control-Allow-Headers: Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
	}
	exit(0);
}

$res = array('error' => false);

$action = '';
if (isset($_GET['action'])) {
	$action = $_GET['action'];
}

if ($action == 'getall') {

	$data = $modelDB->getall();

	if (!empty($data)) {
		$res['error'] = false;
		$res['body'] = $data;
	} else {
		$res['error'] = true;
		$res['body'] = $data;
		$res['message'] = "No Data Found!";
	}
}


if ($action == 'add') {
	if (
		isset($_POST['c_code']) &&
		isset($_POST['c_ten_cong_ty']) &&
		isset($_POST['c_name']) &&
		isset($_POST['c_nam_sinh']) &&
		isset($_POST['c_so_hop_dong']) &&
		isset($_POST['c_hieu_luc']) &&
		isset($_POST['c_email']) &&
		isset($_POST['c_temp']) &&
		isset($_POST['c_trang_thai'])
	) {

		$c_code = $_POST['c_code'];
		$c_ten_cong_ty = $_POST['c_ten_cong_ty'];
		$c_name = $_POST['c_name'];
		$c_nam_sinh = $_POST['c_nam_sinh'];
		$c_so_hop_dong = $_POST['c_so_hop_dong'];
		$c_hieu_luc = $_POST['c_hieu_luc'];
		$c_email = $_POST['c_email'];
		$c_temp = $_POST['c_temp'];
		$c_trang_thai = $_POST['c_trang_thai'];

		$result = $modelDB->add($c_code, $c_ten_cong_ty, $c_name, $c_nam_sinh, $c_so_hop_dong, $c_hieu_luc, $c_email, $c_temp, $c_trang_thai);

		if ($result === true) {
			$res['error'] = false;
			$res['message'] = "Thêm mới thành công";
		} else {
			$res['error'] = true;
			$res['message'] = "Lỗi!!!";
		}
	}
}

if ($action == 'udpate') {
	if (
		isset($_POST['pk_id']) &&
		isset($_POST['c_code']) &&
		isset($_POST['c_ten_cong_ty']) &&
		isset($_POST['c_name']) &&
		isset($_POST['c_nam_sinh']) &&
		isset($_POST['c_so_hop_dong']) &&
		isset($_POST['c_hieu_luc']) &&
		isset($_POST['c_email']) &&
		isset($_POST['c_temp']) &&
		isset($_POST['c_trang_thai'])
	) {

		$pk_id = $_POST['pk_id'];
		$c_code = $_POST['c_code'];
		$c_ten_cong_ty = $_POST['c_ten_cong_ty'];
		$c_name = $_POST['c_name'];
		$c_nam_sinh = $_POST['c_nam_sinh'];
		$c_so_hop_dong = $_POST['c_so_hop_dong'];
		$c_hieu_luc = $_POST['c_hieu_luc'];
		$c_email = $_POST['c_email'];
		$c_temp = $_POST['c_temp'];
		$c_trang_thai = $_POST['c_trang_thai'];

		$result = $modelDB->update($pk_id, $c_code, $c_ten_cong_ty, $c_name, $c_nam_sinh, $c_so_hop_dong, $c_hieu_luc, $c_email, $c_temp, $c_trang_thai);

		if ($result === true) {
			$res['error'] = false;
			$res['message'] = "Cập nhập thành công";
		} else {
			$res['error'] = true;
			$res['message'] = "Lỗi!!!";
		}
	}
}

function format_date($day, $month, $year)
{
	if (!empty($year)) {
		// Xử lý khi có năm
		if (!empty($month)) {
			// Xử lý khi có tháng
			if (!empty($day)) {
				// Xử lý khi có cả ngày
				return date('d/m/Y', strtotime($year . '-' . $month . '-' . $day));
			} else {
				// Xử lý khi chỉ có tháng và năm
				return date('m/Y', strtotime($year . '-' . $month . '-01'));
			}
		} else {
			// Xử lý khi chỉ có năm
			return $year;
		}
	} else {
		// Trả về chuỗi rỗng nếu không có năm
		return '';
	}
}

if ($action == 'updateSheet') {

	if (isset($_POST['data']) && isset($_POST['c_code']) && isset($_POST['c_temp'])) {

		$c_code = $_POST['c_code'];
		$c_temp = $_POST['c_temp'];
		$data = json_decode($_POST['data']);

		foreach ($data as $row) {
			$index = $row->index;
			$A_ten_cong_ty = $row->A_ten_cong_ty;
			$B_ten_ndbh = $row->B_ten_ndbh;
			$C_ngay = $row->C_ngay;
			$D_thang = $row->D_thang;
			$E_nam = $row->E_nam;
			$F_so_hop_dong = $row->F_so_hop_dong;
			$G_hieu_luc = $row->G_hieu_luc;
			$H_email = $row->H_email;
			$trang_thai = 1;

			$nam_sinh = format_date($C_ngay, $D_thang, $E_nam);

			// sleep(3);

			$result = $modelDB->add($c_code, $A_ten_cong_ty, $B_ten_ndbh, $nam_sinh, $F_so_hop_dong, $G_hieu_luc, $H_email, $c_temp, $trang_thai);
		}

		$res['error'] = false;
		$res['message'] = "Thêm mới thành công";
	}
}

if ($action == 'delete') {

	if (isset($_POST['id'])) {

		$id = $_POST['id'];

		$result = $modelDB->delete($id);

		if ($result === true) {
			$res['error'] = false;
			$res['message'] = "Đã xoá thành công.";
		} else {
			$res['error'] = true;
			$res['message'] = "Lỗi!!!";
		}
	}
}


if ($action == 'deleteItems') {

	if (isset($_POST['ids'])) {

		$ids = explode(",", $_POST['ids']);

		if (count($ids) > 0) {
			for ($i = 0; $i < count($ids); $i++) {
				$result = $modelDB->delete($ids[$i]);
				if ($result === false) {
					$res['error'] = true;
					$res['message'] = "Lỗi. Xoá không thành công.";
					break;
				}
			}
		}

		$res['error'] = false;
		$res['message'] = "Đã xoá thành công";
	}
}


if ($action == 'edit') {

	if (isset($_POST['id'])) {

		$id = $_POST['id'];

		$result = $modelDB->getDetail($id);

		if (!empty($result)) {
			$res['error'] = false;
			$res['body'] = $result;
		} else {
			$res['error'] = true;
			$res['message'] = "No Data Found!";
		}
	}
}


if ($action == 'search') {

	// Lấy thông tin tìm kiếm từ yêu cầu GET
	$c_code = $_GET['c_code'] ?? '';
	$c_ten_cong_ty = $_GET['c_ten_cong_ty'] ?? '';
	$c_name = $_GET['c_name'] ?? '';
	$c_trang_thai = $_GET['c_trang_thai'] ?? '';

	$data = $modelDB->search($c_code, $c_ten_cong_ty, $c_name, $c_trang_thai);

	if (!empty($data)) {
		$res['error'] = false;
		$res['body'] = $data;
	} else {
		$res['error'] = true;
		$res['message'] = "No Data Found!";
	}
}




header("Content-type: application/json");
echo json_encode($res);
die();
