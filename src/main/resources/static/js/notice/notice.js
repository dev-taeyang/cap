const $ul = $("ul");
const $cateAll = $(".notice-cate");
const $noticeTitle = $(".notice-title");
const $noticeCotentBox = $(".notice-content-box");
const $noticeContent = $(".notice-content");

$ul.each((i, e) =>{
    let $cate = $($cateAll[i]);
    let $li = $($ul[i]).find(".notice-title");
    let $content = $($($ul[i]).find(".notice-content"));
    
    $li.each((j, e) => {

        $(e).click(function(){
            $noticeTitle.css("font-weight", "600");
            $noticeCotentBox.css("border-bottom","1px solid rgb(230, 230, 230)");
            $content.hide();
            $(e).css("font-weight","bold");
            $($noticeCotentBox[j]).css("border-bottom", "none");
            $($content[j]).show();
        });
    });
});

const $pageNumber = $(".page-number ");

$pageNumber.each((i, e) => {
    $(e).click(function(){
        $pageNumber.removeClass("page-active");
        $(e).addClass("page-active");
    });
});