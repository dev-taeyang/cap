const $ul = $("ul");
const $cateAll = $(".faq-cate");
const $faqTitle = $(".faq-title");
const $faqCotentBox = $(".faq-content-box");
const $faqContent = $(".faq-content");

$ul.each((i, e) =>{
    let $cate = $($cateAll[i]);
    let $li = $($ul[i]).find(".faq-title");
    let $content = $($($ul[i]).find(".faq-content"));
    
    $cate.click(function(){
        $faqTitle.css("font-weight", "600");
        $faqTitle.css("border-bottom","1px solid rgb(230, 230, 230)");
        $faqContent.hide();
        $ul.hide();
        $cateAll.removeClass("faq-cate-active");
        $(this).addClass("faq-cate-active");
        $($ul[i]).show();
    });

    $li.each((j, e) => {

        $(e).click(function(){
            $faqTitle.css("font-weight","600");
            $faqTitle.css("border-bottom","1px solid rgb(230, 230, 230)");
            $content.hide();
            $(this).css("border-bottom", "none");
            $(this).css("font-weight","bold");
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