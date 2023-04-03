const $pageNumber = $(".page-number");
const $prevButton = $(".prev-button img");
const $prevPrevButton = $(".prev-prev-button img");
const $nextButton = $(".next-button img");
const $nextNextButton = $(".next-next-button img");

// 페이지 수가 1보다 크다면 다음 버튼 활성화
if($pageNumber.length > 1){
    $nextButton.css("filter", "invert(1)");
    $nextNextButton.css("filter", "invert(1)");
    $nextButton.css("cursor", "pointer");
    $nextNextButton.css("cursor", "pointer");
}

if($pageNumber.length > 1){
    $prevButton.css("filter", "invert(1)");
    $prevPrevButton.css("filter", "invert(1)");
    $prevButton.css("cursor", "pointer");
    $prevPrevButton.css("cursor", "pointer");
}


// 페이징 클릭 이벤트
$pageNumber.each((i, e) => {
    $(e).click(function(){
        $pageNumber.removeClass("page-active");
        $(e).addClass("page-active");
    });
});