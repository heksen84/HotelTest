<!----------------------------
 Dev. by Ilya Bobkov 2017 
 ----------------------------->
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>HotelTest</title>
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

<link href="../css/lib/bootstrap.min.css" 				 rel="stylesheet">
<link href="../css/lib/sweet-alert.css"   				 rel="stylesheet">
<link href="../css/lib/placeholder.css"   				 rel="stylesheet">
<link href="../css/lib/nprogress.css"     				 rel="stylesheet">
<link href="../css/lib/jquery.arcticmodal-0.3.css" 		 rel="stylesheet">
<link href="../css/lib/themes/simple.css"				 rel="stylesheet">
<link href="../css/common.css?<?php echo time()?>" 		 rel="stylesheet">
<link href="../css/specialoffer.css?<?php echo time()?>" rel="stylesheet">

<script src="../js/lib/jquery-2.2.4.min.js"></script>
<script src="../js/lib/bootstrap.min.js"></script>
<script src="../js/lib/sweet-alert.min.js"></script>
<script src="../js/lib/nprogress.js"></script>
<script src="../js/lib/jquery.arcticmodal-0.3.min.js"></script>
<script src="../js/lib/util.js?<?php echo time()?>"></script>
<script src="../js/lib/msg.js?<?php echo time()?>"></script>
<script src="../js/specialoffer.js?<?php echo time()?>"></script>
</head>
<body>
<div style="display: none;">
    <div class="box-modal" id="offer_modal_wnd">
    <div class="box-modal_close arcticmodal-close">X</div>
	<div style="text-align:center">
	<h1 id="modal_title"></h1>
    Название предложения:<input type="text" id="offer_name"></input>
	<br>Страна:<select id="country_list"></select>
	Город:<select id="city_list"></select>
	<br>Отель:<select id="hotel_list"></select>
	<br>Тип скидки:
	<select id="discount_type">
	</select>    
	<br>Размер скидки:<input type="text" id="discount_size"></input>
	<br>Активно:<input type="checkbox" id="discount_status" checked>
	<br><button class="btn btn-success" id="new_offer">сохранить</button>
	</div>
	</div>
</div>
<div class="container text-center">
	<div class="row text-center" id="return_row"><a href="javascript:history.back();">назад</a></div>
	<div class="col-md-12" id="title_column"><h1 id="special_offer_title"><b>Специальные предложения</b></h1></div>
	<button class="btn btn-success" id="new_offer_link">новое предложение</button>
	<div class="row" id="table_column">
	<table id="special_offer_table">
	<tr><th class="column_num" style='text-align:center'>№</th><th class="column_offer_name" style='text-align:left'>Название скидки</th><th class="column_discount" style='text-align:center'>Скидка</th><th class="column_offer_is_active" style='text-align:center'>Активно</th></tr>
	</table>
	</div>
</div>
</body>