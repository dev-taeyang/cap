

/* 등록버튼 */
const $RegisterButton = $('.registButton-button');



// 카테고리 누르면 활성화
const $Category = $(".CategoryItem");
const $Categoryradio = $('input[name="reviewCategory"]');
    
let categoryCheck;
let categoryCheckAll = [false, false, false, false];
let CheckCategory = false;



/* 평점 선택관련 */
const $Button = $(".ButtonItem");
const $starRadio = $('input[name="reviewGrade"]');

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

    let allCheck = [CheckCategory, CheckButton, CheckText];

    if(allCheck[0] && allCheck[1] && allCheck[2]) {
        $RegisterButton.attr('disabled', false);
    } else if(!(allCheck[0] && allCheck[1] && allCheck[2])) {
        $RegisterButton.attr('disabled', true);
    };

});


/* 파일 썸네일 */
/* 파일인풋 */
/*const file = document.querySelector('input[type=file]');
const imgButton = document.querySelector(".imgButton");
console.log(imgButton);*/

/*function handleFiles(files) {
    /!* 썸네일 담을 div의 부모 *!/
    const thumbnailList = document.getElementById("thumbnail-list");

    for (let i = 0; i < files.length; i++) {

        /!* 8개 이미지 추가되면 버튼 없애기 *!/
        if ($(".imageThumbnail").length > 7) {
            $(".imgButtonWrap").hide();
        }

        /!* 파일절대경로얻기 *!/
        const file = files[i];
        const reader = new FileReader();
        /!* reader가 onload 할때 *!/
        reader.onload = function(event) {
            /!* 썸네일 담을 div와 그 자식의 span 선언 *!/
            const thumbnail = document.createElement("div");
            const thumbnailSpan = document.createElement("span");


            let result = event.target.result;

            /!* 썸네일 담을 div와 그 자식의 span에 썸네일 css와 x버튼 css 추가*!/
            thumbnail.classList.add("imageThumbnail");
            thumbnailSpan.classList.add("closeImgButton");

            /!* 썸네일 담을 div에 절대경로 넣어주기 *!/
            thumbnail.style.backgroundImage = `url('${result}')`;

            /!* 썸네일 담을 div와 그 자식의 span 추가해주기 *!/
            thumbnailList.prepend(thumbnail);
            thumbnail.appendChild(thumbnailSpan);

            /!* x버튼 선언 *!/
            const closeButton = document.querySelector(".closeImgButton");

            /!* x버튼 누를 시 x버튼과 backgroundImage 지워주기 *!/
            closeButton.addEventListener('click', function (e) {
                e.preventDefault();
                file.value = "";
                this.style.display = 'none';
                thumbnail.style.backgroundImage = `url('')`;
                thumbnail.remove(thumbnail);
                $(".imgButtonWrap").show();
            });

            /!* 파일 개수가 8개 이상이면 모달창 띄우고 break *!/
           if($(".imageThumbnail").length > 7 ){
            $(".imgButtonWrap").hide();
            return;
           }
            
        };
        /!* result 속성(attribute)에 담기 *!/
        reader.readAsDataURL(file);
           
    }

}

/!* 버튼을 감싸고있는 label객체 들고오기 *!/
const fileInput = document.getElementById("photo-picker");

/!* 버튼을 감싸고있는 label객체 클릭하면 위에 function handleFiles 실행 *!/
fileInput.addEventListener("change", function(event) {
    handleFiles(event.target.files);
});*/


