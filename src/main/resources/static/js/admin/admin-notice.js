/* admin-notice.html */


/* ---------------------------- 관리자 공지사항 상세보기 모달 닫기 ---------------------------- */


const $modalCancel = $("#Capa_1");

$modalCancel.on("click", function(e) {
    $(".modal-stage").fadeOut(500);
});


/* ---------------------------- 관리자 공지사항 상세보기 모달 ---------------------------- */


globalThis.noticeId = "";

$("table.table").on("click", ".content__detail__btn",  function (e) {
    globalThis.noticeId = $($(this).parent().parent().children()[1]).text();
    adminService.noticeDetail(noticeId);
    $(".modal-stage").show();
});


/* ---------------------------- 관리자 공지사항 작성 버튼 이벤트 ---------------------------- */


const $writeConfirmButton = $(".write-modal");

$writeConfirmButton.on("click", ".notice-write-button", function(e) {
    let noticeTitle = $(".noticeTitle").val();
    let noticeContent = $(".noticeContent").val();

    if(noticeTitle != null && noticeContent != null) {
        adminService.noticeWrite(noticeTitle, noticeContent);
    }
});


/* ---------------------------- 관리자 공지사항 삭제 ---------------------------- */


const $removeButton = $("#delete-button");
const $deleteConfirmButton = $("#confirm-delete");
let checkBoxArr = [];

$deleteConfirmButton.on("click", function(e) {
    var $checkboxes = $('.table__content input[type="checkbox"]');

    $checkboxes.each((i, v) => {
        if(v.checked) {
            checkBoxArr.push($(".content__id").eq(i + 1).text());
        }
    });

    for (let i = 0; i < checkBoxArr.length; i++) {
        adminService.noticeDelete(checkBoxArr[i]);
    }
});


/* ---------------------------- 관리자 공지사항 공지 추가 버튼 이벤트 ---------------------------- */


const $writeButton = $("#insert-button");

$writeButton.on("click", function(e) {
    $(".detail-modal").empty();
    getWriteModal();
});


/* ---------------------------- 관리자 공지사항 공지 추가 모달 ---------------------------- */


function getWriteModal() {
    const $writeModal = $(".write-modal");
    let text = "";

    text += `

                <div class="modal__content">
                    <div class="content__main">
                        <ul class="content__list__wrap">
                            <li class="content__list">
                                <span>제목</span>
                                <div class="content__intput input_box_shadow">
                                    <input type="text" class="noticeTitle"/>
                                </div>
                            </li>
                            <li class="content__list">
                                <span>내용</span>
                                <div class="content__intput input_box_shadow">
                                    <input type="text" class="noticeContent"/>
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
                    <button id="completeBtn" class="button__type_2 button__color__green notice-write-button">작성완료</button>
                </div>
    
            `;
    $writeModal.empty();
    $writeModal.append(text);
}


/* ---------------------------- 관리자 공지사항 목록 ---------------------------- */


function showLists(notices) {
    const $append = $(".table");
    let detailCount = 0;
    let text = "";
    let str = "";

    notices.forEach(notice => {
        detailCount++;
        str = `
                    <tr class="table__header">
                        <th class="content_check">
                            <!--<label class="check-label">
                                <input type="checkbox" id="checkAll" />
                            </label>-->
                        </th>
                        
                        <th class="content__id">번호</th>
                        <th>제목</th>
                        <th style="width: 35%">내용</th>
                        <th>작성자</th>
                    </tr>
              `;

        text +=
            `
                    <tr class="table__content">
                        <td>
                            <label class="check-label">
                                <input type="checkbox" name="check"/>
                            </label>
                        </td>
                        <td class="content__id">${notice.noticeId}</td>
                        <td>${notice.noticeTitle}</td>
                        <td style="white-space: pre-wrap; text-overflow: ellipsis;">${notice.noticeContent}</td>
                        <td>관리자</td>
                        <td>
                            <button id=detailCount class="content__detail__btn button__type_2 button__color__green">상세보기</button>
                        </td>
                    </tr>
              `;
    });
    $append.append(str + text);
}


/* ---------------------------- 관리자 공지사항 목록 페이징 이벤트 ---------------------------- */


const $pagingList =  $(".page-number");

$pagingList.each((i, li) => {
    $(li).on("click", function(e) {
        globalThis.page = $(this).text();

        $(".table").empty();
        adminService.getLists();
    });
});


/* ---------------------------- 관리자 공지사항 ajax 모듈화 ---------------------------- */


globalThis.page = 1;

let adminService = (function () {
    function getLists() {
        $.ajax({
            url: `/admin/admin/admin-list/${globalThis.page}`,
            success: function(notices) {
                showLists(notices);
            }
        })
    }

    function noticeDetail(noticeId) {
        $.ajax({
            url: "/admin/admin-detail",
            data: {"noticeId": noticeId},
            success: function (noticeVO) {
                let text = "";
                const $modal = $(".detail-modal");

                text +=  `
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
<!--                                        <input type="text" value="${noticeVO.noticeContent}" class="noticeContent">-->
                                            <textarea cols="30" rows="10" class="noticeContent">${noticeVO.noticeContent}</textarea>
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
                $modal.empty();
                $modal.html(text);

                /* 수정 완료 통신 */
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
                $(".table").empty();
                adminService.getLists();
            }
        });
    }

    function noticeWrite(noticeTitle, noticeContent) {
        $.ajax({
            url: "/admin/admin-write",
            type: "post",
            data: {"noticeTitle": noticeTitle, "noticeContent": noticeContent},
            success: function() {
                $(".table").empty();
                $(".modal-stage").fadeOut(500);
                adminService.getLists();
            }
        })
    }

    function noticeDelete(noticeId) {
        $.ajax({
            url: "/admin/admin-delete",
            type: "delete",
            data: {"noticeId": noticeId},
            success: function() {
                if($(".table").children() == null) {
                    globalThis.page--;
                    $(".table").empty();
                    adminService.getLists();
                    return;
                }
                $(".table").empty();
                adminService.getLists();
                location.reload();
            }
        })
    }
    return {getLists: getLists, noticeDetail: noticeDetail, noticeUpdate: noticeUpdate, noticeWrite: noticeWrite, noticeDelete: noticeDelete}
})();

adminService.getLists();    // 페이지 요청 시 가져올 목록