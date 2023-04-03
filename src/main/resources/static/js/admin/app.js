/**
 * ==================================================================================================
 *   DOM
 *   ==================================================================================================
 *
 * @format
 */

/* 사이드바 */
const $sidebar = $('.sidebar__main');
const $sidebarSlide = $('.sidebar__wrapper__slider');
const $sidebarMenu = $('.sidebar__menu');

/* 테이블 내용(컨텐츠) */
const $tableContent = $('.table__content');

/* 체크박스 */
const $checkAll = $('#checkAll');
const $check = $("input[name='check']");

/* 검색조건 select-box */
const $selectBox = $('.listbox-selecter');
const $listbox = $('.listbox');
const $list = $('.list');
const $searchType = $("input[name='searchType']");

/* 검색바 */
const $searchBar = $('.search-input');

/* 상세보기 관련 */
const $detailButton = $('.content__detail__btn');
const $insertButton = $('#insert-button');
const $modalStage = $('.modal-stage');
const $modalInsert = $('.modal-stage-insert');

/* 시게 */
const clock = document.querySelector('.clock h1');

/* 모달창 */


/* 파일 썸네일교체 */
const $storageFile = $("input[name='file']");
const $thumbnail = $(".content__img img");
const $closeButton = $('.closeImgButton');

/* 페이징 */
const $pageNumber = $(".page-number ");

/* input[type=text] 효과 */

const $input = $('.content__intput');


/* ---------------------------- 관리자 공지사항 상세보기 모달 ---------------------------- */

globalThis.noticeId = "";

const $detailButtons = $(".content__detail__btn");

$detailButtons.each((i, button) => {
    $(button).on("click", function (e) {
        globalThis.noticeId = $($(this).parent().parent().children()[1]).text();

        adminService.noticeDetail(noticeId);
    });
});


/* ---------------------------- 관리자 공지사항 ajax 모듈화 ---------------------------- */


let adminService = (function () {
    function noticeDetail(noticeId) {
        $.ajax({
            url: "/admin/admin-detail",
            data: {"noticeId": noticeId},
            success: function (noticeVO) {
            let text = "";
            const $modal = $(".modal__main");

            text +=     `
            <div class="modal__content">
                <div class="content__main">
                    <ul class="content__list__wrap">
                        <li class="content__list">
                            <span>제목</span>
                            <div class="content__intput input_box_shadow">
                                <input type="hidden" name="noticeId" value="${noticeVO.noticeId}">
                                <input type="text" value="${noticeVO.noticeTitle}" class="noticeTitle">
                            </div>
                        </li>
                        <li class="content__list">
                            <span>내용</span>
                            <div class="content__intput input_box_shadow">
                                <input type="text" value="${noticeVO.noticeContent}" class="noticeContent">
                            </div>
                        </li>
                        <li class="content__list">
                            <span>작성자</span>
                            <div class="content__intput input_box_shadow">
                                <input type="text" value="관리자" readonly/>
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
                <div class="user__profile__button">
                    <button type="button" id="completeBtn" class="button__type_2 button__color__green">수정 완료</button>
                </div>
                `;

                $modal.html(text);

                $("#completeBtn").on("click", function(e) {
                    let noticeId = globalThis.noticeId;
                    let noticeTitle = $(".noticeTitle").val();
                    let noticeContent = $(".noticeContent").val();

                    adminService.noticeUpdate(noticeId, noticeTitle, noticeContent);
                });
            }
        })
    }

    function noticeUpdate(noticeId, noticeTitle, noticeContent) {
        $.ajax({
            url: "/admin/admin-update",
            type: "post",
            data: {"noticeId": noticeId, "noticeTitle": noticeTitle, "noticeContent": noticeContent},
            success: function() {
                location.reload();
            }
        });
    }
    return {noticeDetail: noticeDetail, noticeUpdate: noticeUpdate}
})();