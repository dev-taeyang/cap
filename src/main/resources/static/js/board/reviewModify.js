

/* 등록버튼 */
const $RegisterButton = $('.registButton-button');

/* 별점 활성화 */

const $GradeButton = $(".ButtonItem");
const $starRadio = $('input[name="reviewGrade"]');

// 평점 체크
$GradeButton.each((i, e) => {
    $(e).click(function(){
        $GradeButton.removeClass("ButtonActive");
        $(e).addClass("ButtonActive");
        $starRadio[i].checked = true;

    });
});


/* 카테고리 활성화 */
const $Category = $(".CategoryItem");
const $Categoryradio = $('input[name="reviewCategory"]');

// 카테고리 체크
$Category.each((i, e) => {
    $(e).click(function(){
        $Category.removeClass("CategoryActive");
        $(e).addClass("CategoryActive");
        $Categoryradio[i].checked = true;
        
    });

});

/* 라디오 버튼들 클릭 체크용 */
const $Buttons = $('button[type=button]');
const $Radio = $('input[type=radio]');


let gradevalue = $('input[name="reviewGrade"]:checked').val();
let categoryvalue = $('input[name="reviewCategory"]:checked').val();


$Buttons.each((i, e) => {
    let radiosCheck;
    let radiosCheckAll = [false, false, false, false, false, false, false, false, false]

    $(e).click(function(){

        switch(i) {
            case 0: case 1: case 2: case 3:
                radiosCheck = (categoryvalue != $Categoryradio.eq(i).val() ? true : false);
                break;

            case 4: case 5: case 6: case 7: case 8:
                radiosCheck = (gradevalue != $starRadio.eq(i - 4).val() ? true : false);
                break;
        }

        radiosCheckAll[i] = radiosCheck;

        for(let e = 0; e < radiosCheckAll.length; e++ ){
            if(radiosCheckAll[e]) {
                $RegisterButton.attr('disabled', false);
                break;
            } else {
                $RegisterButton.attr('disabled', true);
            }
        }
    });
});

const $textModify = $('input[type=text], .detailText-text');

let titlevalue = $('input[type=text]').val();
let contentvalue = $('.detailText-text').val();

$textModify.on('change', function(){
    let textModifyCheck;
    let textModifyCheckAll = [false, false];
    let i = $textModify.index($(this));
    let value = $(this).val();

    if(!value) {
        textModifyCheck = false;
        textModifyCheckAll[i] = textModifyCheck;
    }

    switch (i) {
        case 0: 
            textModifyCheck = titlevalue != $(this).val() ? true : false;
            break;

        case 1:
            textModifyCheck = contentvalue != $(this).val() ? true : false;
    }

    textModifyCheckAll[i] = textModifyCheck;

    for(let e = 0; e < textModifyCheckAll.length; e++) {
        if(textModifyCheckAll[e]) {
            $RegisterButton.attr('disabled', false);
            break;
        } else {
            $RegisterButton.attr('disabled', true);
        }
    }
})


/* 파일 썸네일 */
/* 파일인풋 */
const file = document.querySelector('input[type=file]');
const imgButton = document.querySelector(".imgButton");
console.log(imgButton);

function handleFiles(files) {
    /* 썸네일 담을 div의 부모 */
    const thumbnailList = document.getElementById("thumbnail-list");

    for (let i = 0; i < files.length; i++) {

        /* 8개 이미지 추가되면 버튼 없애기 */
        if ($(".imageThumbnail").length > 7) {
            $(".imgButtonWrap").hide();
        }

        /* 파일절대경로얻기 */  
        const file = files[i];
        const reader = new FileReader();
        /* reader가 onload 할때 */
        reader.onload = function(event) {
            /* 썸네일 담을 div와 그 자식의 span 선언 */   
            const thumbnail = document.createElement("div");
            const thumbnailSpan = document.createElement("span");


            let result = event.target.result;

            /* 썸네일 담을 div와 그 자식의 span에 썸네일 css와 x버튼 css 추가*/
            thumbnail.classList.add("imageThumbnail");
            thumbnailSpan.classList.add("closeImgButton");

            /* 썸네일 담을 div에 절대경로 넣어주기 */
            thumbnail.style.backgroundImage = `url('${result}')`;

            /* 썸네일 담을 div와 그 자식의 span 추가해주기 */
            thumbnailList.prepend(thumbnail);
            thumbnail.appendChild(thumbnailSpan);

            /* x버튼 선언 */
            const closeButton = document.querySelector(".closeImgButton");

            /* x버튼 누를 시 x버튼과 backgroundImage 지워주기 */
            closeButton.addEventListener('click', function (e) {
                e.preventDefault();
                file.value = "";
                this.style.display = 'none';
                thumbnail.style.backgroundImage = `url('')`;
                thumbnail.remove(thumbnail);
                $(".imgButtonWrap").show();
            });

            /* 파일 개수가 8개 이상이면 모달창 띄우고 break */
           if($(".imageThumbnail").length > 7 ){
            $(".imgButtonWrap").hide();
            return;
           }
            
        };
        /* result 속성(attribute)에 담기 */
        reader.readAsDataURL(file);
           
    }

}

/* 버튼을 감싸고있는 label객체 들고오기 */
const fileInput = document.getElementById("photo-picker");

/* 버튼을 감싸고있는 label객체 클릭하면 위에 function handleFiles 실행 */
fileInput.addEventListener("change", function(event) {
    handleFiles(event.target.files);
});

//* DB에서 카테고리, 별점을 가져와서 Radio 체크해주는부분
