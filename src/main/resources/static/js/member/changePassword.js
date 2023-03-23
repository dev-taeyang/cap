/* changePassword.html */

/* 비밀번호 정규식 */
const passwordNumberRegex = /[0-9]/g;
const passwordEnglishRegex = /[a-z]/gi;
const passwordSpecialCharacterRegex = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
const $warnText = $('p.warn-text');
const $regexText = $('p.password-regex');
const $inputs = $('input[type="password"]');
/* 새로운 비밀번호 입력칸 */
const $passwordInput = $('.new-password');
/* 새로운 비밀번호 한번더 입력칸 */
const $checkInput = $('.new-password-check');
/* 변경하기 버튼 */
const $changeButton = $('.change-button');
/* keyup 이벤트용 */
const newPassword = document.querySelector('.new-password');
const newPasswordCheck = document.querySelector('.new-password-check');
const changeButton = document.querySelector('.change-button');

let regexMessage = '위 비밀번호와 일치하지 않습니다. 다시 입력해주세요.';
let passwordCheck;
let passwordCheckAll = [false, false];

$('.modal').hide();

/* 새로운 비밀번호 검사 */
$passwordInput.on('blur', function () {
  let value = $(this).val();

  if (!value) {
    $regexText.css('color', 'rgb(153, 153, 153)');
    $passwordInput.css('border', '1px solid rgb(238, 238, 238)');
    passwordCheck = false;
    passwordCheckAll[0] = passwordCheck;
    return;
  }

  /* 정규식 검사 */
  let numberCheck = value.search(passwordNumberRegex);
  let englishCheck = value.search(passwordEnglishRegex);
  let specialCharacterCheck = value.search(passwordSpecialCharacterRegex);

  var condition1 =
    numberCheck >= 0 &&
    englishCheck >= 0 &&
    englishCheck >= 0 &&
    specialCharacterCheck >= 0 &&
    specialCharacterCheck >= 0 &&
    numberCheck >= 0;
  var condition2 = value.length > 9 && value.length < 21;
  var condition3 = value.search(/\s/) < 0;

  /* 정규식 검사 통과하면 true */
  passwordCheck = condition1 && condition2 && condition3;

  passwordCheckAll[0] = passwordCheck;

  if (!passwordCheck) {
    $regexText.css('color', 'rgb(222, 28, 34)');
    $passwordInput.css('border', '1px solid rgb(222, 28, 34)');
    passwordCheckAll[0] = passwordCheck;
  } else {
    $regexText.css('color', 'rgb(153, 153, 153)');
    $passwordInput.css('border', '1px solid rgb(238, 238, 238)');
  }
});

/* 새로운 비밀번호 한번 더 입력 검사 */
$checkInput.on('blur', function () {
  let value = $(this).val();

  if (value != $passwordInput.val()) {
    $warnText.show();
    $warnText.text(regexMessage);
    $checkInput.css('border', '1px solid rgb(222, 28, 34)');
    passwordCheck = false;
    passwordCheckAll[1] = passwordCheck;
  } else {
    $warnText.hide();
    passwordCheck = true;
    passwordCheckAll[1] = passwordCheck;
  }

  passwordCheckAll[1] = passwordCheck;

  if (!passwordCheck) {
    $warnText.show();
    $warnText.text(regexMessage);
    $checkInput.css('border', '1px solid rgb(222, 28, 34)');
    passwordCheckAll[1] = passwordCheck;
  } else {
    $warnText.hide();
    $checkInput.css('border', '1px solid rgb(238, 238, 238)');
  }
});

/* 입력한 값들이 모두 true라면 변경하기 버튼 활성화 */
newPassword.addEventListener('keyup', activeEvent);
newPasswordCheck.addEventListener('keyup', activeEvent);

function activeEvent() {
  switch ($(newPassword).val() == $(newPasswordCheck).val()) {
    case true:
      changeButton.disabled = false;
      break;
    case false:
      changeButton.disabled = true;
      break;
  }
}

$changeButton.on('click', function () {
  let modalMessage = '';
  if (passwordCheckAll.filter((check) => check).length == 2) {
    modalMessage = '변경되었습니다.';
    showWarnModal(modalMessage);
    return;
  }
  modalMessage = '비밀번호를 다시 입력해주세요.';
  showWarnModal(modalMessage);
});

/* 모달창 */
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

$('#mypage-update-password').on('click', function () {
  if (modalCheck) {
    $('div.warn-modal').css('animation', 'popDown 0.5s');
    $('div.modal').fadeOut(500);
  }
});
