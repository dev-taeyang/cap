/* mypageReply.html */

console.log(memberReplys)
/* 댓글 리스트로 추가할 곳*/
const $myReplyWrap = $(".mypage-reply-list");
let text = "";

function showMyReply() {
    memberReplys.forEach((memberReply, i) => {
            text += `
                <li>
                    <div class="my-reply-container">
                      <div class="my-reply-wrap">
                        <div class="my-reply-user-info">
                          <div class="user-image-wrap">
                    `


                  if(memberReply.memberFilePath == null) {
                      text +=
                        `
                            <img
                              alt="프로필"
                              class="user-image"
                              src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png"
                            />
                        `
                      } else {
                      text +=

                      `
                            <img
                              alt="프로필"
                              class="user-image"
                              src="/mypage/display?fileName=${memberReply.memberFilePath}/${memberReply.memberFileUuid}_${memberReply.memberFileOriginalName}"
                            />
                      `
                    }
                text +=
                        `
                          </div>
                        </div>
                        <div class="user-nickname-register">
                          <div class="user-nickname">${memberReply.memberNickname}</div>
                          <div class="user-register-date-wrap">
                            <div class="user-register-date">${memberReply.groupReplyRegisterDate} 작성</div>
                          </div>
                        </div>
                      </div>
                      <div class="reply-content">${memberReply.groupReplyContent}</div>
                      <div class="reply-board-wrap">
                        <div class="reply-board">${memberReply.groupTitle}</div>
                      </div>
                    </div>
                  </li>
                `
            })
    $myReplyWrap.append(text);
}
showMyReply();




const $pageNumber = $(".page-number");
const $prevButton = $(".prev-button img");
const $prevPrevButton = $(".prev-prev-button img");
const $nextButton = $(".next-button img");
const $nextNextButton = $(".next-next-button img");

// 페이지 수가 1보다 크다면 다음 버튼 활성화
if($pageNumber.length > 1){
    $nextButton.css("filter", "invert(1)");
    $nextNextButton.css("filter", "invert(1)");
    $nextButton.css("cursor", "pointer");
    $nextNextButton.css("cursor", "pointer");
}
// 페이징 클릭 이벤트
$pageNumber.each((i, e) => {
    $(e).click(function(){
        $pageNumber.removeClass("page-active");
        $(e).addClass("page-active");
    });
});