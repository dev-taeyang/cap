/* 그룹 이미지 뿌리는 곳*/
const $groupImg = $(".RecruitImage-section");


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
    text =
            `
            <a href="">
                <div class="Image-wrapper">
                    <!-- 유저의 프로필 사진을 가져오는 곳 -->
                    <img class="Image-style" src="/groups/display?fileName=${captain.memberFilePath}/${captain.memberFileUuid}_${captain.memberFileOriginalName}">
                </div>
            </a>
            `
    $captainImg.append(text);
}
showCaptainImg();