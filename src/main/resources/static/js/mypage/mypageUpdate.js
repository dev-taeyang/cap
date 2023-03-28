/* mypageUpdate.html */

/* 변경하기 버튼 */
const $changeButtons = $('.change-button');
/* 저장 버튼 */
const $saveButton = $('.save-button');
/* 닉네임, 생년월일 inputbox */
const $inputUsers = $('.change-value');
/* 닉네임 inputbox */
const $inputNickname = $("input[name='memberNickname']");
/* 생년월일 inputbox */
const $inputBirth = $("input[name='memberBirth']");
/* 닉네임 정규식 */
const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
/* 생일 정규식 */
const birthRegex = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
/* 경고문구 */
const $warnText = $('.warn-text');
/* 프로필 파일첨부 */
const file = document.querySelector('input[type=file]');
const img = document.querySelector('.user-profile-image');
const closeSpan = document.querySelector('.close-image');

let nicknameCheck = true;
let birthCheck = true;
let saveChecks = [false, false];

$('.modal').hide();

closeSpan.addEventListener('click', function (e) {
  e.preventDefault();
  this.style.display = 'none';
  img.setAttribute('src', "https://t1.kakaocdn.net/together_image/common/avatar/avatar.png");
});

file.addEventListener('change', function (e) {
  closeSpan.style.display = "inline-block";
  this.style.display = 'none';
  // 기존의 이미지 숨김 처리
  let reader = new FileReader();
  // 이벤트 타겟의 url을 불러와서
  reader.readAsDataURL(e.target.files[0]);
  // 올리기
  // onload - file이 로드된 후 발생하는 이벤트
  reader.onload = function (e) {
    // 이벤트가 발생된 타겟의 url을 출력해서 result에 담아줌
    let result = e.target.result;
    // result가 이미지라면 result에 담긴 이미지로 설정
    if (result.includes('image')) {
      img.src = `${result}`;
    } else {
      img.attr('src', "https://t1.kakaocdn.net/together_image/common/avatar/avatar.png");
    }
  };
});

/* 닉네임 포커스 이벤트 */
$inputNickname.on('focus', function () {
  $inputNickname.css('border', '1px solid black');
});

/* 생년월일 포커스 이벤트 */
$inputBirth.on('focus', function () {
  $(this).val($(this).val().replaceAll('.', ''));
  $inputBirth.css('border', '1px solid black');
});

/* 닉네임 검사 */
$inputNickname.on('blur', function () {
  let value = $(this).val();
  /* 닉네임 비어있으면 입력하라는 경고 문구 */
  if (!value) {
    $warnText.eq(0).show();
    $warnText.eq(0).text('닉네임을 입력하세요.');
    $inputNickname.css('border', '1px solid rgb(222, 28, 34)');
    nicknameCheck = false;
    return;
  }
  /* 정규식 검사 */
  nicknameCheck = nicknameRegex.test($(this).val());
  if (nicknameCheck) {
    $warnText.hide();
    $inputNickname.css('border', '1px solid rgb(238, 238, 238)');
  } else {
    $warnText.eq(0).show();
    $warnText.eq(0).text('영문 혹은 영문과 숫자를 조합하여 4자~20자로 입력해주세요.');
    $inputNickname.css('border', '1px solid rgb(222, 28, 34)');
  }
});

/* 생년월일 검사 */
$inputBirth.on('blur', function () {
  let value = $(this).val();
  /* 생년월일 비어있으면 입력하라는 경고 문구 */
  if (!value) {
    $warnText.eq(1).show();
    $warnText.eq(1).text('생년월일을 입력하세요.');
    $inputBirth.css('border', '1px solid rgb(222, 28, 34)');
    birthCheck = false;
    return;
  }

  /* 생년월일 정규식 검사 */
  birthCheck = birthRegex.test($(this).val());
  if (birthCheck) {
    $warnText.hide();
    $(this).val(
      $(this)
        .val()
        .replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`)
    );
    $inputBirth.css('border', '1px solid rgb(238, 238, 238)');
  } else {
    $warnText.eq(1).show();
    $warnText.eq(1).text('생년월일을 확인하세요.');
    $inputBirth.css('border', '1px solid rgb(222, 28, 34)');
  }
});

/* 변경하기 클릭 이벤트 */
$changeButtons.on('click', function () {
  let i = $changeButtons.index($(this));
  /* 변경하기 클릭하면 inputbox focus되면서 입력 가능 */
  $inputUsers.eq(i).attr('disabled', false);
  $inputUsers.eq(i).focus();
});

/* 저장 버튼 클릭 이벤트 */
$saveButton.on('click', function () {
  let modalMessage = '';
  /* 닉네임check false면 다시 입력하라는 모달창 */
  if (!nicknameCheck) {
    modalMessage = '닉네임을 다시 입력하세요.';
    showWarnModal(modalMessage);
    return;
  } else if (!birthCheck) {
  /* 생알check false면 다시 입력하라는 모달창 */
    modalMessage = '생일을 다시 입력하세요.';
    showWarnModal(modalMessage);
    return;
  }

  let memberVO = {
    memberId : members.memberId,
    memberNickname: $("#memberNickname").val(),
    memberBirth: $("#memberBirth").val()
  }

  console.log(memberVO);

  $.ajax({
    type: "POST",
    url: "/mypage/Update",
    data: {memberVO: memberVO},
    dataType: "json",
    success : function() {
        alert("성공");
    }

  })
  console.log("들어옴");
  /* 닉네임, 생일check 둘 다 true면 저장되었다는 모달창 */
  modalMessage = '저장되었습니다.';
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

$('#mypageUpdate').on('click', function () {
  if (modalCheck) {
    $('div.warn-modal').css('animation', 'popDown 0.5s');
    $('div.modal').fadeOut(500);
  }



});
