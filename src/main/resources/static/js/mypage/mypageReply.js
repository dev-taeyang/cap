/* mypageReply.html */

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
                            <div class="user-register-date">` + elapsedTime(memberReply.groupReplyRegisterDate) +` 작성 </div>
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


const $moveReply = $(".reply-board-wrap");
$moveReply.each((i, e) => {
    $(e).click(function () {
        let groupId = memberReplys[i].groupId
        location.href = `/replies/list/${groupId}`
    })
})

const $changePage = $('.changePage');

// 페이징 클릭 이벤트
$changePage.each(function (i, changePage) {
    $(changePage).on("click", e => {
        e.preventDefault();
        criteria.page = ($(this).attr("href"));
        window.location.href = `/mypage/myReply?page=${criteria.page}`;
    })
});


