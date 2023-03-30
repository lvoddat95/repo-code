<?php
require __DIR__ . '/vendor/autoload.php';

class ModelDB
{
    private $server = "localhost";
    private $username = "root";
    private $password = "";
    private $db = "test";
    private $tbl = "t_test";
    private $conn;

    public function __construct()
    {
        try {
            $this->conn = new PDO("mysql:host=$this->server;dbname=$this->db", $this->username, $this->password);
            // Thiết lập chế độ báo lỗi
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function getAll()
    {
        $data = [];
        $sql = "SELECT * FROM `$this->tbl` ORDER BY `pk_id` ASC";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }

    public function add($c_code, $c_ten_cong_ty, $c_name, $c_nam_sinh, $c_so_hop_dong, $c_hieu_luc, $c_email, $c_temp, $c_trang_thai)
    {
        $now = date('Y-m-d H:i:s');

        $sql = "INSERT INTO `$this->tbl` (
            `c_code`, 
            `c_ten_cong_ty`,  
            `c_name`,  
            `c_nam_sinh`,  
            `c_so_hop_dong`,  
            `c_hieu_luc`,  
            `c_email`,  
            `c_file_name`,  
            `c_file_base64`,  
            `c_temp`, 
            `c_trang_thai`,
            `c_nguoi_tao`,
            `c_ngay_tao`, 
            `c_nguoi_sua`,
            `c_ngay_sua`) 
        VALUES (
            '$c_code', 
            '$c_ten_cong_ty', 
            '$c_name', 
            '$c_nam_sinh', 
            '$c_so_hop_dong', 
            '$c_hieu_luc', 
            '$c_email', 
            '', 
            '', 
            '$c_temp', 
            '$c_trang_thai', 
            '1', 
            '$now', 
            '1', 
            '$now' )";

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
        // Ngắt kết nối tới CSDL
        $this->conn = null;
    }

    public function update($pk_id, $c_code, $c_ten_cong_ty, $c_name, $c_nam_sinh, $c_so_hop_dong, $c_hieu_luc, $c_email, $c_temp, $c_trang_thai)
    {
        $now = date('Y-m-d H:i:s');

        $fileName = createFilename($c_name) . ".pdf";

        $sql = "UPDATE `$this->tbl` 
            SET c_code = :c_code,
            c_ten_cong_ty = :c_ten_cong_ty,
            c_name = :c_name,
            c_nam_sinh = :c_nam_sinh,
            c_so_hop_dong = :c_so_hop_dong,
            c_hieu_luc = :c_hieu_luc,
            c_email = :c_email,
            c_temp = :c_temp,
            c_file_name = :c_file_name,
            c_trang_thai = :c_trang_thai,
            c_nguoi_sua = 0,
            c_ngay_sua = NOW()
        WHERE pk_id = :pk_id";

        $data = [
            ':pk_id' => $pk_id,
            ':c_code' => $c_code,
            ':c_ten_cong_ty' => $c_ten_cong_ty,
            ':c_name' => $c_name,
            ':c_nam_sinh' => $c_nam_sinh,
            ':c_so_hop_dong' => $c_so_hop_dong,
            ':c_hieu_luc' => $c_hieu_luc,
            ':c_email' => $c_email,
            ':c_temp' => $c_temp,
            ':c_file_name' => $fileName,
            ':c_trang_thai' => $c_trang_thai,
        ];


        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute($data)) {
            return true;
        } else {
            return false;
        }
        // Ngắt kết nối tới CSDL
        $this->conn = null;
    }

    public function delete($id)
    {
        try {
            $sql = "DELETE FROM `$this->tbl` WHERE `pk_id` = '$id'";

            $stmt = $this->conn->prepare($sql);

            // Bind giá trị cho tham số :pk_id
            $stmt->bindParam(':pk_id', $pk_id, PDO::PARAM_INT);

            // Thực thi câu lệnh SQL
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo "Lỗi khi xoá bản ghi: " . $e->getMessage();
        }
        // Ngắt kết nối tới CSDL
        $this->conn = null;
    }

    public function getDetail($id)
    {
        $data = [];

        $sql = "SELECT * FROM `$this->tbl` WHERE `pk_id` = '$id'";

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            $data = $stmt->fetch();
        }

        return $data;
    }

    public function search($c_code,  $c_ten_cong_ty, $c_name, $c_trang_thai)
    {
        $data = [];


        // Xây dựng câu truy vấn SQL
        $sql = 'SELECT * FROM t_test WHERE 1=1';
        $params = array();
        if ($c_code) {
            $sql .= ' AND c_code LIKE :c_code';
            $params[':c_code'] = '%' . $c_code . '%';
        }
        if ($c_ten_cong_ty) {
            $sql .= ' AND c_ten_cong_ty LIKE :c_ten_cong_ty';
            $params[':c_ten_cong_ty'] = '%' . $c_ten_cong_ty . '%';
        }
        if ($c_name) {
            $sql .= ' AND c_name LIKE :c_name';
            $params[':c_name'] = '%' . $c_name . '%';
        }
        if (strlen($c_trang_thai) > 0) {
            $sql .= ' AND c_trang_thai = :c_trang_thai';
            $params[':c_trang_thai'] = $c_trang_thai;
        }

        // Thực hiện truy vấn và trả về kết quả dưới dạng JSON
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($params);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }
}
