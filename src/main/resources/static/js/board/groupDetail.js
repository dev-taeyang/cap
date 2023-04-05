/* 그룹 이미지 뿌리는 곳*/
const $groupImg = $(".RecruitImage-section");
/* 모달 숨기기 */
$(".text-modal").hide();

/* 탐험대 사진 뿌리기 */
function showImg() {
    let text ="";
    text = `
            <div class="presentationImage-content">
                <div class="introduceImage-wrapper">
                    <!-- 이미지가 들어갈 곳 -->
                    <img style="height: 375px;" src="/groups/display?fileName=${group.groupFilePath}/${group.groupFileUuid}_${group.groupFileOriginalName}" alt="">
                </div>
            </div>
            `
    $groupImg.append(text);
};
showImg();

/* 탐험대장 사진 뿌리기 */
const $captainImg = $(".ProfileInfo-profileImage");
function showCaptainImg() {
    let text = "";
    if (captain.memberFileOriginalName != null){
        text =
                `
                <a href="">
                    <div class="Image-wrapper">
                        <!-- 유저의 프로필 사진을 가져오는 곳 -->
                        <img class="Image-style" src="/groups/display?fileName=${captain.memberFilePath}/${captain.memberFileUuid}_${captain.memberFileOriginalName}">
                    </div>
                </a>
                `
    }else {
        text =
                `
                <a href="">
                    <div class="Image-wrapper">
                        <!-- 유저의 프로필 사진을 가져오는 곳 -->
                        <img class="Image-style" src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png">
                    </div>
                </a>
                `
    }
    $captainImg.append(text);
}
showCaptainImg();

/* 가입한 유저들 뿌리기 */
function showMembers() {
    let text = "";
    if(memberVOS.length != 0){
        memberVOS.forEach((memberVO,i) => {
            if (memberVO.memberFileOriginalName != null){
                text += `
                    <div class="OtherMember-wrapper">
                        <a href="">
                            <div class="OtherMember-profile">
                                <div class="OtherMember-image">
                                <!-- 유저의 프로필 사진을 가져오는 곳 -->
                                    <img class="Image-style recruit-Member"
                                        src="/groups/display?fileName=${memberVO.memberFilePath}/${memberVO.memberFileUuid}_${memberVO.memberFileOriginalName}">
                                </div>
                            </div>
                            <!-- 유저의 닉네임을 받아올 곳 -->
                            <span class="OtherMember-nickname">${memberVO.memberNickname}</span>
                        </a>
                    </div>
                    `
            }else {
                text += `
                <div class="OtherMember-wrapper">
                    <a href="">
                        <div class="OtherMember-profile">
                            <div class="OtherMember-image">
                            <!-- 유저의 프로필 사진을 가져오는 곳 -->
                                <img class="Image-style recruit-Member"
                                    src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png">
                            </div>
                        </div>
                        <!-- 유저의 닉네임을 받아올 곳 -->
                        <span class="OtherMember-nickname">${memberVO.memberNickname}</span>
                    </a>
                </div>
                `
            }
        });
    }else {
        console.log("들어좀 와라")
        text =
            `
                <span class="OtherMember-title">아직 함께 하시는 탐험대원이 없습니다</span>
            `
    }
    $(".OtherMemberContent-container").append(text);
}

showMembers();


/*===================================================================================*/

/* 참여하기 버튼눌렀을때 */
const $JoinButton = $('.button-enterRecruit');

$JoinButton.on('click', function(e){
    if(maxValue > currentValue && sessionId != null && group.groupCaptain != sessionId && !memberVOS.includes(sessionId)){
        e.preventDefault();
        $(".floatActionBar-wrapper").hide();
        location.href = `/groups/register?groupId=${groupId}`;


    }else {
        console.log("참여불가함 떠야됨");
        $JoinButton.css("background-color","red");
        $JoinButton.attr("disabled", true);
        $(".enterButton-Text").html("참여가 불가능합니다.");
    }
})


/* date안에 날짜형식의 값을 넣으면 알아서 계산됨. */
function remainingDays(date) {
    const start = new Date();
    const end = new Date(date);

    const diff = (end - start) / (1000 * 60 * 60 * 24);

    if (diff < 0) {
        return '모집이 마감되었습니다.';
    } else if (diff === 0) {
        return '오늘이 마감일 입니다.';
    } else {
        return `모집 마감까지 ${Math.ceil(diff)}일`;
    }
}

/* end-info의 2번째꺼에 마감일 안내 */
if(maxValue > currentValue){
    $(".end-info").html("* " + remainingDays(group.groupEndDate));
    $(".end-info").css("color","gray");
}


