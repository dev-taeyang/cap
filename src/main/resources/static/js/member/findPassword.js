/* findPassword.html */

/* $(".pw-change-wrap").hide(); */
$(".send-email-wrap").hide();
let step = 1;

const inputEmail = document.querySelector('.change-password');
const loginButton = document.querySelector('.email-btn');

inputEmail.addEventListener('keyup', activeEvent);

function activeEvent() {
    switch(inputEmail){
      case true : loginButton.disabled = true; break;
      case false : loginButton.disabled = false; break
    }
  };