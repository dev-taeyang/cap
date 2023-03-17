


// 주소 입력 관련

window.onload = function(){
    document.getElementById("address-kakao").addEventListener("click", function(){ //주소입력칸을 클릭하면
        //카카오 지도 발생
        new daum.Postcode({
            oncomplete: function(data) { //선택시 입력값 세팅
                document.getElementById("address-kakao").value = data.address; // 주소 넣기
            }
        }).open();
    });
}


/* 파일 집어넣기 용 */
const $file = $("input[type='file']");
const $imgStatus = $(".imgStatus");
const $imgShow = $(".showThumbnail-section");
const $cancel = $(".cancelImage");
const $input = $("#attach");



/* 이미지 파일 업로드 */
$file.on('change', function(e) {
    let reader = new FileReader();
    $imgStatus.text("이미지 변경하기");
    $cancel.css('display', 'block');
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(e) {
        let result = e.target.result;
        if(result.includes('image')) {
            $imgShow.css('backgroundImage', `url('${result}')`);
        } else {
            $imgShow.css('backgroundImage', `url('/src/main/resources/static/images/favicon.png')`);
        }
    };
});


/* x버튼 누르면 이미지 올린거 취소 */
$cancel.on('click', function(e){
    e.preventDefault();
    $input.val("");
    $imgStatus.text("이미지 추가하기");
    $cancel.css('display', 'none');
    $imgShow.css('backgroundImage', 'none');
})