/**
 * login.html
 */

console.log('들어옴');
const $checkAutoLogin = $("input[name='auto-login']");
console.log($checkAutoLogin);
// const $id = $("input#id");
// const $password = $("input#password");

$checkAutoLogin.on('click', function () {
    let isChecked = $(this).prop('checked');
    console.log($(this));
    isChecked ? checkedAutoLogin() : notCheckedAutoLogin();
});

function checkedAutoLogin() {
    $('.stayLoginCheckbox').css('border-color', '#00800082');
    $('.stayLoginCheckbox').css('background-color', '#00800082');
}

function notCheckedAutoLogin() {
    $('.stayLoginCheckbox').css('border-color', '');
    $('.stayLoginCheckbox').css('background-color', '');
}

// function send(){
//     if(!$id.val()){
//         showWarnModal("아이디를 입력해주세요!");
//         showHelp($id,  contextPath + "/static/images/error.png");
//         $id.next().fadeIn(500);
//         return;
//     }
//     if(!$password.val()){
//         showWarnModal("비밀번호를 입력해주세요!");
//         showHelp($password, contextPath + "/static/images/error.png");
//         $password.next().fadeIn(500);
//         return;
//     }
// 	/*비밀번호 암호화*/
// 	$password.val(btoa($password.val()));

//     document.login.submit();
// }

// $id.on("blur", function(){
//     $id.next().hide();
//     if($id.val()){
//         $id.next().fadeIn(500);
//         showHelp($id, contextPath + "/static/images/pass.png");
//     }
// });

// $password.on("blur", function(){
//     $password.next().hide();
//     if($password.val()){
//         $password.next().fadeIn(500);
//         showHelp($password, contextPath + "/static/images/pass.png");
//     }
// });

// $password.on("blur", function(){

// });

// function showHelp($input, fileName){
//     $input.next().attr("src", fileName);

//     if(fileName == contextPath + "/static/images/pass.png") {
//         $input.css("border", "1px solid rgba(0, 0, 0, 0.1)");
//         $input.css("background", "rgb(255, 255, 255)");
//     }else {
//         $input.css("border", "1px solid rgb(255, 64, 62)");
//         $input.css("background", "rgb(255, 246, 246)");
//     }
// }

// let modalCheck;
// function showWarnModal(modalMessage){
//     modalCheck = false;
//     $("#contentWrap").html(modalMessage)
//     $(".warnModal").css("animation", "popUp 0.5s");
//     $(".modal").css("display", "flex").hide().fadeIn(500);
//     setTimeout(function(){modalCheck = true;}, 500);
// }

// $(".modal").on("click", function(){
//     if(modalCheck){
//         $(".warnModal").css("animation", "popDown 0.5s");
//         $(".modal").fadeOut(500);
//     }
// });
