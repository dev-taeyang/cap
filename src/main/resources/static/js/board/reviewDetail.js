
/* 이미지 모달창 가져오기 */

const $modal = $(".modal-Image");
const $close = $(".close-modal");
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

$close.on('click', function(){
    $modal.hide();
})
