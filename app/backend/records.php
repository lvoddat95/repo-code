<?php 
include "model.php";

$model = new ModelDB();

$rows = $model->getAll();

$data = array("rows" => $rows);

echo json_encode($data);
