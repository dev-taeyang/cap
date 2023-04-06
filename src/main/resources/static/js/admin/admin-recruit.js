/* admin-recruit.html */

/* ==========================카카오맵========================== */

/* 모달 닫기 */
const $modalCancel = $("#Capa_1");

$modalCancel.on("click", function(e) {
    $(".modal-stage").hide();
});

/* 상세보기 */
globalThis.groupId = "";

$("table.table").on("click", ".content__detail__btn",  function (e) {
    globalThis.groupId = $($(this).parent().parent().children()[1]).text();
    adminGroupService.groupDetail(groupId);
    $(".modal-stage").show();
});

/* ---------------------------- 관리자 회원 삭제 ---------------------------- */


const $removeButton = $("#delete-button");
const $deleteConfirmButton = $("#confirm-delete");
let checkBoxArr = [];

$deleteConfirmButton.on("click", function(e) {
    var $checkboxes = $('.table__content input[type="checkbox"]');

    $checkboxes.each((i, v) => {
        if(v.checked) {
            checkBoxArr.push($(".content__id").eq(i + 1).text());
        }
    });

    for (let i = 0; i < checkBoxArr.length; i++) {
        adminGroupService.groupDelete(checkBoxArr[i]);
    }
});

/* ---------------------------- 관리자 회원 목록 ---------------------------- */


function showGroupList(groups) {
    const $append = $(".table");
    let detailCount = 0;
    let text = "";
    let str = "";

    groups.forEach(group => {
        detailCount++;
        str = `
                 <tr class="table__header">
                     <th class="content_check"></th>
                     <th class="content__id" style="width: 5%;">번호</th>
                     <th>탐험대 명</th>
                     <th>탐험 위치</th>
                     <th>카테고리</th>
                     <th>등록일</th>
                     <th style="width: 13%;">정원 수</th>
                     <th></th>
                 </tr>
              `;

        text += `
                <tr class="table__content">
                     <td>
                         <label class="check-label">
                            <input type="checkbox" name="check" />
                         </label>
                     </td>
                     <td class="content__id">${group.groupId}</td>
                     <td>${group.groupName}</td>
                     <td>${group.groupLocation}</td>
                     <td>${group.groupCategory}</td>
                     <td>${group.groupRegisterDate}</td>
                     <td>${group.groupMaxValue}</td>
                     <td>
                        <button
                         id="detailCount"   class="content__detail__btn button__type_2 button__color__green"
                            >
                            상세보기
                         </button>
                     </td>
                 </tr>
              `;
    });
    $append.append(str + text);
}

/* 페이징 처리 */
const $pagingList =  $(".page-number");

$pagingList.each((i, li) => {
    $(li).on("click", function(e) {
        globalThis.page = $(this).text();

        $(".table").empty();
        adminGroupService.getGroupList();
    });
});

/* ---------------------------- 관리자 회원 ajax 모듈화 ---------------------------- */

globalThis.page = 1;

