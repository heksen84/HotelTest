// ---------------------------
// html готов
// ---------------------------
$(document).ready(function() { 
 
	InitCommon(1000); StartKeyboard();
	
    $("#date1, #date2").datepicker({autoclose:true, language: 'ru' }).datepicker('update', new Date());
	
    /*
	--------------------------
	 получить список городов 
	--------------------------
	*/
	$.ajax
	({
        url: "backend.php",
        data: { "func": "GetCityList" },			
        success: function(data) 
	    {						
            var obj = jQuery.parseJSON(data);
  	        switch(obj.answer)
			{
				case "error": error(obj.string); break;
				case "warning": warning(obj.string); break;
				case "success": {		
					$.each(obj.string, function(i, item) {
						$("#city").append("<option value='"+item.id+"'>"+item.name+"</option>");
					});					
					break;
				}
			}
		}
    });
		
	/*
	--------------------------
	 кнопка поиска
	--------------------------
	*/
	$( "#button_search" ).click(function() 
	{	
		localStorage.setItem("city_id", $("#city").val());
		localStorage.setItem("city_name", $("#city option:selected").text());
		localStorage.setItem("start_period", $("#date1").val());
		localStorage.setItem("end_period", $("#date2").val());
		localStorage.setItem("guests", $("#guests_num").val());
		
		$(location).attr("href", "result")
	});
});