

/* input 에 글을 적으면 등록 버튼 활성화 */

const $RegistButton = $('.TextAreaSection-submitButton');
const $TextArea = $('.TextAreaSection-textWrite');
console.log($TextArea);

$TextArea.on('keydown', function(){
    let value = $(this).val();

    if(value) {
        $RegistButton.attr('disabled', false);
    } else {
        $RegistButton.attr('disabled', true);
    }
})