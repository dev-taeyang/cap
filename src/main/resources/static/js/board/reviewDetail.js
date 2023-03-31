
/*===================================================================================*/


/*변수 선언*/
const $files = review.files;
const $header = $(".date");
const $mainImg = $(".boardDetail-reviewSection");
const $info = $(".reviewInfo");
const $images = $(".plusImages-wrapper");
const $modify = $(".infoSection-actionWrapper");
const $profile = $(".ProfileInfo-wrapper");
let text = "";

/*===================================================================================*/

/*리뷰 윗부분 뿌리는 함수*/
function showTop() {
    text = `
                <!-- 리뷰 작성 날짜가 들어갈 곳 -->
            <div class="reviewSection-time">${review.reviewRegisterDate}</div>
            <div class="reviewSection-wrapper">
            <!-- 리뷰 제목이 들어갈 곳 -->
               <span class="reviewSection-title">${review.reviewTitle}</span>
            </div>
            `
    $header.append(text);
    text = "";
}

        /*회원가입할때 프로필에 이미지를 저장해놨다면?*/
if(memberVO.memberFileOriginalName != null){
function showProfile() {
    text =
            `
            <!-- 작성자의 프로필 이미지 나오는 곳 -->
              <div class="ProfileInfo-profileImage reviewSection-profile">
                  <a href="">
                      <div class="Image-wrapper">
                      <!-- 유저의 프로필 사진을 가져오는 곳 -->
                      <img class="Image-style" src="/reviews/display?fileName=${memberVO.memberFilePath}/${memberVO.memberFileUuid}_${memberVO.memberFileOriginalName}">
                      </div>
                  </a>
              </div>
              <!-- 작성자의 정보가 나오는 곳 -->
              <div class="ProfileInfo-profileContent">
                <div class="Profile-MemberNameWrapper">
                    <a href="/mypage/mypage">
                        <span class="Profile-Nickname">
                        <!--member 닉네임 뿌리는 곳-->
                            <span>${memberVO.memberName}</span>
                        </span>
                    </a>
                </div>
                 <!--멤버 성별 받는곳 -->
                <span class="Profile-MemberStat">${memberVO.memberNickname}</span>
              </div>
            `
    $profile.append(text)
    text = "";
}

}
        /*회원가입할때 프로필에 이미지를 저장안해놨다면?*/
else {
    function showProfile() {
        text =
            `
            <!-- 작성자의 프로필 이미지 나오는 곳 -->
              <div class="ProfileInfo-profileImage reviewSection-profile">
                  <a href="">
                      <div class="Image-wrapper">
                      <!-- 유저의 프로필 사진을 가져오는 곳 -->
                      <img class="Image-style" src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png">
                      </div>
                  </a>
              </div>
              <!-- 작성자의 정보가 나오는 곳 -->
              <div class="ProfileInfo-profileContent">
                <div class="Profile-MemberNameWrapper">
                    <a href="/mypage/mypage">
                        <span class="Profile-Nickname">
                        <!--member 닉네임 뿌리는 곳-->
                            <span>${memberVO.memberName}</span>
                        </span>
                    </a>
                </div>
                 <!--멤버 성별 받는곳 -->
                <span class="Profile-MemberStat">${memberVO.memberNickname}</span>
              </div>
            `
        $profile.append(text)
        text = "";
    }
}
/*수정 삭제 뿌리는 함수*/
function showModify() {
    console.log("여기에 들어왔냐??");
    if(review.memberId == sessionId){
        console.log("여기들어오면 session이랑 같은거임");
        text =
            `
              <!--수정 삭제 부분-->
                <a href = "/reviews/${review.reviewId}/modify">
                    <span class="actionSection-title">수정</span>
                </a>
                <span class="actionSection-title deleteButton">삭제</span>
            `
        console.log(text);
        $modify.append(text);
    }
    text = "";
}

