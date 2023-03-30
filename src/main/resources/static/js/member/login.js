/**
 * login.html
 */

console.log('들어옴');
const $checkAutoLogin = $("input[name='auto-login']");
const $id = $(".login-id");
const $password = $(".login-password");
const $inputs = $(".login-id, .login-password")
let checks = [false, false];
console.log($checkAutoLogin);
/* ============================================= */
/* keyup 이벤트용 상수 선언 */
const idForm = document.querySelector('.login-id');
const pwForm = document.querySelector('.login-password');
const loginButton = document.querySelector('.login-btn');

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

function send(){
	/*비밀번호 암호화*/
	$password.val(btoa($password.val()));

    document.login.submit();
}

$id.on("blur", function(){
    $id.next().hide();
    if($id.val()){
        $id.css("border", "1px solid #05AE68");
        checks[0] = true;
        return;
    }
    $id.css("border", "1px solid rgb(255, 64, 62)");
});

$password.on("blur", function(){
    $password.next().hide();
    if($password.val()){
        $password.css("border", "1px solid #05AE68");
        checks[1] = true;
        return;
    }
    $password.css("border", "1px solid rgb(255, 64, 62)");
});

/* 아이디, 비밀번호 입력 시 로그인 버튼 활성화  */
idForm.addEventListener('keyup', activeEvent);
pwForm.addEventListener('keyup', activeEvent);

function activeEvent() {
  switch(!(idForm.value && pwForm.value)){
    case true : loginButton.disabled = true; break;
    case false : loginButton.disabled = false; break
  }
};


let modalCheck;
function showWarnModal(modalMessage) {
    modalCheck = false;
    $('div.modal-content').html(modalMessage);
    $('div.warn-modal').css('animation', 'popUp 0.5s');
    $('div.modal').css('display', 'flex').hide().fadeIn(500);
    setTimeout(function () {
        modalCheck = true;
    }, 500);
}

$('.login-container').on('click', function () {
    if (modalCheck) {
        $('div.warn-modal').css('animation', 'popDown 0.5s');
        $('div.modal').fadeOut(500);
    }
});
