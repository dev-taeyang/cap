
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

    console.log(nameCheck)
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



// 등록하기 버튼
const $RegisterButton = $('.registButton-button');

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

// 카테고리 누르면 활성화
const $Category = $(".CategoryItem");
const $Categoryradio = $('input[name="groupCategory"]');
    
let categoryCheck;
let categoryCheckAll = [false, false, false, false];
let CheckCategory = false;



/* 텍스트 입력 칸 관련 */
const $TextBox = $("input[type='text'], .detailText-text");

let textCheck;
let textCheckAll = [false, false, false, false, false];
let CheckText = false;


/* 시간 입력칸 관련 */
const $Time = $(".formTime");

let timeCheck;
let timeCheckAll = [false, false, false, false];
let CheckTime = false;

const $MakeInput = $("input[type='text'], .CategoryItem, .formTime, .detailText-text")


$Category.each((i, e) => {
    $(e).click(function(){
        $Category.removeClass("CategoryActive");
        $(e).addClass("CategoryActive");
        $Categoryradio[i].checked = true;

        switch(i) {
            case 0:
                categoryCheck = $Categoryradio[0].checked ? true : false;
                break;
            case 1:
                categoryCheck = $Categoryradio[1].checked ? true : false;
                break;
            case 2:
                categoryCheck = $Categoryradio[2].checked ? true : false;
                break;
            case 3:
                categoryCheck = $Categoryradio[3].checked ? true : false;
                break;
        }

        categoryCheckAll[i] = categoryCheck;

        for(let e = 0; e < categoryCheckAll.length; e++ ){
            if(categoryCheckAll[e]) {
                CheckCategory = true;
                break;
            }
        }
    });

});





$TextBox.each((i, e) => {
    $(e).blur(function(){
    let value = $(e).val();

        if(!value) {
            textCheck = false;
            textCheckAll[i] = textCheck;
            
        }
        
        switch(i) {
            case 0:
                var condition1 = nameRegex.test(value);
                var condition2 = value.length > 0 && value.length <= 30;
                textCheck = condition1 && condition2;
                break;
            case 1:
                var condition = value.length > 0 && value.length <= 30;
                textCheck = condition;
                break;
            case 2:
                var condition1 = wordRegex.test(value) >= 0
                var condition2 = value.length > 0
                textCheck = condition1 && condition2;
                break;
            case 3:
                var condition1 = NumberRegex.test(value);
                var condition2 = value.length > 0 && value.length < 3;
                textCheck = condition1 && condition2;
                break;
            case 4:
                textCheck = value.length > 0;
                break;

        }
        textCheckAll[i] = textCheck;

        if(textCheckAll[0] && textCheckAll[1] && textCheckAll[2] && textCheckAll[3] && textCheckAll[4]) {
            CheckText = true;
        } else if(!(textCheckAll[0] && textCheckAll[1] && textCheckAll[2] && textCheckAll[3] && textCheckAll[4])) {
            CheckText = false;
        }
    })
    
})


    $Time.each((i,e) => {
        $(e).change(function(){
        let value = $(e).val();

        switch(i) {
            case 0:
                timeCheck = value;
                break;
            case 1:
                timeCheck = value;
                break;
            case 2:
                timeCheck = value;
                break;
            case 3:
                timeCheck = value;
                break;
            }

            timeCheckAll[i] = timeCheck;

            if(timeCheckAll[0] && timeCheckAll[1] && timeCheckAll[2] && timeCheckAll[3]) {
                CheckTime = true;
            } else if(!(timeCheckAll[0] && timeCheckAll[1] && timeCheckAll[2] && timeCheckAll[3])) {
                CheckTime = false;
            }
        })
    })


    $MakeInput.each((i, e) => {
        $(e).blur(function(){
            let allCheck = [CheckCategory, CheckText, CheckTime];

            if(allCheck[0] && allCheck[1] && allCheck[2]) {
                $RegisterButton.attr('disabled', false);
            } else if(!(allCheck[0] && allCheck[1] && allCheck[2])) {
                $RegisterButton.attr('disabled', true);
            }

        })
    })

