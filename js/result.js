// ---------------------------
// jquery
// ---------------------------
$(document).ready(function() {        
   
	InitCommon(0); StartKeyboard();	
    
	$("#results_city").html("<ins><h1><b>"+localStorage.getItem("city_name")+"</b></h1></ins>");
	$("#results_guest_num").append(localStorage.getItem("guests"));
	$("#results_period").html("<h2>"+localStorage.getItem("start_period")+"-"+localStorage.getItem("end_period")+"</h2>");
	
	// --------------------------------------
	// функция добавления данных в таблицу
	// --------------------------------------
	function InsertData(data) 
	{		
		NProgress.start();
		var all_offers_count = 1; 
		var obj = jQuery.parseJSON(data);
		$.each(obj.string, function(i, item) 
		{
			// проверка на спецпредложения
			$.ajax
			({
				url: "..//backend.php",
				data: 
				{ 
				"func": "GetCountryFromCityId", 
				"city_id": item.city_id
				},
				async: false,
				success: function(data)
				{				
					var city_obj = jQuery.parseJSON(data);
					$.ajax
					({
						url: "..//backend.php",
						data: { 
						"func": "CheckOffer",
						"country_id": city_obj.string[0].country_id,					
						"hotel_id": item.id,
						"city_id": item.city_id 											
					},
					async: false,
					success: function(data)
					{	
						var str = "";
						var obj = jQuery.parseJSON(data);
						if (obj.answer=="error") error(obj.string);
						if (obj.string!=""){
							var discountType="%";
							if (obj.string[0].discountType==1) discountType="&nbsp;руб.";
							str="&#9733;&nbsp;спецпредложение&nbsp;(скидка:&nbsp;"+obj.string[0].discountValue+""+discountType+")";
						}
				
						$("#result_table").append("<tr style='background:rgb(180,180,180);color:white'><td style='text-align:center'>"+all_offers_count+"</td><td class='info_cell'><ins><b>"+item.name+"</b><span style='float:right;color:rgb(250,50,50);background:white;padding-left:10px;padding-right:10px;margin-right:10px;font-size:16px;border-radius:1px' class='special_offer_span_block'>"+str+"</span></ins></td><td style='text-align:center'><ins>от "+item.prices[0]+"&nbsp;"+item.currency+"</ins></td></tr>");					
						for(var i=0; i<(item.rooms.length); i++)
						{
							if (item.prices[i]==undefined) room_price="цена не указана";
							else 
							room_price=item.prices[i]+"&nbsp;"+item.currency;
							$("#result_table").append("<tr><td></td><td>"+item.rooms[i]+" ("+item.meal_name+")</td><td style='text-align:center'>"+room_price+"</td></tr>");	
						}
						all_offers_count++;
					}
					});			
				}			
			});
		});
		
		$("#results_all_offers").append(all_offers_count-1);
		localStorage.setItem("query_status", "завершен");
		NProgress.done(); 
	}
	
	var todayDate   = new Date();
	var storageDate = new Date(localStorage.getItem("query_begin_time"));
	var interval 	= new Date(todayDate  - storageDate);
	var minutes		= interval.getUTCMinutes();
	
	// взять данные из кэша
	if (localStorage.getItem("city_id")==localStorage.getItem("query_last_city_id") && minutes == 0 ) // хранить запрос 1 минуту
	{
		InsertData(localStorage.getItem("query_last_data"));
	}
	else 
	{	
		var now = new Date();		
		localStorage.setItem("query_status", "устарел");		
		localStorage.setItem("query_begin_time", now);
		localStorage.setItem("query_status", "новый");
		
		$.ajax // иначе взять с сервера
		({
			url: "..//backend.php",
			data: 
			{ 
				"func": "GetResults", 
				"city_id": localStorage.getItem("city_id"), 
				"start_period": localStorage.getItem("start_period"),
				"end_period": localStorage.getItem("end_period"),
				"guests": localStorage.getItem("guests"),
			},
			success: function(data)
			{		
				var obj = jQuery.parseJSON(data);
				switch(obj.answer)
				{
					case "error":
					{
						localStorage.setItem("query_status", "ошибка");
						error(obj.string); 
						break;
					}
					case "warning": warning(obj.string); break;
					case "success": 
					{	
						console.log(data);
						localStorage.setItem("query_last_city_id", localStorage.getItem("city_id"));
						localStorage.setItem("query_last_data", data);					
						InsertData(data);
					}
				}
			}
		});
	}
});