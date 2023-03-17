/* mypageUpdate.html */

const $changeButtons = $('.change-button');
const $saveButton = $('.save-button');
const $inputUsers = $('.change-value');
const $inputNickname = $("input[name='memberNickname']")
const $inputBirth = $("input[name='memberBirth']");
const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
const birthRegex = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
let nicknameCheck = true;
let birthCheck = true;
let saveChecks = [false, false];

$(".modal").hide();

/* 생일, 닉네임 정규식 추가해야함 */
$inputBirth.on('focus', function () {
  $(this).val($(this).val().replaceAll('.', ''));
  $inputBirth.css("border", "1px solid black");
});

$inputNickname.on('focus', function () {
  $inputNickname.css("border", "1px solid black");
});

$inputBirth.on('blur', function () {
  birthCheck = birthRegex.test($(this).val());
  if (birthCheck) {
    $(this).val($(this).val().replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`));
    $inputBirth.css("border", "1px solid rgb(238, 238, 238)");
  }else{
    $(this).val("");
    $inputBirth.css("border", "1px solid red");
    $inputBirth.attr("placeholder", "생년월일을 올바르게 입력하세요.");
  }
});

$inputNickname.on('blur', function () {
  nicknameCheck = nicknameRegex.test($(this).val());
  if(nicknameCheck){
    $inputNickname.css("border", "1px solid rgb(238, 238, 238)");
  }else{
    $(this).val("");
    $inputNickname.css("border", "1px solid red");
    $inputNickname.attr("placeholder", "닉네임을 올바르게 입력하세요.");
  }
});

$changeButtons.on('click', function () {
  let i = $changeButtons.index($(this));
  $inputUsers.eq(i).attr('disabled', false);
  $inputUsers.eq(i).focus();
});

$saveButton.on('click', function () {
  let modalMessage = "";
  if(!nicknameCheck){
    modalMessage = "닉네임을 다시 입력하세요.";
    showWarnModal(modalMessage);
    return;
  }else if(!birthCheck){
    modalMessage = "생일을 다시 입력하세요.";
    showWarnModal(modalMessage);
    return;
  }
  modalMessage = "저장되었습니다."
  showWarnModal(modalMessage);
});

let modalCheck;
function showWarnModal(modalMessage) {
	modalCheck = false;
	$("div.modal-content").html(modalMessage)
	$("div.warn-modal").css("animation", "popUp 0.5s");
	$("div.modal").css("display", "flex").hide().fadeIn(500);
	setTimeout(function() { modalCheck = true; }, 500);
}

$("div.modal").on("click", function() {
	if (modalCheck) {
		$("div.warn-modal").css("animation", "popDown 0.5s");
		$("div.modal").fadeOut(500);
	}
});

