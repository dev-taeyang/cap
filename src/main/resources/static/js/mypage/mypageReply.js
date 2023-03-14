/* mypageReply.html */

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

// 페이징 클릭 이벤트
$pageNumber.each((i, e) => {
    $(e).click(function(){
        $pageNumber.removeClass("page-active");
        $(e).addClass("page-active");
        // 마지막 페이지일 때 다음 버튼 비활성화
        if(i == $pageNumber.length - 1){
            $nextButton.css("filter", "invert(0)");
            $nextNextButton.css("filter", "invert(0)");
            return;
        }
        // 첫번째 페이지이고, 페이지 수가 1보다 클 때 다음 버튼 활성화, 이전 버튼 비활성화
        if(i == 0 && $pageNumber.length > 1){
            $nextButton.css("filter", "invert(1)");
            $nextButton.css("cursor", "pointer");
            $nextNextButton.css("filter", "invert(1)");
            $nextNextButton.css("cursor", "pointer");
            $prevButton.css("filter", "invert(0)");
            $prevPrevButton.css("filter", "invert(0)");
            return;
        }
        // 현재 페이지가 페이지 수보다 작다면 이전 버튼, 다음 버튼 활성화
        if(i < $pageNumber.length - 1){
            $prevButton.css("filter", "invert(1)");
            $prevPrevButton.css("filter", "invert(1)");
            $nextButton.css("filter", "invert(1)");
            $nextNextButton.css("filter", "invert(1)");
            return;
        }
    });
});

// 이전, 다음 버튼 클릭했을 때 페이징 처리
/* $nextButton.on("click", function(){
   
}); */