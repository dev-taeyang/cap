/* findId.html */

$('.check-id-wrap').hide();
let step = 1;

const inputPhone = document.querySelector('.join-phone');
const inputCode = document.querySelector('.join-check');
const phoneButton = document.querySelector('.join-phone-btn');
const codeButton = document.querySelector('.join-check-btn');
const checkIdButton = document.querySelector('.check-id-btn');
/* 휴대폰 번호 정규식 */
const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

$(inputPhone).on('blur', function () {
  let value = $(this).val();
  $(this).val(value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`));
});

$(inputPhone).on('focus', function () {
    let value = $(this).val();
    $(this).val(value.replaceAll("-", ""));
  });

inputPhone.addEventListener('keyup', activePhone);

function activePhone() {
  switch (!phoneRegex.test($(inputPhone).val())) {
    case true:
        phoneButton.disabled = true;
      break;
    case false:
        phoneButton.disabled = false;
      break;
  }
}

inputCode.addEventListener('keyup', activeCode);

function activeCode() {
    switch ($(inputCode).val().length == 6) {
      case true:
        codeButton.disabled = false;
        break;
      case false:
        codeButton.disabled = true;
        break;
    }
  }

$(codeButton).on('click', function(){
    checkIdButton.disabled = false;
});

$(checkIdButton).on('click', function () {
   /* var phone = $(".findFormInput").val().replaceAll("-", "");
    console.log(phone);
    $.ajax({
      type: "POST",
      url: contextPath + "/smsOk.member",
      data: { memberPhone: phone },
      success: function(data) {
        console.log(data);
        code = data;
      }
    }); */
  goCheck();
});

function goCheck() {
  step = 2;
  $('.id-change-wrap').hide();
  $('.check-id-wrap').show();

  $([document.documentElement, document.body]).animate(
    {
      scrollTop: 0,
    },
    300
  );
}
