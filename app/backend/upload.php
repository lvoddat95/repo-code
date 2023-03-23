<?php
require_once 'vendor/autoload.php';

if (!empty($_FILES['file']['name'])) {

	$file = $_FILES['file']['tmp_name'];
	$reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
	$reader->setReadDataOnly(true);
	$spreadsheet = $reader->load($file);

	$worksheet = $spreadsheet->getActiveSheet();
	$rows = [];
	$header = [];

	foreach ($worksheet->getRowIterator() as $row) {
		$rowData = [];

		foreach ($row->getCellIterator() as $cell) {
			$cellValue = $cell->getValue();

			if ($cell->getColumn() === 'C' && $worksheet->getMergeCells() !== null) {
				$mergedCells = $worksheet->getMergeCells();

				foreach ($mergedCells as $mergedCell) {
					if ($cell->isInRange($mergedCell)) {
						$cellValue = explode('/', $cellValue);
						$rowData['Ngay sinh'] = $cellValue[0];
						$rowData['Thang sinh'] = $cellValue[1];
						$rowData['Nam sinh'] = $cellValue[2];
						break;
					}
				}
			}

			$rowData[$worksheet->getCell($cell->getColumn() . '1')->getValue()] = $cellValue;

			$rows[] = $rowData;
		}
	}


	echo json_encode($rows);
}
