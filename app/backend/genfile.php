<?php
require __DIR__ . '/vendor/autoload.php';

// get data from client
$companyName = 123;
$firstName = 456;
$lastName = 759;
$email = "xxx";

// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator('Your Name');
$pdf->SetAuthor('Your Name');
$pdf->SetTitle('Test PDF Document');
$pdf->SetSubject('Test PDF Document');

// add a page
$pdf->AddPage();

// load image
$imagePath = 'https://kttt.bhhk.vn:4433/vni-re/Data/Files/The_Dien_Tu/Template/images/card11.jpg';
$image = new Imagick($imagePath);

// set font
$pdf->SetFont('helvetica', '', 14);

// set color
$pdf->SetTextColor(255, 255, 255);

// set position
$x = 40;
$y = 90;

// output CompanyName
$pdf->SetXY($x, $y);
$pdf->Write(0, $companyName);

// set position
$x = 40;
$y = 115;

// output FirstName and LastName
$pdf->SetXY($x, $y);
$pdf->Write(0, $firstName . ' ' . $lastName);

// set position
$x = 40;
$y = 140;

// output Email
$pdf->SetXY($x, $y);
$pdf->Write(0, $email);

// output image
$pdf->Image('@'.$image, 0, 0, $pdf->getPageWidth(), $pdf->getPageHeight());

// output PDF to file
$pdf->Output('test.pdf', 'F');
