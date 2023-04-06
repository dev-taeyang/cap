/* admin-review.html */

/* 모달 닫기 */
const $modalCancel = $("#Capa_1");

$modalCancel.on("click", function(e) {
    $(".modal-stage").hide();
});

/* 상세보기 */
globalThis.reviewId = "";

$("table.table").on("click", ".content__detail__btn",  function (e) {
    globalThis.reviewId = $($(this).parent().parent().children()[1]).text();
    adminReviewService.reviewDetail(reviewId);
    $(".modal-stage").show();
});

/* ---------------------------- 관리자 리뷰 삭제 ---------------------------- */


const $removeButton = $("#delete-button");
const $deleteConfirmButton = $("#confirm-delete");
let checkBoxArr = [];

$deleteConfirmButton.on("click", function(e) {
    // const $checkBox = $("input[type=checkbox]");
    var $checkboxes = $('.table__content input[type="checkbox"]');

    $checkboxes.each((i, v) => {
        if(v.checked) {
            checkBoxArr.push($(".content__id").eq(i + 1).text());
        }
    });

    for (let i = 0; i < checkBoxArr.length; i++) {
        adminReviewService.reviewDelete(checkBoxArr[i]);
    }
});

/* ---------------------------- 관리자 리뷰 목록 ---------------------------- */


function showReviewList(reviews) {
    const $append = $(".table");
    let detailCount = 0;
    let text = "";
    let str = "";

    reviews.forEach(review => {
        detailCount++;
        str = `
                    <tr class="table__header">
                         <th class="content_check"></th>
                         <th class="content__id">번호</th>
                         <th>제목</th>
                         <th style="width: 40%">내용</th>
                         <th style="width: 12%">별점</th>
                    </tr>
              `;

        text +=
            `
                    <tr class="table__content">
                        <td>
                            <label class="check-label">
                                <input type="checkbox" name="check" />
                            </label>
                        </td>
                        <td class="content__id">${review.reviewId}</td>
                        <td>${review.reviewTitle}</td>
                        <td>${review.reviewContent}</td>
                        <td>${review.reviewGrade}</td>
                        <td>
                        <button
                        id="detailCount" class="content__detail__btn button__type_2 button__color__green"
                         >
                            상세보기
                        </button>
                        </td>
                    </tr>
              `;
    });
    $append.append(str + text);
}

/* 페이징 처리 */
const $pagingList =  $(".page-number");

$pagingList.each((i, li) => {
    $(li).on("click", function(e) {
        globalThis.page = $(this).text();

        $(".table").empty();
        adminReviewService.getReviewList();
    });
});

/* ---------------------------- 관리자 리뷰 ajax 모듈화 ---------------------------- */

// const $files = review.files;
globalThis.page = 1;

