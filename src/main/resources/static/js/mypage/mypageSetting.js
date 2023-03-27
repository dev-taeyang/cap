/* mypageSetting.js */
const $logout = $('.logout-wrap');
const $cancelButton = $('.cancel-button');
const $logoutButton = $('.logout-button');
const $goUpdate = $('.update-user-button');

$('.modal-container').hide();

/* 로그아웃 눌렀을 떄 뜨는 모달창 */
$logout.on('click', function () {
  $('.modal-container').show();
  $('body').css('overflow-y', 'hidden');
  let modalMessage = '<p>정말</p><p>로그아웃 하시겠습니까?</p>';
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

/* 로그아웃 컨트롤러 타고 메인페이지로 이동해야함 */
$logoutButton.on('click', function () {
    location.href = '/member/logout';
  });

/* 수정 버튼 눌렀을때 수정 페이지로 이동 */
$goUpdate.on('click', function () {
  location.href = '/mypage/mypageUpdate';
})