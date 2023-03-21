

const $RegisterButton = $('.registButton-button');



// 카테고리 누르면 활성화
const $Category = $(".CategoryItem");
const $Categoryradio = $('input[name="category"]');
    
let categoryCheck;
let categoryCheckAll = [false, false, false, false];
let CheckCategory = false;



/* 평점 선택관련 */
const $Button = $(".ButtonItem");
const $starRadio = $('input[name="reviewStar"]');

let buttonCheck;
let buttonCheckAll = [false, false, false, false, false];
let CheckButton = false;


/* 텍스트 입력  */
const $TextInput = $('input[type="text"], .detailText-text');

let textCheck;
let textCheckAll = [false, false];
let CheckText = false;

// 모든 필수 입력값 체크용 선언
const $MakeInput = $('input[type="text"], .CategoryItem, .ButtonItem, .detailText-text')


// 카테고리 체크
    $Category.each((i, e) => {
    $(e).click(function(){
        console.log($Category);
        $Category.removeClass("CategoryActive");
        $(e).addClass("CategoryActive");
        $Categoryradio[i].checked = true;
        let value = $Categoryradio[i].value

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





// 평점 체크
$Button.each((i, e) => {
    $(e).click(function(){
        $Button.removeClass("ButtonActive");
        $(e).addClass("ButtonActive");
        $starRadio[i].checked = true;
        let value = $starRadio[i].value;

        switch(i) {
            case 0:
                buttonCheck = $starRadio[0].checked ? true : false;
                break;
            case 1:
                buttonCheck = $starRadio[1].checked ? true : false;
                break;
            case 2:
                buttonCheck = $starRadio[2].checked ? true : false;
                break;
            case 3:
                buttonCheck = $starRadio[3].checked ? true : false;
                break;
            case 4:
                buttonCheck = $starRadio[4].checked ? true : false;
                break;  
        }

        buttonCheckAll[i] = buttonCheck;

        for(let e = 0; e < buttonCheckAll.length; e++ ){
            if(buttonCheckAll[e]) {
                CheckButton = true;
                break;
            }
        }
    });
});


// 텍스트 작성용 체크
    $TextInput.on('change', function(){
        let value = $(this).val();
        let i = $TextInput.index($(this));
        
        if(!value) {
            textCheck = false;
            textCheckAll[i] = textCheck;
        }

        switch(i) {
            case 0:
                textCheck = $TextInput.eq(i).val();
                break;
                
            case 1:
                textCheck = $TextInput.eq(i).val();
                break;

            }
                
         textCheckAll[i] = textCheck;

       if(textCheckAll[0] && textCheckAll[1]) {
            CheckText = true;
       } else if(!(textCheckAll[0] && textCheckAll[1])) {
            CheckText = false;
       }
    })


    /* 모든 조건 만족시 버튼 활성화 */
$MakeInput.on('blur', function(){
    console.log($MakeInput);

    let allCheck = [CheckCategory, CheckButton, CheckText];

    if(allCheck[0] && allCheck[1] && allCheck[2]) {
        $RegisterButton.attr('disabled', false);
    } else if(!(allCheck[0] && allCheck[1] && allCheck[2])) {
        $RegisterButton.attr('disabled', true);
    };

});

const $file = $('input[type=file]');
const $imgButton = $('.container-imageInput');
const $cancel = $(".cancelImage");
const $imgDiv = $('label[for=attach] div');
const $TextContainer = $('.imgText-container');
const $input = $('#attach');



$file.on('change', function(e){
    let reader = new FileReader();
    $cancel.css('display', 'block');
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(e) {
        let result = e.target.result;
        if(result.includes('image')) {
           $imgDiv.css('backgroundImage', `url('${result}')`)
           $TextContainer.css('display', 'none');
        }
    }

});

function handleFiles(files) {
    const ThumbnailList = document.querySelector('.MainImage-wrapper');

    for(let i = 0; i < files.length; i++) {
        if($imgButton.length > 7) {
            $imgButton.hide();
        }
    }

    
}

/* x버튼 누르면 이미지 올린거 취소 */
$cancel.on('click', function(e){
    e.preventDefault();
    $input.val("");
    $cancel.css('display', 'none');
    $imgDiv.css('backgroundImage', 'none');
    $TextContainer.css('display', 'block');
})




/* function handleFiles(files) {
    const ThumbnailList = document.querySelector('.MainImage-wrapper');

    for(let i = 0; i < files.length; i++) {
        if($('.container-imageInput').length > 7) {
            $('.imageInput-ReviewContainer').hide();
        }

        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(event) {

        }
    }


} */