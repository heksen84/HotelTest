// ---------------------------
// блок jquery
// ---------------------------
$(document).ready(function() {        

 InitCommon(0); StartKeyboard();
  
  /*
  ----------------------------------------------
	окно спецпредложений (without optimize)
  ----------------------------------------------*/
  function ShowOfferWindow(mode,offer_id,tr_index)
  {	  
	NProgress.start();
	
	if (mode==0) $("#modal_title").text("новое предложение"); 
	else 
	$("#modal_title").text("правка");
	$("#discount_type").empty().append("<option value='0'>Проценты</option>").append("<option value='1'>Рубли</option>");
	$("#offer_modal_wnd input").val("");
	$("#offer_modal_wnd").arcticmodal
	({
		afterOpen: function(data, el) 
		{
			StopKeyboard();

			$.ajax
			({
				url: "..//backend.php",
				data: { "func": "GetCountryList" },
				async: false,
				success: function(data) 
				{						
					var obj = jQuery.parseJSON(data);
					switch(obj.answer)
					{
						case "error": error(obj.string); break;
						case "warning": warning(obj.string); break;
						case "success": {
						$("#country_list").empty();						
						$.each(obj.string, function(i, item) {
						$("#country_list").append("<option value='"+item.id+"'>"+item.name+"</option>");
						});
					
						$( "#country_list" ).change(function() 
						{						
							$.ajax
							({
								url: "..//backend.php",
								data: { "func": "GetCityListFromCountryId", "country_id": $(this).val() },
								async: false,							
								success: function(data) 
								{						
									var obj = jQuery.parseJSON(data);
									switch(obj.answer)
									{
										case "error": error(obj.string); break;
										case "warning": warning(obj.string); break;
										case "success": 
										{										
											$("#city_list, #hotel_list").empty().append("<option value='NULL'>не указан</option>");
											$.each(obj.string, function(i, item) 
											{
												$("#city_list").append("<option value='"+item.id+"'>"+item.name+"</option>");
											});
										
											$( "#city_list" ).change(function() 
											{									
												$.ajax
												({
													url: "..//backend.php",
													data: { "func": "GetHotelListFromCityId", "city_id": $(this).val() },
													async: false,												
													success: function(data) 
													{						
														var obj = jQuery.parseJSON(data);
														switch(obj.answer)
														{
															case "error": error(obj.string); break;
															case "warning": warning(obj.string); break;
															case "success": 
															{		
																$.each(obj.string, function(i, item) 
																{
																	$("#hotel_list").append("<option value='"+item.id+"'>"+item.name+"</option>");
																});																															
																break;															
															}
														}																									
													}
												});
											});									
											break;
										}
									}
								}
							});
						});					
						break;
					}
				}
				$("#offer_name").focus();
			}
		});
		
		// -----------------------------------
		// РЕЖИМ РЕДАКТИРОВАНИЯ (ПРАВКА)
		// -----------------------------------
		if ( mode == 1 && offer_id !=null )
		{
			$.ajax
			({
				url: "..//backend.php",
				data: { 
					"func": "GetOffer",
					"offer_id": offer_id,				
				},
				async:false,
				success: function(data) 
				{	
					var obj = jQuery.parseJSON(data);
					switch(obj.answer)
					{
						case "error": error(obj.string); break;
						case "warning": warning(obj.string); break;
						case "success": 
						{
							$("#offer_name").val(obj.string[0].name);
							$("#country_list").val(obj.string[0].country_id).change();
							var city_id=obj.string[0].city_id;
							if (city_id==null) city_id="NULL";
							$("#city_list").val(city_id).change();
							var hotel_id=obj.string[0].hotel_id;
							if (hotel_id==null) hotel_id="NULL";
							$("#hotel_list").val(hotel_id).change();
							$("#discount_type").val(obj.string[0].discountType);	
							$("#discount_size").val(obj.string[0].discountValue);
							if (obj.string[0].isActive==1)
								checked=true;
							else
								checked=false;
							$("#discount_status")[0].checked = checked;
							break;
						}
					}													
				}
			});	
		}
		else 
		{
			$("#country_list").change();
		}
			NProgress.done();
		},
		afterClose: function(data, el) 
		{
			StartKeyboard();
		}
	});
	
	// -----------------------------------
	// НОВОЕ ПРЕДЛОЖЕНИЕ
	// -----------------------------------
	$( "#new_offer" ).unbind().click(function() 
	{
		if ($("#city_list").val() == "NULL") $("#hotel_list").val("NULL");
		if ( ($("#offer_name").val()=="") || ($("#discount_type").val()=="") || ($("#discount_size").val()=="")) {
			warning("заполните все поля!");
		}
		else
		if (mode==0)
		{
			$.ajax
			({
				url: "..//backend.php",
				data: 
				{ 
					"func": "NewOffer", 
					"offer_name": $("#offer_name").val(),
					"country_id": $("#country_list").val(),
					"city_id": $("#city_list").val(),
					"hotel_id": $("#hotel_list").val(),
					"discount_type": $("#discount_type").val(),
					"discount_size": $("#discount_size").val(),
					"discount_status": $("#discount_status").is(":checked")?1:0,
				},
				async: false,
				success: function(data) 
				{	
					var obj = jQuery.parseJSON(data);
					switch(obj.answer)
					{
						case "error": error(obj.string); break;
						case "warning": warning(obj.string); break;
						case "success": 
						{					
							var active="Нет";
							var color="red";
							if ($("#discount_status").is(':checked')?1:0==1)
							{
								active="Да"
								color="black";
							}		
							var discountType="%";					
							if ($("#discount_type").val()==1) discountType="&nbsp;руб.";					
							$("#special_offer_table").append("<tr data-id='"+obj.string+"'><td style='text-align:center' class='td_table_num'>"+($("#special_offer_table tr").length)+"</td><td class='info_cell'><span class='special_offer_name'>"+$("#offer_name").val()+"</span><div style='color:black;margin-left:0px;font-size:12px'>(<a class='edit_offer'>правка</a>, <a class='delete_offer'>удалить</a>)</div></td><td style='text-align:center'>"+$("#discount_size").val()+discountType+"</td><td style='text-align:center;color:"+color+"' class='active_offer_cell'>"+active+"</td></tr>");
							SetEventers();
							$.arcticmodal("close");																		
							break;
						}
					}													
				}
			});	
		}
	else
	{
		$.ajax
		({
			url: "..//backend.php",
			data: 
			{ 
				"func": "UpdateOffer",
				"offer_id": offer_id,				
				"offer_name": $("#offer_name").val(),
				"country_id": $("#country_list").val(),
				"city_id": $("#city_list").val(),
				"hotel_id": $("#hotel_list").val(),
				"discount_type": $("#discount_type").val(),
				"discount_size": $("#discount_size").val(),
				"discount_status": $("#discount_status").is(':checked')?1:0,
			},
			async: false,
			success: function(data) 
			{	
				var obj = jQuery.parseJSON(data);
				switch(obj.answer)
				{
					case "error": error(obj.string); break;
					case "warning": warning(obj.string); break;
					case "success": 
					{					
						if ($("#city_list").val() == "NULL") $("#hotel_list").val("NULL") 					
						$("#special_offer_table tr").eq(tr_index).find(".special_offer_name").text($("#offer_name").val());
						var discountType="%";
						if ($("#discount_type").val()==1)
						{							
							discountType="&nbsp;руб.";
							
						}
						$("#special_offer_table tr").eq(tr_index).find(".value_and_type_item").html($("#discount_size").val()+discountType);
						var active="Нет";
						var color="red";
						if ($("#discount_status").is(':checked')?1:0==1)
						{
							active="Да"
							color="black";
						}
						$("#special_offer_table tr").eq(tr_index).find(".active_offer_cell").css("color",color).text(active);												
						$.arcticmodal('close');																		
						break;
					}
				}													
			}
		});	
	}
	});
  }
  
  // -------------------------------------------
  // новая акция
  // -------------------------------------------
  $( "#new_offer_link" ).click(function() {
	ShowOfferWindow(0,null,null);
  });
  
   // ---------------------------------------
   // обновить таблицу
   // ---------------------------------------
    function UpdateOfferTable()
    {	
		var i = 1;
        var num_strings = $("#special_offer_table tr").length;
        $('#special_offer_table tbody tr td:first-child').each(function() {
            if (i != num_strings) $(this).html(i);
            i++;
        });       
	}
	
	// ---------------------------------------
	// установка статуса
	// ---------------------------------------
	function SetOfferActiveStatus(status, offer_id)
	{
		$.ajax
		({
			url: "..//backend.php",
			data: { "func": "SetOfferActiveStatus", "offer_status": status, "offer_id": offer_id},			
			success: function(data) 
			{					
				var obj = jQuery.parseJSON(data);
				switch(obj.answer)
				{
					case "error": error(obj.string); break;
					case "warning": warning(obj.string); break;
					case "success": 
					{							
						break;
					}
				}
			}
		});   
	}	
   // ---------------------------------------
   // обработчики таблицы
   // ---------------------------------------   
   function SetEventers()
   {
		$( "#special_offer_table a" ).click(function() 
		{						
			var tr = $(this).parent().parent().parent();
			var offer_id = tr.data("id");
			var tr_index = tr.index();
			
			switch($(this).index())
			{
				case 0: // правка
				{
					ShowOfferWindow(1,offer_id,tr_index); 
					break;
				}
				case 1: // удаление
				swal
				({	
					title: "Удалить скидку?",
					text: tr.find(".special_offer_name").text(),
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Да",
					cancelButtonText: "Нет",
					closeOnConfirm: true,
					closeOnCancel: true,
					allowEscapeKey:	true
				},
				function(isConfirm) 
				{
					if (isConfirm) 
					{
						$("#special_offer_table tr").eq(tr_index).remove();
						
						$.ajax
						({
							url: "..//backend.php",
							data: { "func": "DeleteOffer", "offer_id": offer_id},
							async:false,
							success: function(data) 
							{		
								var obj = jQuery.parseJSON(data);
								switch(obj.answer)
								{
									case "error": error(obj.string); break;
									case "warning": warning(obj.string); break;
									case "success": 
									{	
										UpdateOfferTable();
										break;
									}
								}
							}
						});				
					}
				});	
				break;
			}			
		});
		
		// ---------------------------------------------------
		// изменение статуса
		// ---------------------------------------------------
		$( ".active_offer_cell" ).unbind().click(function() 
		{
			var tr = $(this).parent();
			var offer_id = tr.data("id");
			
			if($(this).text()=="Да"){
				$(this).css("color", "red").text("Нет");
				SetOfferActiveStatus(0, offer_id);
			}
			else {
				$(this).css("color", "black").text("Да");
				SetOfferActiveStatus(1, offer_id);
			}
		});	
   }
   
   // ------------------------------
   // without optimization
   // ------------------------------
   $.ajax
	({
        url: "..//backend.php",
        data: { "func": "GetSpecialOffers" },
        success: function(data) 
	    {		
            var obj = jQuery.parseJSON(data);
  	        switch(obj.answer)
			{
				case "error": error(obj.string); break;
				case "warning": warning(obj.string); break;
				case "success": 
				{		
					$.each(obj.string, function(i, item) {
						var active="Нет";
						var color="red";
						if (item.isActive=="1"){
							active="Да"
							color="black";
						}
						var discountType="%";
						if (item.discountType==1) discountType="&nbsp;руб.";
						$("#special_offer_table").append("<tr data-id='"+item.id+"'><td style='text-align:center' class='td_table_num'>"+(i+1)+"</td><td class='info_cell'><span class='special_offer_name'>"+item.name+"</span><div style='color:black;margin-left:0px;font-size:12px'>(<a class='edit_offer'>правка</a>, <a class='delete_offer'>удалить</a>)</div></td><td style='text-align:center' class='value_and_type_item'>"+item.discountValue+""+discountType+"</td><td style='text-align:center;color:"+color+"' class='active_offer_cell'>"+active+"</td></tr>");	
					});					
					SetEventers();
					break;
				}
			}
		}
    });
});