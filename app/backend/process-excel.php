<?php
require_once 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$inputFileName = $_FILES['file']['tmp_name'];

$reader = IOFactory::createReaderForFile($inputFileName);
$spreadsheet = $reader->load($inputFileName);

$data = [];

foreach ($spreadsheet->getWorksheetIterator() as $worksheet) {
    foreach ($worksheet->getRowIterator() as $row) {
        $rowData = [];
        foreach ($row->getCellIterator() as $cell) {
            $rowData[] = $cell->getValue();
            var_dump($rowData);
        }
        $data[] = $rowData;
    }
}

header('Content-Type: application/json');
echo json_encode($data);