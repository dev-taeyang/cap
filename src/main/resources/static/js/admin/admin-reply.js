/* admin-reply.html */

/* ---------------------------- 관리자 공지사항 상세보기 모달 닫기 ---------------------------- */


const $modalCancel = $("#Capa_1");

$modalCancel.on("click", function(e) {
    $(".modal-stage").fadeOut(500);
});


/* ---------------------------- 관리자 공지사항 상세보기 모달 ---------------------------- */


globalThis.groupReplyId = "";

$("table.table").on("click", ".content__detail__btn",  function (e) {
    globalThis.groupReplyId = $($(this).parent().parent().children()[1]).text();
    adminGroupReplyService.groupReplyDetail(groupReplyId);
    $(".modal-stage").show();
});

/* ---------------------------- 관리자 공지사항 삭제 ---------------------------- */


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
        adminGroupReplyService.groupReplyDelete(checkBoxArr[i]);
    }
});

/* ---------------------------- 관리자 공지사항 목록 ---------------------------- */


function showGroupReplyList(groupReplies) {
    const $append = $(".table");
    let detailCount = 0;
    let text = "";
    let str = "";

    groupReplies.forEach(reply => {
        detailCount++;
        str = `
                    <tr class="table__header">
                        <th class="content_check">
                            <label class="check-label">
                                <input type="checkbox" id="checkAll" />
                            </label>
                        </th>
                        <th class="content__id">번호</th>
                        <th>탐험대</th>
                        <th style="width: 35%">내용</th>
                        <th>작성자</th>
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
                        <td class="content__id">${reply.groupReplyId}</td>
                        <td>${reply.groupName}</td>
                        <td>${reply.groupReplyContent}</td>
                        <td>${reply.memberName}</td>
                        <td>
                            <button
                                class="content__detail__btn button__type_2 button__color__green"
                            >
                                상세보기
                            </button>
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
        adminGroupReplyService.getGroupReplyList();
    });
});


/* ---------------------------- 관리자 공지사항 ajax 모듈화 ---------------------------- */


globalThis.page = 1;

let adminGroupReplyService = (function () {
    function getGroupReplyList() {
        $.ajax({
            url: `/admin/admin-group-reply-list/${page}`,
            success: function(groupReplies) {
                showGroupReplyList(groupReplies);
            }
        })
    }

    function groupReplyDetail(groupReplyId) {
        $.ajax({
            url: "/admin/group-reply-detail",
            data: {"groupReplyId": groupReplyId},
            success: function (groupReplyDTO) {
                let text = "";
                const $modal = $(".detail-modal");

                text +=  `
                    <div class="modal__content">
                                <div class="content__main">
                                    <ul class="content__list__wrap">
                                        <li class="content__list">
                                            <span>제목</span>
                                            <div class="content__intput input_box_shadow">
                                                <input type="text" value="${groupReplyDTO.groupName}" class="groupName"/>
                                            </div>
                                        </li>
                                        <li class="content__list">
                                            <span>내용</span>
                                            <div class="content__intput input_box_shadow">
                                                <input type="text" value="${groupReplyDTO.groupReplyContent}" class="groupReplyContent"/>
                                            </div>
                                        </li>
                                        <li class="content__list">
                                            <span>작성자</span>
                                            <div class="content__intput input_box_shadow">
                                                <input type="text" value="${groupReplyDTO.memberName}" class="memberName"/>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="user__profile__button">
                                <button
                                    id="completeBtn"
                                    class="button__type_2 button__color__green"
                                >
                                    수정 완료
                                </button>
                            </div>
                `;
                $modal.empty();
                $modal.html(text);

                /* 수정 완료 통신 */
                $("#completeBtn").on("click", function(e) {
                    let groupReplyDTO = new Object();
                    groupReplyDTO.groupReplyId = globalThis.groupReplyId;
                    groupReplyDTO.groupName = $('.groupName').val();
                    groupReplyDTO.groupReplyContent = $('.groupReplyContent').val();
                    groupReplyDTO.memberName = $('.memberName').val();
                    console.log(groupReplyDTO);
                    adminGroupReplyService.groupReplyUpdate(groupReplyDTO);
                    $(".modal-stage").hide();
                });
            }
        })
    }

    function groupReplyUpdate(groupReplyDTO) {
        $.ajax({
            url: "/admin/admin/group-reply-update",
            type: "post",
            data: JSON.stringify(groupReplyDTO),
            contentType: "application/json; charset=utf-8",
            success: function() {
                $(".table").empty();
                adminGroupReplyService.getGroupReplyList();
            }
        });
    }

    function groupReplyDelete(groupReplyId) {
        $.ajax({
            url: "/admin/admin/group-reply-delete",
            type: "delete",
            data: {"groupReplyId": groupReplyId},
            success: function() {
                let lastIndex = 0;

                if($(".table").children() == null) {
                    globalThis.page--;
                    $(".table").empty();
                    adminGroupReplyService.getGroupReplyList();

                    $pagingList.each((i, li) => {
                        lastIndex = li.length - 1;

                        if(lastIndex == i) {
                            li.remove();
                        }
                    });
                    return;
                }
                $(".table").empty();
                adminGroupReplyService.getGroupReplyList();
            }
        })
    }
    return {getGroupReplyList: getGroupReplyList, groupReplyDetail: groupReplyDetail, groupReplyUpdate: groupReplyUpdate, groupReplyDelete: groupReplyDelete}
})();

adminGroupReplyService.getGroupReplyList();    // 페이지 요청 시 가져올 목록