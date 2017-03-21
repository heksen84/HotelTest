function InitCommon(fade_in_speed)
{
 sweetAlertInitialize(); $("body").fadeIn(fade_in_speed);
}

// проверка на email
function isEmail(email) 
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function StartKeyboard()
{
 $(document).keyup(function(e) 
 {
  if (e.keyCode === 27) history.back();   // назад
 });
}

function StopKeyboard()
{
  $( document ).unbind( "keyup" );
}