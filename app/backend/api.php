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




header("Content-type: application/json");
echo json_encode($res);
die();
