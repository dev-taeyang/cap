/* header JS */

/* x 버튼 눌렀을때 탑배너 없애기 */
const $close = $(".header-banner-btn");
const $top = $(".header-banner-section");
const $font = $(".left-title");
const $navi = $(".header-navi-section");

$close.on("click", function(){
    $top.slideUp(300);
    $navi.css("background-color","#42861F")
    $font.css("color", "white");
    $font.css("font-weight", "bold");
});