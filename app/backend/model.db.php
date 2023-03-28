<?php
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

        $sql = "UPDATE `$this->tbl` 
            SET c_code = :c_code,
            c_ten_cong_ty = :c_ten_cong_ty,
            c_name = :c_name,
            c_nam_sinh = :c_nam_sinh,
            c_so_hop_dong = :c_so_hop_dong,
            c_hieu_luc = :c_hieu_luc,
            c_email = :c_email,
            c_temp = :c_temp,
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
        if ($c_trang_thai) {
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


function api_sign_pdf($pdfBase64)
{
    $data = array(
        "contentBase64" => $pdfBase64,
        "AppCode" => API_APPCODE,
        "Password" => API_PASSWORD,
        "ChungThuSo" => API_CHUNGTHUSO,
    );
    $options = array(
        'http' => array(
            'header' => "Content-Type: application/json\r\n",
            'method' => "POST",
            'content' => json_encode($data)
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents(API_URL, false, $context);
    return $result;
}

function createFilename($name)
{
    $name = preg_replace('/\s+/', '', $name); // Thay thế khoảng trắng bằng dấu gạch dưới
    $name = convert_vi_to_en($name); // Loại bỏ dấutiếng Việt
    $name = preg_replace('/[^a-zA-Z0-9_]+/', '', $name); // Loại bỏ ký tự không hợp lệ
    $name = strtolower($name); // Chuyển tên file thành chữ thường

    $count = 1;
    $filename = $name;

    while (file_exists($filename)) {
        $filename = $name . '_' . $count;
        $count++;
    }

    // Lấy ngày tháng hiện tại
    $day = date('d');
    $month = date('m');
    $year = date('Y');
    // return $filename . '_' . $day . $month . $year . '_' . uniqid();
    return $filename . '_' . $day . $month . $year;
}

function convert_vi_to_en($str)
{
    if (!preg_match('/[\x80-\xff]/', $str)) {
        return $str;
    }
    $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", "a", $str);
    $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", "e", $str);
    $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", "i", $str);
    $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", "o", $str);
    $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", "u", $str);
    $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", "y", $str);
    $str = preg_replace("/(đ)/", "d", $str);
    $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", "A", $str);
    $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", "E", $str);
    $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", "I", $str);
    $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", "O", $str);
    $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", "U", $str);
    $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", "Y", $str);
    $str = preg_replace("/(Đ)/", "D", $str);
    //$str = str_replace(" ", "-", str_replace("&*#39;","",$str));
    return $str;
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

define('API_APPCODE', 'app1');
define('API_PASSWORD', 'aBc@1234569');
define('API_CHUNGTHUSO', '54010ac8bf864a15a659f3eda6d89fdd');
define('API_URL', "https://api.bhhk.com.vn/ApiEbhhk/SignPdfBase64NoCheck");


function gen_file_pdf(array $data)
{
    // Khởi tạo đối tượng TCPDF
    $pdf = new TCPDF('V', 'px', array(800, 1200), true, 'UTF-8', false);

    $Roboto = TCPDF_FONTS::addTTFfont('C:\xampp\htdocs\repo-code\app\assets\fonts\Roboto\Roboto-Regular.ttf', 'TrueTypeUnicode', '', 32);
    $RobotoMedium = TCPDF_FONTS::addTTFfont('C:\xampp\htdocs\repo-code\app\assets\fonts\Roboto\Roboto-Medium.ttf', 'TrueTypeUnicode', '', 32);
    $RobotoBold = TCPDF_FONTS::addTTFfont('C:\xampp\htdocs\repo-code\app\assets\fonts\Roboto\Roboto-Bold.ttf', 'TrueTypeUnicode', '', 32);

    // Đặt font chữ
    $pdf->SetFont($RobotoMedium, 'B', 16);

    // set document information
    $pdf->SetCreator("VNICare");
    $pdf->SetAuthor('Datlv');
    $pdf->SetTitle('Thẻ bảo lãnh điện tử');
    $pdf->SetSubject('Thẻ bảo lãnh điện tử VNI Care');
    $pdf->SetKeywords('VNI, VNI Care, Thẻ bảo lãnh, Điện tử, Bảo hiểm hàng không VNI');

    // Thêm trang
    $pdf->AddPage();

    // Giảm chất lượng ảnh
    $pdf->setImageScale(0.5);

    // remove default header/footer
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);


    // set some text to print
    $txt = <<<EOD

Thẻ bảo lãnh điện tử VNICare

EOD;

    // print a block of text using Write()
    $pdf->Write(0, $txt, '', 0, 'C', true, 0, false, false, 0);

    // Chèn hình ảnh
    $pdf->Image('C:\xampp\htdocs\repo-code\app\assets\img\card11.jpg', 100, 100, 600, 378, '', '', 'center', false, 300, '', false, false, 0);

    // Thêm nội dung văn bản
    $pdf->SetTextColor(255, 255, 255); // Đặt màu chữ là màu trắng
    $pdf->SetXY(255, 243); // Đặt tọa độ nội dung
    $pdf->Cell(0, 0, $data['c_ten_cong_ty'], 0, 1, 'L', false, '', 0, false, 'T', 'C'); // Thêm nội dung

    $pdf->SetXY(255, 287);
    $pdf->Cell(0, 0, $data['c_name'], 0, 1, 'L', false, '', 0, false, 'T', 'C');

    $pdf->SetXY(255, 333);
    $pdf->Cell(0, 0, $data['c_nam_sinh'], 0, 1, 'L', false, '', 0, false, 'T', 'C');

    $pdf->SetXY(255, 378);
    $pdf->Cell(0, 0, $data['c_so_hop_dong'], 0, 1, 'L', false, '', 0, false, 'T', 'C');

    $pdf->SetXY(255, 422);
    $pdf->Cell(0, 0, $data['c_hieu_luc'], 0, 1, 'L', false, '', 0, false, 'T', 'C');

    // Chèn hình ảnh
    $pdf->Image('C:\xampp\htdocs\repo-code\app\assets\img\card12.jpg', 100, 600, 600, 378, '', '', 'center', false, 300, '', false, false, 0);

    // Xuất file PDF
    $pdfData = $pdf->Output('', 'S');

    $pdfBase64 = base64_encode($pdfData);

    // Kí điện t
    $response = json_decode(api_sign_pdf($pdfBase64));

    $Data = $response->Data;
    $Code = $response->ResponseCode;

    // if ($Code != '000') {
    //     echo ('Lỗi API kí điện tử đối tượng. ' . 'ResponseCode: ' . $Code);
    //     die;
    // }

    // Lưu kết quả ký vào một tệp tin mới
    $signedPdfData = base64_decode($Data);
    $fileName = createFilename($data['c_name']);
    file_put_contents('C:/xampp/htdocs/repo-code/app/output/'.$fileName.'.pdf', $signedPdfData);
    // return $signedPdfData;
}
