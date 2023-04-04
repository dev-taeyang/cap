
const $ImageWrapper = $(".Image-wrapper");
let contents = "";

function showMemberProfile() {
    if(member.memberFilePath == 0) {
        contents = `
             <!-- 유저의 프로필 사진을 가져오는 곳 -->
             <img class="Image-style" src="https://k.kakaocdn.net/dn/bsSATJ/btry9gwkdhb/Y5L6OyBllzjAkOOMFYupF0/img_110x110.jpg">
        `
    } else {
        contents = `
            <!-- 유저의 프로필 사진을 가져오는 곳 -->
            <img class="Image-style" src="/mypage/display?fileName=${member.memberFilePath}/${member.memberFileUuid}_${member.memberFileOriginalName}">
        `
    }
    $ImageWrapper.append(contents)
}
showMemberProfile();


const $ReplyWrapper = $(".boardReplyList-wrapper");
let text = "";

function showReplyList() {
    replies.forEach((reply, i) => {
        text += `
            <!-- 댓글 리스트 -->
            <div class="ReplyContent-Section">
                <div class="ReplyContent-wrapper">
                    <div class="replyContent-profile">
                        <div class="Image-wrapper">
                `
        if(reply.memberFileType == 0) {
            text += `
                            <!-- 유저의 프로필 사진을 가져오는 곳 -->
                           <img class="Image-style" src="https://k.kakaocdn.net/dn/bsSATJ/btry9gwkdhb/Y5L6OyBllzjAkOOMFYupF0/img_110x110.jpg">
                            `
        } else {
            text += `
                            <!-- 유저의 프로필 사진을 가져오는 곳 -->
                           <img class="Image-style" src="/mypage/display?fileName=${reply.memberFilePath}/${reply.memberFileUuid}_${reply.memberFileOriginalName}">
                        `
        }
        text +=
            `
                       </div>
                    </div>
                    <div class="ReplyContent-container">
                        <!-- 유저의 닉네임이 들어갈 곳 -->
                        <div class="replyContent-member">${reply.memberNickname}</div>
                        <!-- 작성한 댓글이 들어갈 곳 -->
                        <p class="replyContent-comment">${reply.groupReplyContent}</p>
                        <section class="actionGroup-section">
                            <!-- 댓글 작성 시간 넣을 곳 -->
                            <p class="actionMenu-time">`+ elapsedTime(reply.groupReplyUpdateDate) +`</p>`
        if(reply.memberId == member.memberId) {
            text += `
                            <!-- 삭제 버튼 -->
                            <button class="actionMenu-button deleteButton">삭제</button>
                            <!-- 수정 버튼 -->
                            <button class="actionMenu-button modifyButton">수정</button>
                            `
        }
        text +=
            `
                        </section>
                    </div>
                </div>
            </div>
            <!-- 댓글 수정용 폼 나오는 곳 -->
            <div class="ModifyReply-Section" style="display: none;">
                <div class="ReplyContent-wrapper">
                    <div class="replyContent-profile">
                        <div class="Image-wrapper">
                `
        if(reply.memberFileType == 0) {
            text += `
                                <!-- 유저의 프로필 사진을 가져오는 곳 -->
                               <img class="Image-style" src="https://k.kakaocdn.net/dn/bsSATJ/btry9gwkdhb/Y5L6OyBllzjAkOOMFYupF0/img_110x110.jpg">
                                            `
        } else {
            text += `
                               <!-- 유저의 프로필 사진을 가져오는 곳 -->
                               <img class="Image-style" src="/mypage/display?fileName=${reply.memberFilePath}/${reply.memberFileUuid}_${reply.memberFileOriginalName}">
                                        `
        }
        text +=
            `        
                       </div>
                    </div>
                    <div class="ReplyContent-container">
                        <!-- 유저의 닉네임이 들어갈 곳 -->
                        <div class="ModifySection-wrapper">
                            <div class="replyContent-member">${reply.memberNickname}</div>
                            <div class="ModifyAction-wrapper">
                                <button class="ReplyModify-action registModify">수정</button>
                                <button class="ReplyModify-action cancelModify">취소</button>
                            </div>
                        </div>
                        <!-- 작성한 댓글이 들어갈 곳 -->
                        <textarea name="groupReplyContent" class="modifyReply-area">${reply.groupReplyContent}</textarea>
                    </div>
                </div>
            </div>
        `
    })
    $ReplyWrapper.append(text)
}
showReplyList();



/* input 에 글을 적으면 등록 버튼 활성화 */

const $RegistButton = $('.TextAreaSection-submitButton');
const $TextArea = $('.TextAreaSection-textWrite');

