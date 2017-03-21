// ------------------------------------
// Developed by Ilya Bobkov
// Модуль сообщений
// ------------------------------------
function warning(string)
{
 console.log(string);
 swal( "ВНИМАНИЕ", string, "warning" );
}
function success(string)
{
 console.log(string);
 swal( string, "", "success" );
}
function error(string)
{
 console.log(string);
 swal( "ОШИБКА", string, "error" );
}