

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



/* 정규식 체크 적용용 */
const $InputGroupName = $('input[name="groupName"]');
const $InputGroupTitle = $('input[name="groupTitle"]');
const $InputGroupMaxValue = $('input[name="groupMaxValue"]');

const NumberRegex =/[0-9?/]+$/;
const wordRegex = /[^ㄱ-ㅎ가-힣a-zA-Z`~!@@#$%^&*|₩₩₩'₩";:₩/? ]+$/;
const nameRegex = /^[0-9ㄱ-ㅎ가-힣a-zA-Z ]+$/;

const SpecialCharacterRegex = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/g;
const $warnMessage = $(".warnMessage");

let nameCheck = true;
let titleCheck = true;
let valueCheck = true;

/* 탐험대 이름 */
$InputGroupName.on('blur', function(){
    let value = $(this).val();

    if(!value) {
        $warnMessage.eq(0).show();
        $warnMessage.eq(0).text('탐험대 명을 입력해주세요');
        $InputGroupName.css('border', '1px solid rgb(222, 28, 34)');
        nameCheck = false;
        return;
    }

    nameCheck = nameRegex.test(value);
    if(nameCheck) {
        $warnMessage.eq(0).hide();
        $InputGroupName.css('border', '1px solid #ddd');
    } else {
        $warnMessage.eq(0).show();
        $warnMessage.eq(0).text('특수 문자를 제외하고 입력해주세요');
        $InputGroupName.css('border', '1px solid rgb(222, 28, 34)');
    }
});

/* 탐험대 모집 제목 */
$InputGroupTitle.on('blur', function(){
    let value = $(this).val();

    if(!value) {
        $warnMessage.eq(1).show();
        $warnMessage.eq(1).text('모집 제목을 입력해주세요');
        $InputGroupTitle.css('border', '1px solid rgb(222, 28, 34)');
        titleCheck = false;
        return;
    }

    titleCheck = true;
    if(titleCheck) {
        $warnMessage.eq(1).hide();
        $InputGroupTitle.css('border', '1px solid #ddd');
    } 
})

/* 탐험대 모집 인원 */
$InputGroupMaxValue.on('blur', function(){
    let value = $(this).val();

    if(!value) {
        $warnMessage.eq(2).show();
        $warnMessage.eq(2).text('모집 인원을 입력해주세요');
        $InputGroupMaxValue.css('border', '1px solid rgb(222, 28, 34)');
        valueCheck = false;
        return;
    }

    console.log(value);
    valueCheck = NumberRegex.test(value);
    if(valueCheck) {
        $warnMessage.eq(2).hide();
        $InputGroupMaxValue.css('border', '1px solid #ddd');
    } else {
        $warnMessage.eq(2).show();
        $warnMessage.eq(2).text('두자리 수 이내 숫자로만 입력해주세요');
        $InputGroupMaxValue.css('border', '1px solid rgb(222, 28, 34)');
    }
});

/* 카테고리 버튼 누르면 활성화 */
/* 및 수정 폼 체크 */
const $Category = $(".CategoryItem");
const $Categoryradio = $('input[name="groupCategory"]');

let categoryvalue = $('input[name="groupCategory"]:checked').val();


$Category.each((i, e) => {
    let radioCheck;
    let radioCheckAll = [false, false, false, false]

    $(e).click(function(){
        console.log(categoryvalue);
        $Category.removeClass("CategoryActive");
        $(e).addClass("CategoryActive");
        $Categoryradio[i].checked = true;
        
        switch(i) {
            case 0: case 1: case 2: case 3:
                console.log($Categoryradio.eq(i).val())
                radioCheck = categoryvalue != $Categoryradio.eq(i).val() ? true : false;
                break;
        }

        radioCheckAll[i] = radioCheck;
        console.log(radioCheckAll)

        for(let e = 0; e < radioCheckAll.length; e++ ){
            if(radioCheckAll[e]) {
                $RegisterButton.attr('disabled', false);
                break;
            } else {
                $RegisterButton.attr('disabled', true);
            }
        }

    });
});

// 등록하기 버튼
const $RegisterButton = $('.registButton-button');

const $ModifyInput = $('input[type=text], .formTime, .detailText-text');
const $locationInput = $('input[name=groupLocation]').val();
console.log($ModifyInput);
console.log($locationInput);


let modifyCheck;
let modifyCheckAll = [false, false, false, false, false, false, false, false, false]

/* 수정 폼 수정시 */

$ModifyInput.on("blur", function(){
    let i = $ModifyInput.index($(this));
    let value = $(this).val();

    if(!value) {
        modifyCheck = false;
        modifyCheckAll[i] = modifyCheck;
    }

    switch (i) {
        case 0: 
            var condition1 = nameRegex.test(value);
            var condition2 = value.length > 0 && value.length <= 30;
            modifyCheck = condition1 && condition2;
            break;

        case 1:
            var condition = value.length > 0 && value.length <= 30;
            modifyCheck = condition;
            break;
        
        case 2:
            console.log('들어옴');
            modifyCheck = $locationInput != value ? true : false;
            break;
        
        case 3: 
            var condition1 = NumberRegex.test(value);
            var condition2 = value.length > 0 && value.length < 3;
            modifyCheck = condition1 && condition2;
            break;

        case 4: case 5: case 6: case 7:
            modifyCheck = value;
            break;

        case 8:
            modifyCheck = value.length > 0;
            break;
    }

    modifyCheckAll[i] = modifyCheck;

    for(let e = 0; e < modifyCheckAll.length; e++) {
        if(modifyCheckAll[e]) {
            $RegisterButton.attr('disabled', false);
            break;
        } else {
            $RegisterButton.attr('disabled', true);
        }
    }

})
