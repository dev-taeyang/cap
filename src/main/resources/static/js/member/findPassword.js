/* findPassword.html */

$(".send-email-wrap").hide();
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

  $(emailButton).on("click", function() {
   /*  var phone = $(".findFormInput").val().replaceAll("-", "");
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
    $(".pw-change-wrap").hide();
    $(".send-email-wrap").show();
  
    $([document.documentElement, document.body]).animate({
      scrollTop: 0
    }, 300);
  };