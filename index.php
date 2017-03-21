<!----------------------------
 Ilya Bobkov 03-2017 
 ----------------------------->
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>HotelTest</title>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
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
<!-- styles -->
<link href="css/lib/bootstrap.min.css" 				rel="stylesheet">
<link href="css/lib/sweet-alert.css"   				rel="stylesheet">
<link href="css/lib/placeholder.css"   				rel="stylesheet">
<link href="css/lib/bootstrap-datepicker3.min.css"  rel="stylesheet">
<link href="css/common.css?<?php echo time()?>" 	rel="stylesheet">
<link href="css/index.css?<?php echo time()?>"		rel="stylesheet">
<!-- libs -->
<script src="js/lib/jquery-2.2.4.min.js"></script>
<script src="js/lib/bootstrap.min.js"></script>
<script src="js/lib/sweet-alert.min.js"></script>
<script src="js/lib/bootstrap-datepicker.min.js"></script>
<script src="js/lib/bootstrap-datepicker.ru.min.js"></script>
<script src="js/lib/util.js?<?php echo time()?>"></script>
<script src="js/lib/msg.js?<?php echo time()?>"></script>
<script src="js/index.js?<?php echo time()?>"></script>
</head>
<body>      
    <div class="container-fluid text-center">
	<div class="row" id="main_row">
	<div class="col-md-12 text-center" id="col_special_offer_link"><a href="specialoffer">cпециальные предложения</a></div>
    <div class="col-md-12" id="title_column"><h1 id="title"><b>Поиск отелей</b></h1></div>
    <div class="col-md-12" id="seacrh_filter_block">
	<hr class="short_line">
	<div class="form-group">
	<label for="city">Выберите город:</label>
	<select id="city"></select>
	<label for="date1">Дата заезда:</label>
	<input type="text" id="date1" class="date_input"></input>
	<label for="data2">Дата выезда:</label>
	<input type="text" id="date2" class="date_input"></input>
	<label for="guests_num">Гостей:</label>
	<select id="guests_num">
	<option>1</option>
	<option>2</option>
	<option>3</option>
	</select>
	</div>
	<hr class="small_line">	
    </div>		
    <div class="col-md-12"><button type="button" class="btn btn-primary" id="button_search">искать</button></div> 
    </div>   
  </body>
</html>