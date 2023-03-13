/* mypageUpdate.html */

const $changeButtons = $('.change-button');
const $saveButtons = $('.save-button');
const $inputUsers = $('.change-value');
const birthRegex = /^(19[0-9][0-9]|20\d{2}).?(0[0-9]|1[0-2]).?(0[1-9]|[1-2][0-9]|3[0-1])$/;
let check;

$saveButtons.hide();

/* 생일, 닉네임 정규식 추가해야함 */
/* $inputUsers.eq(1).on('focus', function () {
  $(this).val($(this).val().replaceAll('.', ''));
});

$inputUsers.eq(1).on('blur', function () {
  check = false;
  check = birthRegex.test($(this).val());
  if (check) {
    $(this).val($(this).val().replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`));
    return;
    alert("생년월일을 확인하세요.");
  }
}); */

$changeButtons.on('click', function () {
  let i = $changeButtons.index($(this));
  $inputUsers.eq(i).attr('disabled', false);
  $inputUsers.eq(i).focus();
  $(this).hide();
  $saveButtons.eq(i).show();
});

$saveButtons.on('click', function () {
  let i = $saveButtons.index($(this));
  $inputUsers.eq(i).attr('disabled', true);
  $(this).hide();
  $changeButtons.eq(i).show();
});

