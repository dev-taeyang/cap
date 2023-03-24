/* error page js */


const $btn = $(".login-button");


$btn.on("mouseover", function(){
    $(this).css("background-color","green");
});
$btn.on("mouseout", function(){
    $(this).css("background-color","");
});