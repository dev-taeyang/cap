
/* 이미지 모달창 가져오기 */

const $modal = $(".modal-Image");
const $closeModal = $(".close-modal");
const $Image = $(".plusImages");
const $modalImage = $(".image-in-modal");
const $imageCount = $(".footer-count");
const $leftButton = $(".left-button");
const $rightButton = $(".right-button");


console.log($Image);
let currentIndex;


/* 각 이미지를 누르면 나올 모달창 */
$Image.each((i,e) => {
    $(e).click(function(){
        $modal.show();
        $modalImage.attr('src', $(e).attr('src'));
        $imageCount.text(`${i + 1} / ${$Image.length}`);
        currentIndex = i;
        if(currentIndex == 0) {$leftButton.hide()} else {$leftButton.show()}
        if(currentIndex == $Image.length - 1) {$rightButton.hide()} else {$rightButton.show()}
        console.log(currentIndex)
    }) 
    
})

/* 왼쪽 버튼 */

$leftButton.on('click', function(){
    currentIndex = currentIndex - 1;
    $modalImage.attr('src', $Image.eq(currentIndex).attr('src'));
    $imageCount.text(`${currentIndex + 1} / ${$Image.length}`);
    if(currentIndex == 0) { $leftButton.hide(); }
    if(currentIndex != $Image.length - 1) {$rightButton.show()}
})


/* 오른쪽 버튼 */

$rightButton.on('click', function(){
    currentIndex = currentIndex + 1;
    $modalImage.attr('src', $Image.eq(currentIndex).attr('src'));
    $imageCount.text(`${currentIndex + 1} / ${$Image.length}`);
    if(currentIndex == $Image.length - 1) {$rightButton.hide()};
    if(currentIndex != 0) {$leftButton.show()};
})

$closeModal.on('click', function(){
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
/*화면 뿌리는 곳*/
//
// const $header = $(".reviewHeader");
// let text = "";
// function showDetail() {
//
// }


