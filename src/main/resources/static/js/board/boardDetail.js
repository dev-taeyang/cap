

// 지도 표시용 js

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
    center: new kakao.maps.LatLng(37.2504431, 127.1555927), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.2504431, 127.1555927); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

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