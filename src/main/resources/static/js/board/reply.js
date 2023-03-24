

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


/* 댓글 삭제 모달 js */

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
    location.href = '';
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

$ActionModify.each((i, e) => {
  $(e).click(function(){
    location.href ='';
  })
})

