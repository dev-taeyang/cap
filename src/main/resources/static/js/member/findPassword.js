/* findPassword.html */

$(".send-email-wrap").hide();
$(".modal").hide();
let step = 1;

const inputEmail = document.querySelector('.change-password');
const emailButton = document.querySelector('.email-btn');
const emailRegex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;

inputEmail.addEventListener('keyup', activeEvent);

function activeEvent() {
    switch(!emailRegex.test($(inputEmail).val())){
      case true : emailButton.disabled = true; break;
      case false : emailButton.disabled = false; break
    }
  };

  /* 클래스명 수정해야함 - change-password */
  $(emailButton).on("click", function() {
     let email = $(".change-password").val();
    $.ajax({
      type: "POST",
      url: "/member/send",
      data: { memberEmail: email },
      success: function(result) {
        if(!result){
          let modalMessage = "존재하지 않는 이메일 주소입니다.";
          showWarnModal(modalMessage);
        } else {
          goCheck();
        }
      }
    });
  });

  function goCheck() {
    step = 2;
    $(".pw-change-wrap").hide();
    $(".send-email-wrap").show();

    $([document.documentElement, document.body]).animate({
      scrollTop: 0
    }, 300);
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

$('.find-pw-container').on('click', function () {
  if (modalCheck) {
    $('div.warn-modal').css('animation', 'popDown 0.5s');
    $('div.modal').fadeOut(500);
  }
});