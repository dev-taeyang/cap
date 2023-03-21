
/* 이미지 모달창 가져오기 */

const $modal = $(".modal-Image");
const $close = $(".close-modal");
const $Image = $(".plusImages");
const $modalImage = $(".image-in-modal");
const $imageCount = $(".footer-count");

console.log($Image);
console.log($modalImage.attr('src'));
console.log($imageCount.text());

$Image.each((i,e) => {
    $(e).click(function(){
        $modal.show();
        $modalImage.attr('src', $(e).attr('src'));
        $imageCount.text(`${i + 1} / ${$Image.length}`);
    })
})

$close.on('click', function(){
    $modal.hide();
})