
/* 카테고리 버튼 누르기 */
const $Category = $(".CategoryItem");

$Category.each((i, e) => {
    $(e).click(function(){
        $Category.removeClass("CategoryActive");
        $(e).addClass("CategoryActive");

    })
})


/* 더보기 버튼 누르기 */
const $expand = $(".Description-ExpandButton");
const $textBox = $(".TextLine-Description");

$expand.each((i, e) => {
    $(e).click(function(){
        $textBox.eq(i).css('display', 'contents');
        $(this).hide();
    })
})