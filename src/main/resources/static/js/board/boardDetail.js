


// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

/* db에 있는 group location이 들어갈 곳 */
geocoder.addressSearch(group.groupLocation , function(result, status) {

    // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {

        /* 좌표 알아내는 코드 */
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);


        // 지도 표시용 js
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: coords, // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        // 마커가 표시될 위치입니다 
        var markerPosition  = coords; 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);


        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
            }
            
            // 현재 지도 설정좌표로 주소를 검색해서 지정한 위치에 표시합니다
            searchAddrFromCoords(markerPosition, displayAdderessInfo);
            
            // 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
            function displayAdderessInfo(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var infoDiv = document.getElementById('coordAddr');
            
                    for(var i = 0; i < result.length; i++) {
                        // 행정동의 region_type 값은 'H' 이므로
                        if (result[i].region_type === 'H') {
                            infoDiv.innerHTML = result[i].address_name;
                            break;
                        }
                    }
                }    
            }
    } 
});


/* 탐험대 삭제 모달 js */

const $delete = $('.deleteButton');
const $deleteButton = $('.delete-button');
const $cancelButton = $('.cancel-button');

/* $('.modal-container').hide(); */

/* 삭제 눌렀을 떄 뜨는 모달창 */
$delete.on('click', function () {
  $('.modal-container').show();
  $('body').css('overflow-y', 'hidden');
  let modalMessage = '<p>정말</p><p>삭제 하시겠습니까?</p>';
  showWarnModal(modalMessage);
});

function showWarnModal(modalMessage) {
  $('.modal-content').html(modalMessage);
  $('.warn-modal').css('animation', 'popUp 0.5s');
  $('.modal-container').css('display', 'flex').hide().fadeIn(500);
  setTimeout(function () {
    modalCheck = true;
  }, 500);
}

/* 모달 내리기 */
$cancelButton.on('click', function () {
  $('.warn-modal').css('animation', 'popDown 0.5s');
  $('.modal-container').fadeOut(500);
  $('body').css('overflow-y', 'scroll');
});

/* 삭제 컨트롤러 타고 이동해야함 */
$deleteButton.on('click', function () {
    location.href = '';
  });


/* 참여하기 버튼 눌렀을 때 참여 */
const $JoinButton = $('.button-enterRecruit');

$JoinButton.on('click', function(){
    location.href = '';
})