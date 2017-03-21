<?php 
/* 
----------------------------------------- 
 The Server Part of the task for UTSGROUP 
 from Ilya Bobkov 2017
------------------------------------------ */
include "php/class.msg.php";
include "php/class.pdo.php";
include "php/class.mysqli.php";

/* --- [ THE ROUTER ] --- */
if (isset($_GET["func"])) {
 
 $db = DataBase::getDB();
 
 switch($_GET["func"])
 {
	 
	case "GetCountryList":{
		$table = $db->select("SELECT * FROM Country ORDER BY name");
		msg::success($table);	 
     break;
	}
	
	case "GetCityList":{
		$table = $db->select("SELECT * FROM City ORDER BY name");
		msg::success($table);	 
     break;
  }
  
   case "GetCountryFromCityId":{
	    if (!isset($_GET["city_id"])) msg::error("variable not found!");
		$table = $db->select("SELECT country_id FROM city WHERE id=".$_GET["city_id"]);
		msg::success($table);	 
     break;
  }
  
  case "GetCityListFromCountryId":{
	    if (!isset($_GET["country_id"])) msg::error("variable not found!");
		$table = $db->select("SELECT * FROM City WHERE country_id='".$_GET["country_id"]."' ORDER BY name");
		msg::success($table);	 
     break;
  }
  
  case "GetHotelList":{
		$table = $db->select("SELECT * FROM Hotel ORDER BY name");
		msg::success($table);	 
     break;
  }
  
   case "GetHotelListFromCityId":{
	    if (!isset($_GET["city_id"])) msg::error("variable not found!");
		$table = $db->select("SELECT * FROM Hotel WHERE city_id='".$_GET["city_id"]."' ORDER BY name");
		msg::success($table);	 
     break;
  }
  
  case "GetSpecialOffers":{
		$table = $db->select("SELECT * FROM special_offer");
		msg::success($table);	 
     break;
  }
  
   case "DeleteOffer":{
	    if (!isset($_GET["offer_id"])) msg::error("variable not found!");
		$table = $db->query("DELETE FROM special_offer WHERE id=".$_GET["offer_id"]);
		msg::success($table);	 
     break;
  }
  
    case "SetOfferActiveStatus":{
	   if (!isset($_GET["offer_id"]) || !isset($_GET["offer_status"])) msg::error("variable not found!");
	   $table = $db->query("UPDATE special_offer SET isActive='".$_GET["offer_status"]."' WHERE id=".$_GET["offer_id"]);
	   msg::success($table);	 
     break;
	}
  
	case "NewOffer":{
	    if 	((!isset($_GET["offer_name"])) 	  ||
			(!isset($_GET["country_id"]))	  ||
			(!isset($_GET["city_id"]))		  ||
			(!isset($_GET["hotel_id"]))	  	  ||
			(!isset($_GET["discount_type"]))  || 
			(!isset($_GET["discount_size"]))  ||
			(!isset($_GET["discount_status"])))
			msg::error("variable not found!");
			$table = $db->query("INSERT INTO special_offer VALUES ( NULL,".$_GET["hotel_id"].",".$_GET["city_id"].",'".$_GET["country_id"]."','".$_GET["offer_name"]."','".$_GET["discount_status"]."','".$_GET["discount_type"]."','".$_GET["discount_size"]."')");
			msg::success($table);	 
     break;
  }
  
  	case "UpdateOffer":{
	    if 	(
			 (!isset($_GET["offer_id"])) 	  ||
			 (!isset($_GET["offer_name"])) 	  ||
			 (!isset($_GET["country_id"]))	  ||
			 (!isset($_GET["city_id"]))		  ||
			 (!isset($_GET["hotel_id"]))	  ||
			 (!isset($_GET["discount_type"])) || 
			 (!isset($_GET["discount_size"])) ||
			 (!isset($_GET["discount_status"]))
			)
			 msg::error("variable not found!");
		     $table = $db->query
			 ( 
				"UPDATE special_offer SET 
				hotel_id=".$_GET["hotel_id"].", 
				city_id=".$_GET["city_id"].", 
				country_id=".$_GET["country_id"].", 
				name='".$_GET["offer_name"]."', 
				isActive='".$_GET["discount_status"]."', 
				discountType='".$_GET["discount_type"]."', 
				discountValue='".$_GET["discount_size"]."' 
				WHERE id=".$_GET["offer_id"]
			  ); msg::success($table);	 
     break;
	}
	
	case "GetOffer":{
	    if (!isset($_GET["offer_id"])) msg::error("variable not found!");
		$table = $db->select("SELECT * FROM special_offer WHERE id=".$_GET["offer_id"]);
		msg::success($table);	 
	}
	
	case "CheckOffer":{
	    if (!isset($_GET["country_id"]) || !isset($_GET["city_id"]) || !isset($_GET["hotel_id"])) msg::error("variable not found!");
		
		// отель
		$table1 = $db->select("SELECT discountType, discountValue FROM special_offer WHERE country_id='".$_GET["country_id"]."' && hotel_id='".$_GET["hotel_id"]."' && isActive!=0 ORDER BY discountValue, hotel_id, city_id, country_id");		
		if (!$table1)
		{			
			// город
			$table2 = $db->select("SELECT discountType, discountValue FROM special_offer WHERE country_id='".$_GET["country_id"]."' && hotel_id IS NULL  && city_id='".$_GET["city_id"]."' && isActive!=0 ORDER BY discountValue, hotel_id, city_id, country_id");		
			if (!$table2)
			{			
				// страна
				$table3 = $db->select("SELECT discountType, discountValue FROM special_offer WHERE country_id='".$_GET["country_id"]."' && hotel_id IS NULL  && city_id IS NULL && isActive!=0 ORDER BY discountValue, hotel_id, city_id, country_id");		
				msg::success($table3);
			}
			else msg::success($table2);
		}
		
		msg::success($table1);
     break;
	}
	
  
  // ------------------------------
  // получить результаты
  // ------------------------------
  case "GetResults":{	  					  	 	  	    
  	
	if (!isset($_GET["city_id"])) msg::error("variable not found!");
	
	$result = $db->select(	
		"SELECT DISTINCT 
	    hotel.id, hotel.name, hotel.city_id, search_result.roomname, search_result.price, search_result.currency, meal.name AS meal_name FROM `hotel` 
		INNER JOIN `search_result` on hotel.id=search_result.hotel_id INNER JOIN `meal` on meal.id=meal.id
		WHERE hotel.city_id='".$_GET["city_id"]."' ORDER BY search_result.price, hotel.name, search_result.roomName"
	);
	
	$hotels=array(); $rooms=array(); $prices=array();
	foreach ($result as $item) 
	{	
		if (!in_array($item["roomname"], $rooms)) {	
			$rooms[]=$item["roomname"];
		}
		if (!in_array($item["price"], $prices)) {	
			$prices[]=$item["price"];
		}
		if (!in_array($item["name"], $hotels)) {
			$hotels[$item["name"]] = array( "id" => $item["id"], "name" => $item["name"], "city_id" => $item["city_id"], "rooms" => $rooms, "prices" => $prices, "meal_name" => $item["meal_name"], "currency" => $item["currency"]);
		}
	}

	msg::success($hotels); 	  
	break;
  }
 }
}
?>