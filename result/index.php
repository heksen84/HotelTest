<!----------------------------
 Dev. by Ilya Bobkov 2017 
 ----------------------------->
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>HotelTest - Results</title>
<link rel="shortcut icon" href="..//favicon.ico" type="image/x-icon">
<!-- мета теги -->
<meta name = "viewport"    content = "width=device-width, initial-scale=1.0"/>
<meta name = "description" content = "поиск отелей"/>
<meta name = "keywords"    content = "отель, поиск"/>
<meta name = "robots" 	   content = "index, follow"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
<meta http-equiv="pragma"  content="no-cache" />

<link href="../css/lib/bootstrap.min.css" rel="stylesheet">
<link href="../css/lib/sweet-alert.css"   rel="stylesheet">
<link href="../css/lib/placeholder.css"   rel="stylesheet">
<link href="../css/lib/bootstrap-datepicker3.min.css"  rel="stylesheet">
<link href="../css/lib/nprogress.css"     rel="stylesheet">
<link href="../css/common.css?<?php echo time()?>" rel="stylesheet">
<link href="../css/result.css?<?php echo time()?>"	rel="stylesheet">

<script src="../js/lib/jquery-2.2.4.min.js"></script>
<script src="../js/lib/bootstrap.min.js"></script>
<script src="../js/lib/sweet-alert.min.js"></script>
<script src="../js/lib/bootstrap-datepicker.min.js"></script>
<script src="../js/lib/bootstrap-datepicker.ru.min.js"></script>
<script src="../js/lib/nprogress.js"></script>
<script src="../js/lib/util.js?<?php echo time()?>"></script>
<script src="../js/lib/msg.js?<?php echo time()?>"></script>
<script src="../js/result.js?<?php echo time()?>"></script>
</head>
<body>
<div class="container text-center">
<div class="row text-center" id="return_row"><a href="javascript:history.back();">назад</a></div>
<div class="row">
<div id="results_city"></div>
<div id="results_period"></div>
<div id="results_guest_num">Гостей:&nbsp;</div>
<div id="results_all_offers">Всего предложений:&nbsp;</div>
</div>
<div class="row" id="table_row">
<table id="result_table">
<tr><th class="column_num" style='text-align:center'>№</th><th class="column_hotel" style='text-align:left'>Отель</th><th class="column_price" style='text-align:center'>Цена</th></tr>
</table>
</div>
</div>
</body>