/* =========================================썸네일 ==================================================*/
/* 파일 썸네일 */
/* 파일인풋 */
const file = document.querySelector('input[type=file]');
const imgButton = document.querySelector('.imgButton');
console.log(imgButton);

function handleFiles(files) {
    /* 썸네일 담을 div의 부모 */
    const thumbnailList = document.getElementById('thumbnail-list');

    for (let i = 0; i < files.length; i++) {
        /* 8개 이미지 추가되면 버튼 없애기 */
        if ($('.imageThumbnail').length > 7) {
            $('.imgButtonWrap').hide();
        }

        /* 파일절대경로얻기 */
        const file = files[i];
        const reader = new FileReader();
        /* reader가 onload 할때 */
        reader.onload = function (event) {
            /* 썸네일 담을 div와 그 자식의 span 선언 */
            const thumbnail = document.createElement('div');
            const thumbnailSpan = document.createElement('span');

            let result = event.target.result;

            /* 썸네일 담을 div와 그 자식의 span에 썸네일 css와 x버튼 css 추가*/
            thumbnail.classList.add('imageThumbnail');
            thumbnailSpan.classList.add('closeImgButton');

            /* 썸네일 담을 div에 절대경로 넣어주기 */
            thumbnail.style.backgroundImage = `url('${result}')`;

            /* 썸네일 담을 div와 그 자식의 span 추가해주기 */
            thumbnailList.prepend(thumbnail);
            thumbnail.appendChild(thumbnailSpan);

            /* x버튼 선언 */
            const closeButton = document.querySelector('.closeImgButton');

            /* x버튼 누를 시 x버튼과 backgroundImage 지워주기 */
            closeButton.addEventListener('click', function (e) {
                e.preventDefault();
                file.value = '';
                this.style.display = 'none';
                thumbnail.style.backgroundImage = `url('')`;
                thumbnail.remove(thumbnail);
                $('.imgButtonWrap').show();
            });
            /* 파일 개수가 8개 이상이면 모달창 띄우고 break */
            if ($('.imageThumbnail').length > 7) {
                $('.imgButtonWrap').hide();
                return;
            }
        };
        /* result 속성(attribute)에 담기 */
        reader.readAsDataURL(file);
    }
}
/* 버튼을 감싸고있는 label객체 들고오기 */
const fileInput = document.getElementById('photo-picker');

/* 버튼을 감싸고있는 label객체 클릭하면 위에 function handleFiles 실행 */
fileInput.addEventListener('change', function (event) {
    handleFiles(event.target.files);
});