let adminReviewService = (function () {
    function getReviewList() {
        $.ajax({
            url: `/admin/admin/review-list/${page}`,
            success: function(reviews) {
                showReviewList(reviews);
            }
        })
    }

    function reviewDetail(reviewId) {
        $.ajax({
            url: "/admin/review-detail",
            data: {"reviewId": reviewId},
            success: function (reviewFileDTO) {
                let text = "";
                const $modal = $(".review-detail-modal");

                text += `
                    <div class="modal__content">
                         <div class="content__main">
                            <div class="content__img__wrap">
                             <!-- 기존이미지 띄우는 부분 -->
                                <span class="stay-img">*리뷰 사진</span>
                                    <div class="review-img-wrapper">
                                        <label>
                                `
                if(reviewFileDTO.files[0] != null) {
                    reviewFileDTO.files.forEach((file, i) => {
                        text += `
                                        <div class="content__img">
                                            <img
                                            src="/admin/display?fileName=${reviewFileDTO.files[i].reviewFilePath}/${reviewFileDTO.files[i].reviewFileUuid}_${reviewFileDTO.files[i].reviewFileOriginalName}"
                                             />
                                        </div>
                                        <input
                                        type="file"
                                        name="file"
                                        style="display: none"
                                        />
                                 `
                    })
                }else {
                    text += `
                                        <div class="content__img">
                                            <img
                                                src="https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%86%EC%9D%8C-%ED%8F%AC%EB%9F%BC-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%B0%8F-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9A%A9-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C%EC%9E%90.jpg?ver=6"
                                             />
                                        </div>
                                        <input
                                        type="file"
                                        name="file"
                                        style="display: none"
                                        />
                                    </label>
                                    <label>
                                        <div class="content__img">
                                            <img
                                                src="https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%86%EC%9D%8C-%ED%8F%AC%EB%9F%BC-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%B0%8F-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9A%A9-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C%EC%9E%90.jpg?ver=6"
                                             />
                                        </div>
                                        <input
                                        type="file"
                                        name="file"
                                        style="display: none"
                                        />
                                    </label>
                                    <label>
                                        <div class="content__img">
                                            <img
                                                src="https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%86%EC%9D%8C-%ED%8F%AC%EB%9F%BC-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%B0%8F-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9A%A9-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C%EC%9E%90.jpg?ver=6"
                                             />
                                        </div>
                                        <input
                                        type="file"
                                        name="file"
                                        style="display: none"
                                        />
                                    </label>
                                    <label>
                                        <div class="content__img">
                                            <img
                                                src="https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%86%EC%9D%8C-%ED%8F%AC%EB%9F%BC-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%B0%8F-%EC%9B%B9%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%9A%A9-%EC%9E%90%EB%A6%AC-%ED%91%9C%EC%8B%9C%EC%9E%90.jpg?ver=6"
                                             />
                                        </div>
                                        <input
                                        type="file"
                                        name="file"
                                        style="display: none"
                                        />
                                 `
                }

                text += `
                        </label>
                                 </div>
                         <!-- ========================================================== -->
                         <!-- 상세보기 입력 부분 -->
                         <ul class="content__list__wrap">
                             <li class="content__list">
                                <span>제목</span>
                                <div class="content__intput input_box_shadow">
                                    <input type="text" value="${reviewFileDTO.reviewTitle}" class="reviewTitle"/>
                                </div>
                             </li>
                             <li class="content__list">
                                <span>내용</span>
                                <div class="content__intput input_box_shadow">
                                    <textarea cols="30" rows="10" class="reviewContent">${reviewFileDTO.reviewContent}</textarea>
                                </div>
                             </li>
                             <li class="content__list">
                                <span>별점</span>
                                <div class="content__intput input_box_shadow">
                                    <input type="text" value="${reviewFileDTO.reviewGrade}" class="reviewGrade"/>
                                </div>
                             </li>
                             <li class="content__list">
                                <span>등록일</span>
                                <div class="content__intput input_box_shadow">
                                    <input type="text" value="${reviewFileDTO.reviewRegisterDate}" class="reviewRegisterDate"/>
                                </div>
                             </li>
                         </ul>
                     </div>
                 </div>
                             <!-- 모달에서 수정완료 버튼 -->
                 <div class="user__profile__button">
                     <button
                        id="completeBtn"
                        class="button__type_2 button__color__green review-update-button"
                     >
                     수정완료
                     </button>
                 </div>
                `;
                $modal.empty();
                $modal.html(text);

                $(".review-update-button").on("click", function(e) {
                    let reviewVO = new Object();
                    reviewVO.reviewId = globalThis.reviewId;
                    reviewVO.reviewTitle = $('.reviewTitle').val();
                    reviewVO.reviewContent = $('.reviewContent').val();
                    reviewVO.reviewGrade = $('.reviewGrade').val();
                    reviewVO.reviewRegisterDate = $('.reviewRegisterDate').val();
                    console.log(reviewVO);
                    adminReviewService.reviewUpdate(reviewVO);
                    $(".modal-stage").hide();
                });
            }
        })
    }

    function reviewUpdate(reviewVO) {
        $.ajax({
            url: "/admin/review-update",
            type: "post",
            data: JSON.stringify(reviewVO),
            contentType: "application/json; charset=utf-8",
            success: function() {
                $(".table").empty();
                adminReviewService.getReviewList();
            }
        });
    }

    function reviewDelete(reviewId) {
        $.ajax({
            url: "/admin/review-delete",
            type: "delete",
            data: {"reviewId": reviewId},
            success: function() {
                let lastIndex = 0;

                if($(".table").children() == null) {
                    globalThis.page--;
                    $(".table").empty();
                    adminReviewService.getReviewList();

                    $pagingList.each((i, li) => {
                        lastIndex = li.length - 1;

                        if(lastIndex == i) {
                            li.remove();
                        }
                    });
                    return;
                }
                $(".table").empty();
                adminReviewService.getReviewList();
            }
        })
    }

    return {getReviewList: getReviewList, reviewDetail: reviewDetail, reviewUpdate: reviewUpdate, reviewDelete: reviewDelete}
})();

adminReviewService.getReviewList();