$TextArea.on('keydown', function(){
    let value = $(this).val();

    if(value) {
        $RegistButton.attr('disabled', false);
    } else {
        $RegistButton.attr('disabled', true);
    }
});



const $insertButton = $(".TextAreaSection-submitButton");

$insertButton.on("click", function () {
    let $groupReplyContent = $(".TextAreaSection-textWrite").val();

    let groupReplyVO = new Object();
    groupReplyVO.memberId = member.memberId;
    groupReplyVO.groupReplyContent = $groupReplyContent;
    groupReplyVO.groupId = groupId;


    $.ajax({
        url: "/replies/insert",
        type: "POST",
        data: JSON.stringify(groupReplyVO),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function () {
        }
    })
    location.href = `/replies/list/${groupId}`
})



/* 댓글 삭제 모달 js */

const $delete = $('.deleteButton');
const $deleteButton = $('.delete-button');
const $cancelButton = $('.cancel-button');


/* 각자 있는 삭제 버튼 눌렀을 떄 뜨는 모달창 */
$delete.each((i,e) => {
    $(e).click(function () {
        $('.modal-container').show();
        $('body').css('overflow-y', 'hidden');
        let modalMessage = '<p>정말</p><p>삭제 하시겠습니까?</p>';
        showWarnModal(modalMessage);

        /* 모달창 안에 있는 삭제 버튼을 누르면 */
        $deleteButton.on('click', function () {
            let replyId = replies[i].groupReplyId
            $.ajax({
                url: "/replies/delete",
                type: "POST",
                data: {groupReplyId: replyId},
                success: function () {
                    $('.modal-container').hide();
                    modalMessage = '삭제가 완료되었습니다.';
                    showTextModal(modalMessage);
                }
            })
        });
    })
})



function showWarnModal(modalMessage) {
    $('.modal-content').html(modalMessage);
    $('.warn-modal').css('animation', 'popUp 0.5s');
    $('.modal-container').css('display', 'flex').hide().fadeIn(500);
    setTimeout(function () {
    }, 500);
}

/* 모달 내리기 */
$cancelButton.on('click', function () {
    $('.warn-modal').css('animation', 'popDown 0.5s');
    $('.modal-container').fadeOut(500);
    $('body').css('overflow-y', 'scroll');
});

$(".text-modal").hide();

/* 아래쪽에 뜨는 모달창 */
let modalCheck;
function showTextModal(modalMessage) {
    modalCheck = false;
    $('div.text-modal-content').html(modalMessage);
    $('div.text-warn-modal').css('animation', 'popUp 0.5s');
    $('div.text-modal').css('display', 'flex').hide().fadeIn(500);
    setTimeout(function () {
        modalCheck = true;
    }, 500);
}

$('#replyContainer').on('click', function () {
    if (modalCheck) {
        $('div.text-warn-modal').css('animation', 'popDown 0.5s');
        $('div.text-modal').fadeOut(500);
    }
});


/* 댓글에 있는 수정 버튼 */
const $ModifyButton = $('.modifyButton');
/* 댓글 섹션 */
const $ReplySection = $('.ReplyContent-Section');
/* 수정용 폼 섹션 */
const $ModifySection = $('.ModifyReply-Section');

/* 수정용 폼의 수정 버튼 */
const $ActionModify = $('.registModify');

/* 수정용 폼의 취소 버튼 */
const $ActionCancel = $('.cancelModify');


$ModifyButton.each((i, e) => {
    $(e).click(function(){
        $ReplySection.eq(i).hide();
        $ModifySection.eq(i).show();
    })
});

$ActionCancel.each((i, e) => {
    $(e).click(function(){
        $ModifySection.eq(i).hide();
        $ReplySection.eq(i).show();
    })
})

/* 수정용 폼에 있는 수정버튼을 눌렀을 때 */
$ActionModify.each((i, e) => {
    $(e).click(function(){
        let groupReplyId = replies[i].groupReplyId
        let replyContent = $(".modifyReply-area").eq(i).val()

        let groupReplyVO = new Object();
        groupReplyVO.groupReplyId = groupReplyId
        groupReplyVO.groupReplyContent = replyContent

        $.ajax({
            url: "/replies/update",
            type: "post",
            data: JSON.stringify(groupReplyVO),
            contentType: "application/json; charset=utf-8",
            success: function () {
                $ModifySection.eq(i).hide();
                $ReplySection.eq(i).show();
                let modalMessage = '수정이 완료되었습니다.';
                showTextModal(modalMessage);
            }

        })
    })
})