/*리뷰 메인 사진 뿌리는 함수*/
if($files[0].reviewFileType == 1){
    function showMiddle() {
        text = `
                <div class="presentationImage-wrapper">
                    <div class="presentationImage-content">
                        <div class="introduceImage-wrapper" >
                        <!-- 메인 이미지가 들어갈 곳 -->
                            <img style="height: 500px; "
                            src="/reviews/display?fileName=${$files[0].reviewFilePath}/${$files[0].reviewFileUuid}_${$files[0].reviewFileOriginalName}">
                        </div>
                    </div>
                </div>
        `
        $mainImg.append(text);
        text="";
    }
}else {
    function showMiddle() {
        text = `
                <div class="presentationImage-wrapper">
                    <div class="presentationImage-content">
                        <div class="introduceImage-wrapper" >
                        <!-- 메인 이미지가 들어갈 곳 -->
                            <img style="height: 500px; "
                            src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png">
                        </div>
                    </div>
                </div>
        `
        $mainImg.append(text);
        text="";
    }
}
/*리뷰 기본 정보 뿌리는 함수*/
function showInfo() {
    text = `
             <article>
                <header class="Article-header">
                    <hgroup>
                        <h2 class="Article-title">결과 소개</h2>
                    </hgroup>
                </header>
                <div class="reviewDetail-point-wrapper">
                    <div>
                        <img class="reviewDetail-star"
                            src="https://media.istockphoto.com/id/1173610414/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EA%B2%8C%EC%9E%84%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A8%EB%93%A0-%EC%8A%A4%ED%83%80-%EC%83%81-%EC%8A%A4%ED%83%80-%EC%8A%A4%ED%83%80-%EC%83%81-3d-%EA%B7%B8%EB%A6%BC.jpg?s=612x612&w=0&k=20&c=EyATks9Ec2CvVfd7RU1sw0yOpJWzYfHqT5SEsXwpmho="
                            alt="★">
                    </div>
                    <!-- 리뷰 만들때 준 reviewGrade가 들어갈 곳 -->
                    <div class="reviewDetail-point">${review.reviewGrade}</div>
                </div>
                <div class="Article-descriptionContainer">
                <!-- 리뷰 작성한 내용이 들어갈 곳 -->
                    <div class="Article-description">${review.reviewContent}</div>
                </div>
             </article>
    `
    $info.append(text);
    text = "";
}
/*리뷰 사진들 뿌리는 곳*/
if($files[0].reviewFileType == 1){
    function images() {
        $files.forEach((file,i) => {
            text +=
                `
                <div class="Images-wrapper">
                    <img class="plusImages"
                        src="/reviews/display?fileName=${$files[i].reviewFilePath}/${$files[i].reviewFileUuid}_${$files[i].reviewFileOriginalName}"
                        alt="test">
                </div>
                `
        })
        $images.append(text);
        text = "";
    }
}else {
    function images() {
        $files.forEach((file,i) => {
            text +=
                `
                <div class="Images-wrapper">
                    <img class="plusImages"
                        src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png"
                        alt="test">
                </div>
                `
        })
        $images.append(text);
        text = "";
    }
}

/*===================================================================================*/

/*화면 뿌리는 함수 사용 쪽*/
showTop();
showProfile();
showModify();
showMiddle();
showInfo();
images();

/*===================================================================================*/

/* 이미지 모달창 가져오기 */

const $modal = $(".modal-Image");
const $closeModal = $(".close-modal");
const $Image = $(".plusImages");
const $modalImage = $(".image-in-modal");
const $imageCount = $(".footer-count");
const $leftButton = $(".left-button");
const $rightButton = $(".right-button");
let currentIndex;


/* 각 이미지를 누르면 나올 모달창 */
$Image.each((i, e) => {
    $(e).click(function () {
        $modal.show();
        $modalImage.attr('src', $(e).attr('src'));
        $imageCount.text(`${i + 1} / ${$Image.length}`);
        currentIndex = i;
        if (currentIndex == 0) {
            $leftButton.hide()
        } else {
            $leftButton.show()
        }
        if (currentIndex == $Image.length - 1) {
            $rightButton.hide()
        } else {
            $rightButton.show()
        }
        console.log(currentIndex)
    })

})

/* 왼쪽 버튼 */

$leftButton.on('click', function () {
    currentIndex = currentIndex - 1;
    $modalImage.attr('src', $Image.eq(currentIndex).attr('src'));
    $imageCount.text(`${currentIndex + 1} / ${$Image.length}`);
    if (currentIndex == 0) {
        $leftButton.hide();
    }
    if (currentIndex != $Image.length - 1) {
        $rightButton.show()
    }
})


/* 오른쪽 버튼 */

$rightButton.on('click', function () {
    currentIndex = currentIndex + 1;
    $modalImage.attr('src', $Image.eq(currentIndex).attr('src'));
    $imageCount.text(`${currentIndex + 1} / ${$Image.length}`);
    if (currentIndex == $Image.length - 1) {
        $rightButton.hide()
    }
    ;
    if (currentIndex != 0) {
        $leftButton.show()
    }
    ;
})

$closeModal.on('click', function () {
    $modal.hide();
})


/* 보고서 삭제 모달 js */

const $delete = $('.deleteButton');
const $deleteButton = $('.delete-button');
const $cancelButton = $('.cancel-button');

/* $('.modal-container').hide(); */

/* 삭제 눌렀을 떄 뜨는 모달창 */
$delete.on('click', function () {
    $('.modal-container').show();
    $('body').css('overflow-y', 'hidden');
    let modalMessage = '<p>정말</p><p>삭제 하시겠습니까?</p>';
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

/* 삭제 컨트롤러 타고 이동해야함 */
$deleteButton.on('click', function () {
    location.href = `/reviews/${review.reviewId}/remove`;
});

/*===================================================================================*/
