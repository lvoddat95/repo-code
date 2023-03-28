<?php
require __DIR__ . '/vendor/autoload.php';

include "model.db.php";

// Nhận dữ liệu từ client
// $ten_cong_ty = $_POST['companyName'];
// $ten_ndbh = $_POST['firstName'];
// $ngay_sinh = $_POST['lastName'];
// $so_hop_dong = $_POST['so_hop_dong'];

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
$pdf->Cell(0, 0, 'Công THHH Một Thành Viên', 0, 1, 'L', false, '', 0, false, 'T', 'C'); // Thêm nội dung

$pdf->SetXY(255, 287);
$pdf->Cell(0, 0, 'Nguyễn Văn A', 0, 1, 'L', false, '', 0, false, 'T', 'C');

$pdf->SetXY(255, 333);
$pdf->Cell(0, 0, '1990', 0, 1, 'L', false, '', 0, false, 'T', 'C');

$pdf->SetXY(255, 378);
$pdf->Cell(0, 0, '123456', 0, 1, 'L', false, '', 0, false, 'T', 'C');

$pdf->SetXY(255, 422);
$pdf->Cell(0, 0, '01/01/2022 - 31/12/2022', 0, 1, 'L', false, '', 0, false, 'T', 'C');

// Chèn hình ảnh
$pdf->Image('C:\xampp\htdocs\repo-code\app\assets\img\card12.jpg', 100, 600, 600, 378, '', '', 'center', false, 300, '', false, false, 0);


// Xuất file PDF
$pdfData = $pdf->Output('', 'S');

$pdfBase64 = base64_encode($pdfData);

$response = json_decode(api_sign_pdf($pdfBase64));

$Data = $response->Data;
$Code = $response->ResponseCode;

// if ($Code != '000') {
//     echo ('Lỗi API kí điện tử đối tượng. ' . 'ResponseCode: ' . $Code);
//     die;
// }

// Lưu kết quả ký vào một tệp tin mới
$signedPdfData = base64_decode($Data);

// file_put_contents('C:/xampp/htdocs/repo-code/app/output/test.pdf', $signedPdfData);

// output PDF document
// $pdf->Output('C:\xampp\htdocs\repo-code\app\test4.pdf', 'D');
