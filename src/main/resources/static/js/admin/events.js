/**
 * ==================================================================================================
 *   이벤트
 *   ==================================================================================================
 *
 * @format
 */

window.onload = function () {
  initClock();
};

/* 사이드바 접기 */
$sidebarSlide.on('click', function () {
  $sidebar.animate({ width: 'toggle' }, 500);
});

/*  listbox 선택 이벤트 ======================================= */
$selectBox.on('click', function (e) {
  e.preventDefault();

  var listbox = $listbox;

  /* 박스 닫기 */
  if (listbox.hasClass('displayNone')) {
    listbox.removeClass('displayNone');
  } else {
    listbox.addClass('displayNone');
  }
});

$list.on('click', function (e) {
  e.preventDefault();

  var i = $list.index($(this));
  var text = $list.eq(i).text();
  $selectBox.text(text);

  /* 인덱스에 따라 검색조건 설정 */
  switch (i) {
    case 0:
      text = 'all';
      break;
    case 1:
      text = 'searchType1';
      break;
    case 2:
      text = 'searchType2';
      break;
    default:
      break;
  }

  /* 실제 input안에 value 값 변경 */
  $searchType.val(text);

  /* 박스 닫기 */
  $listbox.addClass('displayNone');
});

/* 검색바 이벤트 ======================================= */
$searchBar.on('keyup', function (key) {
  /* 추후 검색조건과 연동하여 ajax 작성 요망 */
  /* 입력한 키가 엔터인가 검사 */
  if (key.keyCode == 13) {
    alert('검색 실행');
  }
});

/* 상세보기 모달창 ======================================= */
$detailButton.on('click', function () {
  var i = $detailButton.index($(this));

  /* 해당 컨텐츠 번호 */
  var contentId = $detailButton.eq(i).parent().siblings('.content__id').text();

  /* ajax 에 콜백 넘겨주는 코드 작성해야 함 (검색기능 ajax로)*/

  /* 추후 타임리프로 대체할 예정 */
  $modalStage.show();

  /* 모달 닫는 이벤트 */
  /* 추후 외부로 빼야함 */
  $('.modal-close').on('click', function (e) {
    $modalStage.fadeOut(500);
  });
});

/* 상세보기 모달 내용 submit 이벤트 */
$('#completeBtn').on('click', function (e) {
  e.preventDefault();
  return new Promise(
    function () {
      console.log('으으아');
      $modalStage.fadeOut(500);
    },
    () => {
      $('.storage_form').submit();
    }
  );
});

/* 항목 한개이상 선택안되게 */

/* 창고 썸네일변경 */
$storageFile.on('change', function (e) {
  let i = $storageFile.index($(this));
  console.log(i);
  var reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  console.log(e.target);
  reader.onload = function (e) {
    console.log(e.target);
    let url = e.target.result;
    if (url.includes('image')) {
      $('label.attach').eq(i).find('h6').hide();
      $('div.x').eq(i).show();
      $thumbnail.eq(i).show();
      $thumbnail.eq(i).attr('src', url);
    } else {
      showWarnModal('이미지 파일만 등록 가능합니다.');
    }
  };
});

/* 체크박스 이벤트 ======================================= */

$checkAll.click(function () {
  if ($checkAll.is(':checked')) $check.prop('checked', true);
  else $check.prop('checked', false);
});

$check.click(function () {
  var total = $check.length;
  var checked = $('input[name=check]:checked').length;

  if (total != checked) $checkAll.prop('checked', false);
  else $checkAll.prop('checked', true);
});

/* 실시간 시계 */

function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

function initClock() {
  setInterval(getTime, 1000);
}

/* 확인 모달창 */
const deleteButton = $('#delete-button');
const modal = $('#confirm-modal');
const confirmButton = $('#confirm-delete');
const cancelButton = $('#cancel-delete');

deleteButton.click(function () {
  modal.css('display', 'block');
});

confirmButton.click(function () {
  // 삭제를 실행하는 코드 작성
  location.reload();
  modal.css('display', 'none');
});

cancelButton.click(function () {
  modal.css('display', 'none');
});
