/* mypageUpdatePassword.html */

/* 비밀번호 정규식 */
const passwordNumberRegex = /[0-9]/g;
const passwordEnglishRegex = /[a-z]/gi;
const passwordSpecialCharacterRegex = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
const $warnText = $('p.warn-text');
const $regexText = $('p.password-regex');
const $inputs = $('input[type="password"]');
/* 기존 비밀번호 입력칸 */
const $originalPassword = $('.original-password');
/* 새로운 비밀번호 입력칸 */
const $passwordInput = $('.new-password');
/* 새로운 비밀번호 한번더 입력칸 */
const $checkInput = $('.new-password-check');
/* 변경하기 버튼 */
const $changeButton = $('.change-button');
/* 기존 비밀번호 확인용 텍스트 */
const $originalText = $('.checkOrinial-pass');

let regexMessage = '위 비밀번호와 일치하지 않습니다. 다시 입력해주세요.';
let passwordCheck;
let passwordCheckAll = [false, false, false];

/* ajax 통과후 확인하는 체크 */
let duplicateCheck;

$('.modal').hide();
/* 기존 비밀번호 쪽 에러 메세지 */
$originalText.hide();

/* 기존 비밀번호 검사 */
$originalPassword.on('blur', function () {
  let value = $(this).val();

  if (!value) {
    passwordCheck = false;
    passwordCheckAll[0] = passwordCheck;
    return;
  }

  if(value != atob(members.memberPassword)) {
    passwordCheck = false;
    passwordCheckAll[0] = passwordCheck;
    $originalPassword.css('border', '1px solid rgb(222, 28, 34)')
    $originalText.show();
    $originalText.css('color', 'rgb(222, 28, 34)')
    $originalText.html("기존 비밀번호를 적어 주십시오")
    return;
  } else {
    passwordCheck = true;
    passwordCheckAll[0] = passwordCheck;
    $originalPassword.css('border', '1px solid rgb(238, 238, 238)')
    $originalText.hide();
    return;
  }
});

/* 새로운 비밀번호 검사 */
$passwordInput.on('blur', function () {
  let value = $(this).val();

  if (!value) {
    $regexText.text("대/소문자, 숫자, 특수문자 중 2가지 이상의 조합으로 10자 이상")
    $regexText.css('color', 'rgb(153, 153, 153)');
    $passwordInput.css('border', '1px solid rgb(238, 238, 238)');
    passwordCheck = false;
    passwordCheckAll[1] = passwordCheck;
    return;
  }

  /* 작성한 비밀번호가 기존에 db에 있는 비밀번호들과 중복됐는지 체크 */
  $.ajax({
    type: "POST",
    url: "/mypage/checkPassword",
    async: false,
    data: {memberPassword: btoa(value)},
    success: function (result) {
      let message;
      if(result != "success") {
        duplicateCheck = false;
        return;
      } else {
        duplicateCheck = true;
        return;
      }
    }
  })

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

  passwordCheckAll[1] = passwordCheck;
  if(duplicateCheck) {
    $regexText.text("대/소문자, 숫자, 특수문자 중 2가지 이상의 조합으로 10자 이상")
    if (!passwordCheck) {
      $regexText.css('color', 'rgb(222, 28, 34)');
      $passwordInput.css('border', '1px solid rgb(222, 28, 34)');
      passwordCheckAll[1] = passwordCheck;
    } else {
      $regexText.css('color', 'rgb(153, 153, 153)');
      $passwordInput.css('border', '1px solid rgb(238, 238, 238)');
    }
  } else {
    $regexText.text("중복된 비밀번호입니다")
    $regexText.css('color', 'rgb(222, 28, 34)');
    $passwordInput.css('border', '1px solid rgb(222, 28, 34)');
    passwordCheckAll[1] = false;
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
    passwordCheckAll[2] = passwordCheck;
  } else {
    $warnText.hide();
    passwordCheck = true;
    passwordCheckAll[2] = passwordCheck;
  }

  passwordCheckAll[2] = passwordCheck;

  if (!passwordCheck) {
    $warnText.show();
    $warnText.text(regexMessage);
    $checkInput.css('border', '1px solid rgb(222, 28, 34)');
    passwordCheckAll[2] = passwordCheck;
  } else {
    $warnText.hide();
    $checkInput.css('border', '1px solid rgb(238, 238, 238)');
  }
});

/* 입력한 값들이 모두 true라면 변경하기 버튼 활성화 */
$inputs.on('blur', function () {
  if (passwordCheckAll.filter((check) => check).length == 3) {
    $changeButton.attr('disabled', false);
    return;
  }
  $changeButton.attr('disabled', true);
});

$changeButton.on('click', function () {

  $("input[name='memberPassword']").val(btoa($("input[name='memberPassword']").val()));
  $('.new-password-check').val(btoa($('.new-password-check').val()));
  /* 기존 비밀번호 검사 후 true일 때 모달창 */
  /* modalMessage = "변경되었습니다.";
    showWarnModal(modalMessage); */

  document.updatePassword.submit();
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
