

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



//* DB에서 카테고리, 별점을 가져와서 Radio 체크해주는부분
let gradevalue = $('input[name="reviewGrade"]:checked').val();
let categoryvalue = $('input[name="reviewCategory"]:checked').val();


/*check 된것 JS로 표시 해주기*/
let gradeInput = document.querySelector('input[name="reviewGrade"]:checked');
let categoryInput = document.querySelector('input[name="reviewCategory"]:checked');
let grade1 = gradeInput.nextElementSibling;
let category1 = categoryInput.nextElementSibling;
$(grade1).addClass("ButtonActive");
$(category1).addClass("CategoryActive");

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