let adminGroupService = (function () {
    function getGroupList() {
        $.ajax({
            url: `/admin/admin/recruit-list/${page}`,
            success: function(groups) {
                showGroupList(groups);
            }
        })
    }

    function groupDetail(groupId) {
        $.ajax({
            url: "/admin/recruit-detail",
            data: {"groupId": groupId},
            success: function (groupDTO) {

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                /* db에 있는 group location이 들어갈 곳 */
                geocoder.addressSearch(groupDTO.groupLocation , function(result, status) {

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


                let text = "";
                const $modal = $(".detail-modal");
                text += `
                <div class="modal__content">
                     <div class="content__title">
                     <h4>탐험 위치</h4>
                </div>
                 <!-- 위치정보 띄울곳 -->
                 <div class="content__intput input_box_shadow">
                     <input
                     type="text"
                     name=""
                     value="${groupDTO.groupLocation}"
                     readonly="true"
                     />
                 </div>
                 `
                text +=
                `
                     <!-- 지도 API 사용하는곳 -->
                 <div>
                    <section class="boardDetail-sectionContainer">
                        <article>
                            <header class="Article-header">
                                <hgroup>
                                    <h2 class="Article-title">진행하는 장소</h2>
                                </hgroup>
                            </header>
                            <div class="placeMapSection-container">
                                <div class="placeMapContainer">
                            <!-- 지도를 표시할 div 입니다 -->
                                    <div
                                    id="map"
                                    style="width: 100%; height: 170px"
                                        ></div>
                                        <div class="place-container">
                                            <div class="placeLocation-container">
                                                <div
                                                class="placeLocationTitle-container"
                                                    >
                                                    <strong class="placeLocationTitle"
                                                        >주소</strong
                                                    >
                                                        <span
                                                            id="coordAddr"
                                                            class="placeLocationTitleDetail"
                                                        ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div>
                `


                text +=
                `
                <div class="content__main">
                    <div class="content__img__wrap">
                <!-- 임시로 name='file' 해둠 -->
                <!-- 기존이미지들 불러와서 담아주는 곳, 눌렀을때 수정가능 -->
                        <label>
                            <div class="content__img">
                `

                if(groupDTO.groupFilePath != null) {
                    text +=
                        `
                <img
                    src="/admin/display?fileName=${groupDTO.groupFilePath}/${groupDTO.groupFileUuid}_${groupDTO.groupFileOriginalName}"
                />
                `
                }else{
                    text +=
                        `
                <img
                    src="/images/profile.png"
                />
                `
                }
                text +=
                `
                </div>
                <input type="file" name="file" style="display: none" />
                    <div>
                        <img src="" alt="">
                    </div>
                </label>
                </div>
                <!-- 탐험대 정보 상세보기 -->
                <ul class="content__list__wrap">
                    <li class="content__list">
                        <span>닉네임</span>
                            <div class="content__intput input_box_shadow">
                                <input type="text" value="${groupDTO.memberNickname}" class="memberNickname" readonly/>
                            </div>
                    </li>
                    <li class="content__list">
                        <span>탐험대(이름)</span>
                        <div class="content__intput input_box_shadow">
                            <input type="text" value="${groupDTO.groupName}" class="groupName"/>
                        </div>
                    </li>
                    <li class="content__list">
                        <span>정원수</span>
                        <div class="content__intput input_box_shadow">
                            <input type="text" value="${groupDTO.groupMaxValue}" class="groupMaxValue"/>
                        </div>
                    </li>
                    <li class="content__list">
                        <span>탐험 위치</span>
                        <div class="content__intput input_box_shadow">
                            <input type="text" value="${groupDTO.groupLocation}" class="groupLocation" readonly/>
                        </div>
                    </li>
                    <li class="content__list">
                        <span>탐험 종류</span>
                        <div class="content__intput input_box_shadow">
                            <input type="text" value="${groupDTO.groupCategory}" class="groupCategory"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
                        <!-- 수정완료 눌렀을 때 뜨는 곳 -->
        <div class="user__profile__button">
            <button
            type="button"
            id="completeBtn"
            class="button__type_2 button__color__green"
             >
             수정완료
             </button>
         </div>
                `;
                $modal.empty();
                $modal.html(text);

                $("#completeBtn").on("click", function(e) {
                    let groupVO = new Object();
                    groupVO.groupId = globalThis.groupId;
                    groupVO.groupName = $('.groupName').val();
                    groupVO.groupMaxValue = $('.groupMaxValue').val();
                    groupVO.groupLocation = $('.groupLocation').val();
                    groupVO.groupCategory = $('.groupCategory').val();
                    console.log(groupVO);
                    adminGroupService.groupUpdate(groupVO);
                    $(".modal-stage").hide();
                });
            }
        })
    }

    function groupUpdate(groupVO) {
        $.ajax({
            url: "/admin/recruit-update",
            type: "post",
            data: JSON.stringify(groupVO),
            contentType: "application/json; charset=utf-8",
            success: function() {
                $(".table").empty();
                adminGroupService.getGroupList();
            }
        });
    }

    function groupDelete(groupId) {
        $.ajax({
            url: "/admin/recruit-delete",
            type: "delete",
            data: {"groupId": groupId},
            success: function() {
                let lastIndex = 0;

                if($(".table").children() == null) {
                    globalThis.page--;
                    $(".table").empty();
                    adminGroupService.getGroupList();

                    $pagingList.each((i, li) => {
                        lastIndex = li.length - 1;

                        if(lastIndex == i) {
                            li.remove();
                        }
                    });
                    return;
                }
                $(".table").empty();
                adminGroupService.getGroupList();
            }
        })
    }

    return {getGroupList: getGroupList, groupDetail: groupDetail, groupUpdate: groupUpdate, groupDelete: groupDelete}
})();

adminGroupService.getGroupList();



















