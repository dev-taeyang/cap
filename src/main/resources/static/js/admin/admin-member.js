/* admin-member.html */

/* 모달 닫기 */
const $modalCancel = $("#Capa_1");

$modalCancel.on("click", function(e) {
    $(".modal-stage").hide();
});

/* 상세보기 */
globalThis.memberId = "";

$("table.table").on("click", ".content__detail__btn",  function (e) {
    globalThis.memberId = $($(this).parent().parent().children()[1]).text();
    adminMemberService.memberDetail(memberId);
    $(".modal-stage").show();
});

/* ---------------------------- 관리자 회원 삭제 ---------------------------- */


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
        adminMemberService.memberDelete(checkBoxArr[i]);
    }
});

/* ---------------------------- 관리자 회원 목록 ---------------------------- */


function showMemberLists(members) {
    const $append = $(".table");
    let detailCount = 0;
    let text = "";
    let str = "";

    members.forEach(member => {
        detailCount++;
        str = `
                    <tr class="table__header">
                        <th class="content_check">
                            <label class="check-label">
                                <input type="checkbox" id="checkAll" />
                            </label>
                        </th>
                        <th class="content__id">번호</th>
                        <th>ID</th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>생년월일</th>
                        <th></th>
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
                        <td class="content__id">${member.memberId}</td>
                        <td>${member.memberIdentification}</td>
                        <td>${member.memberName}</td>
                        <td>${member.memberEmail}</td>
                        <td>${member.memberBirth}</td>
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
        adminMemberService.getMemberList();
    });
});

/* ---------------------------- 관리자 회원 ajax 모듈화 ---------------------------- */

globalThis.page = 1;

let adminMemberService = (function () {
    function getMemberList() {
        $.ajax({
            url: `/admin/admin/member-list/${page}`,
            success: function(members) {
                showMemberLists(members);
            }
        })
    }

    function memberDetail(memberId) {
        $.ajax({
            url: "/admin/member-detail",
            data: {"memberId": memberId},
            success: function (memberVO) {
                let text = "";
                const $modal = $(".member-detail-modal");
                text += `
            <h4>탐험가 정보</h4>
            <!-- 회원 프로필 이미지 -->
                     `
                if(memberVO.memberFilePath != null) {
                    text += `
                     <div class="content__img">
                        <div class="profile-img-wrapper">
                            <label>
                            <img
                                src="/admin/display?fileName=${memberVO.memberFilePath}/${memberVO.memberFileUuid}_${memberVO.memberFileOriginalName}"
                            />
                            </label>
                        </div>
                    </div>
                     `
                } else{
                    text += `
                     <div class="content__img">
                        <div class="profile-img-wrapper">
                            <label>
                            <img
                                src="/images/profile.png"
                            />
                            </label>
                        </div>
                    </div>
                     `
                }
                text+=   `
                    <input type="file" name="memberFile" style="display: none" />
            <!-- 회원 정보 -->
            <ul class="content__list__wrap">
                <li class="content__list">
                    <span>아이디</span>
                    <div class="content__intput input_box_shadow">
                        <input type="text" value="${memberVO.memberIdentification}" class="memberIdentification"/>
                    </div>
                </li>
                <li class="content__list">
                    <span>이메일</span>
                    <div class="content__intput input_box_shadow">
                        <input type="text" value="${memberVO.memberEmail}" class="memberEmail"/>
                    </div>
                </li>
                <li class="content__list">
                    <span>이름</span>
                    <div class="content__intput input_box_shadow">
                        <input type="text" value="${memberVO.memberName}" class="memberName"/>
                    </div>
                </li>
                <li class="content__list">
                   <span>닉네임</span>
                    <div class="content__intput input_box_shadow">
                        <input type="text" value="${memberVO.memberNickname}" class="memberNickname"/>
                    </div>
                </li>
                <li class="content__list">
                    <span>휴대폰</span>
                    <div class="content__intput input_box_shadow">
                        <input type="text" value="${memberVO.memberPhone}" class="memberPhone"/>
                    </div>
                </li>
                <li class="content__list">
                    <span>생년월일</span>
                    <div class="content__intput input_box_shadow">
                        <input type="text" value="${memberVO.memberBirth}" class="memberBirth"/>
                    </div>
                </li>
                <li class="content__list">
                    <span>성별</span>
                    <div class="content__intput input_box_shadow">
                        <input type="text" value="${memberVO.memberGender}" class="memberGender"/>
                    </div>
                </li>
            </ul>
            <div class="user__profile__button">
                <button
                type="button"
                id="completeBtn"
                class="button__type_2 button__color__green member-update-button"
                >
                수정완료
                </button>
            </div>
                `;
                $modal.empty();
                $modal.html(text);

                $(".member-update-button").on("click", function(e) {
                    let memberVO = new Object();
                    memberVO.memberId = globalThis.memberId;
                    memberVO.memberIdentification = $('.memberIdentification').val();
                    memberVO.memberEmail = $('.memberEmail').val();
                    memberVO.memberName = $('.memberName').val();
                    memberVO.memberNickname = $('.memberNickname').val();
                    memberVO.memberPhone = $('.memberPhone').val();
                    memberVO.memberBirth = $('.memberBirth').val();
                    memberVO.memberGender = $('.memberGender').val();
                    console.log(memberVO);
                    adminMemberService.memberUpdate(memberVO);
                    $(".modal-stage").hide();
                });
            }
        })
    }

    function memberUpdate(memberVO) {
        $.ajax({
            url: "/admin/member-update",
            type: "post",
            data: JSON.stringify(memberVO),
            contentType: "application/json; charset=utf-8",
            success: function() {
                $(".table").empty();
                adminMemberService.getMemberList();
            }
        });
}

    function memberDelete(memberId) {
        $.ajax({
            url: "/admin/member-delete",
            type: "delete",
            data: {"memberId": memberId},
            success: function() {
                let lastIndex = 0;

                if($(".table").children() == null) {
                    globalThis.page--;
                    $(".table").empty();
                    adminMemberService.getMemberList();

                    $pagingList.each((i, li) => {
                        lastIndex = li.length - 1;

                        if(lastIndex == i) {
                            li.remove();
                        }
                    });
                    return;
                }
                $(".table").empty();
                adminMemberService.getMemberList();
            }
        })
    }

    return {getMemberList: getMemberList, memberDetail: memberDetail, memberUpdate: memberUpdate, memberDelete: memberDelete}
})();

adminMemberService.getMemberList();