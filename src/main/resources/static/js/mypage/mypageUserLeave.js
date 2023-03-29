/* mypageUserLeave.html */

const $leave = $('.leave-btn');
const $cancelButton = $('.modal-cancel-button');
const $leaveButton = $('.modal-leave-button');

$('.modal-container').hide();

/* 로그아웃 눌렀을 떄 뜨는 모달창 */
$leave.on('click', function () {
  $('.modal-container').show();
  $('body').css('overflow-y', 'hidden');
  let modalMessage = '<p>정말</p><p>탈퇴하시겠습니까?</p>';
  showWarnModal(modalMessage);
});

function showWarnModal(modalMessage) {
  $('.modal-content').html(modalMessage);
  $('.warn-modal').css('animation', 'popUp 0.5s');
  $('.modal-container').css('display', 'flex').hide().fadeIn(500);
  setTimeout(function () {
    modalCheck = true;
  }, 500);
}

/* 모달 내리기 */
$cancelButton.on('click', function () {
  $('.warn-modal').css('animation', 'popDown 0.5s');
  $('.modal-container').fadeOut(500);
  $('body').css('overflow-y', 'scroll');
});

/* 회원탈퇴 컨트롤러 타고 메인페이지로 이동해야함 */
$leaveButton.on('click', function () {
    document.leave.submit();
  });
