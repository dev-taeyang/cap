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
  location.href = '/mypage/Update';
})

/* 프로필 사진 보여주기 */
const $memberProfile = $(".head-user-info-wrap");
let text = "";
function showProfile() {
  if(members.memberFileType == 1) {
        text += `
              <a class="head-user-info" href="/mypage/Update">
                <img src="/mypage/display?fileName=${members.memberFilePath}/${members.memberFileUuid}_${members.memberFileOriginalName}" class="user-profile-image" />
        `
    } else {
    text += `
              <a class="head-user-info" href="/mypage/Update">
                <img src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png" class="user-profile-image" />
        `
  }
    text += `
            <div class="head-userinfo-textwrapper">
                <div class="head-userinfo-nickname">${members.memberNickname}</div>
      `
  if(members.memberStatus == 0) {
      text += `
              
                    <div class="head-userinfo-email">일반 계정</div>
                </div>
            </a>
      `
    } else if(members.memberStatus == 1) {
      text += `
                  <div class="head-userinfo-email">카카오 계정</div>
                </div>
            </a>
      `
  } else if(members.memberStatus == 2) {
      text += `
                  <div class="head-userinfo-email">네이버 계정</div>
                </div>
            </a>
      `
  }
    $memberProfile.append(text)
};
showProfile();
