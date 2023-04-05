/* mypageParticipateRecruitList.html */


/* 내가 참가한 탐험대 리스트 뿌려줄 곳 */
const $MyParticipateList = $(".view-boardList-wrapper");
/* 참가한 탐험대가 없을 때 나올 이미지를 넣을 곳 */
const $noParticipateList = $(".no-myParticipateRecruit");
let text = "";

function showMyParticipateList() {
    if(myParticipateRecruits.length == 0) {
        text += `
            <div class="mypage-recruit-empty">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='59' height='58' viewBox='0 0 59 58'%3E %3Cpath fill='%23777' d='M50.065 8.455c-11.272-11.273-29.818-11.273-41.09 0-11.273 11.272-11.273 29.818 0 41.09 11.272 11.273 29.818 11.273 41.09 0 11.273-11.272 11.273-29.454 0-41.09zm-5.814 5.175c7.563 7.738 8.283 19.896 2.16 28.37L16.52 11.051c8.643-6.263 20.168-5.158 27.73 2.58zM13.906 44.37C6.202 36.632 5.469 24.474 11.705 16L42.52 46.949c-9.171 6.263-20.91 5.158-28.614-2.58z'/%3E %3C/svg%3E"
                  alt="피드가 없습니다."/>
                <strong class="mypage-recruit-empty-text">참여한 탐험대가 없습니다.</strong>
            </div>
        `
        $noParticipateList.append(text)
    } else {
        myParticipateRecruits.forEach((myparticipate, i) => {
            text += `
                    <div>
                        <!-- 글쓴이의 정보가 나올 곳 -->
                        <div class="profile-wrapper">
                          <!-- 프로필 사진 -->
                          <div class="MemberProfile-wrapper">
                            <div class="MemberProfileImg-wrapper">
                              <div class="Image-wrapper">
                    `

            if(myparticipate.memberFilePath == null) {
                text += `
                                
                                <img
                                      class="Image-style"
                                      src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png"
                                />
                        `
            } else {
                text += `
                             <img
                                  class="Image-style"
                                  src="/mypage/display?fileName=${myparticipate.memberFilePath}/${myparticipate.memberFileUuid}_${myparticipate.memberFileOriginalName}"
                             />
                        
                        `
            }
            text +=

                `          
                                  </div>
                                </div>
                                <!-- 글쓴이의 이름과 글쓴 시간 -->
                                <div class="MemberProfileText-wrapper">
                                  <p class="ProfileName">${myparticipate.memberNickname}</p>
                                  <div class="RegistTime">` + remainingDays(myparticipate.groupEndDate) +`</div>
                                </div>
                              </div>
                            </div>
                            <!-- 원정대 소개 이미지 -->
                            <div class="boardImg-wrapper">
                              <a href="/groups/detail/${myparticipate.groupId}">
                                <div class="boardSlideImg-wrapper">
                                  <div class="introduceImage-wrapper">
                            `
            if(myparticipate.groupFileType == 0) {
                text += `
                                        <img
                                          src="https://dahanweb.co.kr/gnuboard4/data/file/gall/2949946602_iBjAP3kv_989758.jpg"
                                          alt="기본 이미지"
                                        />
                                `
            } else {
                text += `
                                    <!-- 이미지가 들어갈 곳 -->
                                    <img
                                      src="/mypage/display?fileName=${myparticipate.groupFilePath}/${myparticipate.groupFileUuid}_${myparticipate.groupFileOriginalName}"
                                      alt=""
                                    />
                                `
            }
            text +=
                `
                                  </div>
                                </div>
                              </a>
                            </div>
                            <!-- 카테고리가 나타날 곳 -->
                            <div class="boardCategory-wrapper">
                              <!-- 작성자가 작성한 카테고리 나오기 -->
                              <span>${myparticipate.groupCategory}</span>
                            </div>
                            <!-- 제목이 들어갈 곳 -->
                            <div class="boardTitle-wrapper">
                                <!-- 작성자가 작성한 제목 나오기 -->
                                <span>${myparticipate.groupTitle}</span>
                            </div>
                            <!-- 작성자가 작성한 글이 들어갈 곳 -->
                            <div class="description-wrapper description-detail">
                              <span class="TextLine-Description">${myparticipate.groupContent}</span>
                            </div>
                            <!-- 댓글로 이동할 수 있는 곳 -->
                            <div class="actionGroup-wrapper">
                              <a class="actionGroup-reply" href="/replies/list/${myparticipate.groupId}">
                                <img
                                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='18' viewBox='0 0 21 18'%3E %3Cpath fill='none' stroke='%234E5968' stroke-width='1.5' d='M20.25.75H.75v11.818h3.842v4.015l5.9-4.015h9.758V.75z'/%3E %3C/svg%3E"
                                  alt=""
                                />
                                <!-- 댓글의 갯수가 들어오는 곳 -->
                                <span>${myparticipate.groupReplyCount}</span>
                              </a>
                            </div>
                        </div>
                        `
        })
        $MyParticipateList.append(text)
    }
}
showMyParticipateList();


const $changePage = $('.changePage');

// 페이징 클릭 이벤트
$changePage.each(function (i, changePage) {
    $(changePage).on("click", e => {
        e.preventDefault();
        criteria.page = ($(this).attr("href"));
        window.location.href = `/mypage/partInRecruit?page=${criteria.page}`;
    })
});