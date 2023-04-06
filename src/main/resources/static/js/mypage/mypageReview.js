/* mypageReview.html */

/* 밑에 리뷰들 추가할 장소 */
const $myReviewWrap = $(".mypage-review-list-wrap")
/* 리뷰가 없을 경우 */
const $noReviewWrap = $(".no-myReply");
let text = "";
// reviews = reviews.filter(review => { review.memberId != members.memberId; })

function showMyReview() {
    /* 보고서 자체가 없을때 */
    if(myReviews.length == 0 ) {
        text = `
                    <div class="mypage-review-empty">
                      <img
                        src="data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='80px' height='80px' viewBox='0 0 80 80' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 54.1 (76490) - https://sketchapp.com --%3E %3Ctitle%3E00 Icon/80px/review_empty%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cg id='00-Icon/80px/review_empty' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Crect id='Rectangle' fill-opacity='0' fill='%23FFFFFF' fill-rule='nonzero' x='0' y='0' width='80' height='80'%3E%3C/rect%3E %3Cpath d='M25,24.5 C24.448,24.5 24,24.052 24,23.5 C24,22.948 24.448,22.5 25,22.5 L55,22.5 C55.553,22.5 56,22.948 56,23.5 C56,24.052 55.553,24.5 55,24.5 L25,24.5 Z M37,42.5 C37.552,42.5 38,42.947 38,43.5 C38,44.053 37.552,44.5 37,44.5 L25,44.5 C24.448,44.5 24,44.053 24,43.5 C24,42.947 24.448,42.5 25,42.5 L37,42.5 Z M55.4551,52.0859 L77.3751,30.1659 L68.8901,21.6809 L46.9701,43.6019 L55.4551,52.0859 Z M47.8621,54.3939 L44.6621,51.1929 L43.8621,55.1929 L47.8621,54.3939 Z M45.1341,48.8359 L50.2201,53.9219 L53.7551,53.2149 L45.8411,45.3009 L45.1341,48.8359 Z M67.0001,65.9999 L67.0001,43.3689 L55.4551,54.9149 L44.2541,57.1549 C43.1711,57.3709 42.1171,56.6689 41.9001,55.5859 C41.8501,55.3269 41.8501,55.0609 41.9001,54.8019 L44.1411,43.6019 L53.2421,34.4999 L52.5991,34.4999 L25.0001,34.4999 C24.4481,34.4999 24.0001,34.0519 24.0001,33.4999 C24.0001,32.9479 24.4481,32.4999 25.0001,32.4999 L54.5991,32.4999 L55.0001,32.4999 C55.0711,32.4999 55.1351,32.5259 55.2011,32.5409 L67.0001,20.7419 L67.0001,20.0989 L67.0001,13.9999 C67.0001,12.3429 65.6571,10.9999 64.0001,10.9999 L16.0001,10.9999 C14.3431,10.9999 13.0001,12.3429 13.0001,13.9999 L13.0001,65.9999 C13.0001,67.6569 14.3431,68.9999 16.0001,68.9999 L64.0001,68.9999 C65.6571,68.9999 67.0001,67.6569 67.0001,65.9999 Z M78.7891,28.7519 C79.5701,29.5329 79.5701,30.7989 78.7891,31.5799 L69.0001,41.3689 L69.0001,65.9999 C69.0001,68.7619 66.7621,70.9999 64.0001,70.9999 L16.0001,70.9999 C13.2391,70.9999 11.0001,68.7619 11.0001,65.9999 L11.0001,13.9999 C11.0001,11.2389 13.2391,8.9999 16.0001,8.9999 L64.0001,8.9999 C66.7621,8.9999 69.0001,11.2389 69.0001,13.9999 L69.0001,18.8379 L69.0001,19.6909 C69.4751,19.7179 69.9411,19.9039 70.3041,20.2669 L78.7891,28.7519 Z' id='Combined-Shape' fill='%23DDDDDD'%3E%3C/path%3E %3C/g%3E %3C/svg%3E"
                        class="mypage-reply-empty-icon"
                      />
                      <div class="mypage-review-empty-text">작성된 보고서가 없어요</div>
                    </div>
                `
        $noReviewWrap.append(text)
        /* 보고서가 있을때 */
    } else {
        myReviews.forEach((myreview, i) => {
            text += `
                    <li class="mypage-review-list">
                        <a class="go-review-detail" href="/reviews/detail/${myreview.reviewId}">
                          <div class="review-detail">
                            <div class="review-image-container">
                              <div class="review-image-wrap">`
            if(myreview.reviewFileType == 0) {
                text += `
                        <img
                          alt="2월 말고 두 번째 1월! 썸네일"
                          class="review-image"
                          width="256"
                          src="https://dahanweb.co.kr/gnuboard4/data/file/gall/2949946602_iBjAP3kv_989758.jpg"/>
                        `
            } else {
                text += `
                             <img
                                  alt="2월 말고 두 번째 1월! 썸네일"
                                  class="review-image"
                                  width="256"
                                  src="/reviews/display?fileName=${myreview.reviewFilePath}/${myreview.reviewFileUuid}_${myreview.reviewFileOriginalName}"/>
                             `
            }
            text +=

                `
                              </div>
                            </div>
                            <div class="review-image-content-wrap">
                              <div class="review-category-name">${myreview.reviewCategory}</div>
                              <div class="review-image-content">${myreview.reviewTitle}</div>
                              <div class="review-point-wrapper">
                                <div>
                                  <img
                                    class="review-star"
                                    src="https://media.istockphoto.com/id/1173610414/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EA%B2%8C%EC%9E%84%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A8%EB%93%A0-%EC%8A%A4%ED%83%80-%EC%83%81-%EC%8A%A4%ED%83%80-%EC%8A%A4%ED%83%80-%EC%83%81-3d-%EA%B7%B8%EB%A6%BC.jpg?s=612x612&w=0&k=20&c=EyATks9Ec2CvVfd7RU1sw0yOpJWzYfHqT5SEsXwpmho="
                                    alt="★"
                                  />
                                </div>
                                <div class="review-point">${myreview.reviewGrade}</div>
                              </div>
                            </div>
                          </div>
                        </a>
                    </li>
                `
            $myReviewWrap.html(text)
        })
    }
}
showMyReview();







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


const $changePage = $('.changePage');

// 페이징 클릭 이벤트
$changePage.each(function (i, changePage) {
    $(changePage).on("click", e => {
        e.preventDefault();
        criteria.page = ($(this).attr("href"));
        window.location.href = `/mypage/myReview?page=${criteria.page}`;
    })
});
