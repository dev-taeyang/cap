
/* 이미지 모달창 가져오기 */

const $modal = $(".modal-Image");
const $close = $(".close-modal");
const $Image = $(".plusImages");
const $modalImage = $(".image-in-modal");
const $imageCount = $(".footer-count");
const $leftButton = $(".left-button");
const $rightButton = $(".right-button");


console.log($Image);

$Image.each((i,e) => {
    $(e).click(function(){
        $modal.show();
        $modalImage.attr('src', $(e).attr('src'));
        $imageCount.text(`${i + 1} / ${$Image.length}`);
        $index = $Image.index($(this))

    })
    
    $leftButton.on('click', function(){
        console.log($index);
    })

    
})

$close.on('click', function(){
    $modal.hide();
})
