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
let code;

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
    switch ($(inputCode).val() == code) {
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

$(phoneButton).on('click', function () {
    let phone = $(".join-phone").val().replaceAll("-", "");
    console.log(phone);
    $.ajax({
      type: "POST",
      url: "/member/checkSms",
      data: { memberPhone: phone },
      success: function(data) {
        console.log(data);
        code = data;
      }
    });
});

let noId = "가입하신 아이디가 존재하지 않습니다.";
let identification = "";
$(".check-id-btn").on("click", function() {
    let phone = $(".join-phone").val();
    $.ajax({
        type: "POST",
        url: "/member/findId",
        data: { memberPhone: phone },
        success: function(data) {
            identification = data;
            console.log(data);
            if(data == ""){
                $(".no-id-text").html(noId);
                $(".id-text").css('display', 'none');
            }else{
                $(".id-text").html(identification);
                $(".no-id-text").css('display', 'none');
            }
        }

    });
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
