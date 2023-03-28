/*review List Js*/

const $reviewWrap = $(".mypage-review-list-wrap");
let text = "";

function showList() {
    reviews.forEach(review => {
        console.log(review.toString());
        console.log(review.reviewCategory);
        console.log(review.reviewContent);
        console.log(review.reviewGrade);
        text +=
            `
            <li class="mypage-review-list">
                      <a class="go-review-detail" href="/reviews/detail/${review.reviewId}"
                        ><div class="review-detail">
                          <div class="review-image-container">
                            <div class="review-image-wrap">
                              <!-- 보고서 작성의 첫번째 이미지가 들어갈 곳 -->
                              <img
                                alt="2월 말고 두 번째 1월! 썸네일"
                                class="review-image"
                                width="256"
                                src="https://res.cloudinary.com/frientrip/image/upload/ar_101:80,c_fill,dpr_2,f_auto,q_auto,w_310/product_banner_1676286117596_662715"
                              />
                            </div>
                          </div>
                          <div class="review-image-content-wrap">
                            <!-- 보고서의 카테고리 내용이 들어갈 곳 -->
                            <div class="review-category-name">${review.reviewCategory}</div>
                            <!-- 보고서의 제목이 들어가는 곳 -->
                            <div class="review-image-title">${review.reviewTitle}</div>
                            <div class="review-image-content">${review.reviewContent}</div>
                            <div class="review-point-wrapper">
                              <div>
                                <img class="review-star" src="https://media.istockphoto.com/id/1173610414/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EA%B2%8C%EC%9E%84%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A8%EB%93%A0-%EC%8A%A4%ED%83%80-%EC%83%81-%EC%8A%A4%ED%83%80-%EC%8A%A4%ED%83%80-%EC%83%81-3d-%EA%B7%B8%EB%A6%BC.jpg?s=612x612&w=0&k=20&c=EyATks9Ec2CvVfd7RU1sw0yOpJWzYfHqT5SEsXwpmho=" alt="★">
                              </div>
                              <!-- 보고서 평점이 들어갈 곳 -->
                              <div class="review-point">${review.reviewGrade}</div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
        `
    });
    $reviewWrap.append(text);
}
showList();