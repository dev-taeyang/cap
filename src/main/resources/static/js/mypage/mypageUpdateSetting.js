

/* 프로필 사진 변경 표시 */
const $formChangeProfile = $(".mypageUpdate-main")
let text = "";

function showFormProfile() {
    if(members.memberFileType == 1) {
        text += `
            <label>
                <!-- x버튼 -->
              <div>
                  <span class="close-image">X</span>
              </div>
                      <!-- 프로필 이미지 클릭시 변경 -->
              <img
              src="/mypage/display?fileName=${members.memberFilePath}/${members.memberFileUuid}_${members.memberFileOriginalName}"
              class="user-profile-image"
              />
              <div class="user-profile-image-update">
                      <!-- 프로필 이미지에 달려있는 카메라 아이콘 -->
                <img
                src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.72386 3.05752L10.4714 3.80507C10.5964 3.93009 10.766 4.00032 10.9428 4.00033H12.6667C13.403 4.00033 14 4.59728 14 5.33366V11.3337C14 12.07 13.403 12.667 12.6667 12.667H3.33333C2.59695 12.667 2 12.07 2 11.3337V5.33366C2 4.59728 2.59695 4.00033 3.33333 4.00033H5.05719C5.234 4.00032 5.40357 3.93009 5.52859 3.80507L6.27614 3.05752C6.52619 2.80747 6.86533 2.66699 7.21895 2.66699H8.78105C9.13467 2.66699 9.47381 2.80747 9.72386 3.05752ZM10.6667 8.00033C10.6667 9.47308 9.47276 10.667 8 10.667C6.52724 10.667 5.33333 9.47308 5.33333 8.00033C5.33333 6.52757 6.52724 5.33366 8 5.33366C9.47276 5.33366 10.6667 6.52757 10.6667 8.00033ZM11.5 6.00024C11.7761 6.00024 12 5.77639 12 5.50024C12 5.2241 11.7761 5.00024 11.5 5.00024C11.2239 5.00024 11 5.2241 11 5.50024C11 5.77639 11.2239 6.00024 11.5 6.00024Z' fill='white'/%3E %3C/svg%3E"
                class="user-profile-image-camera"
                />
              </div>
                      <!-- 숨겨 놓은 파일 선택 버튼 -->
              <input name="memberFile" accept="image/*" type="file" class="profile-upload-button" />
          </label>
          `
        $formChangeProfile.append(text)
    } else {
        text += `
            <label>
                <!-- x버튼 -->
              <div>
                  <span class="close-image">X</span>
              </div>
                      <!-- 프로필 이미지 클릭시 변경 -->
              <img
              src="https://t1.kakaocdn.net/together_image/common/avatar/avatar.png"
              class="user-profile-image"
              />
              <div class="user-profile-image-update">
                      <!-- 프로필 이미지에 달려있는 카메라 아이콘 -->
                <img
                src="data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.72386 3.05752L10.4714 3.80507C10.5964 3.93009 10.766 4.00032 10.9428 4.00033H12.6667C13.403 4.00033 14 4.59728 14 5.33366V11.3337C14 12.07 13.403 12.667 12.6667 12.667H3.33333C2.59695 12.667 2 12.07 2 11.3337V5.33366C2 4.59728 2.59695 4.00033 3.33333 4.00033H5.05719C5.234 4.00032 5.40357 3.93009 5.52859 3.80507L6.27614 3.05752C6.52619 2.80747 6.86533 2.66699 7.21895 2.66699H8.78105C9.13467 2.66699 9.47381 2.80747 9.72386 3.05752ZM10.6667 8.00033C10.6667 9.47308 9.47276 10.667 8 10.667C6.52724 10.667 5.33333 9.47308 5.33333 8.00033C5.33333 6.52757 6.52724 5.33366 8 5.33366C9.47276 5.33366 10.6667 6.52757 10.6667 8.00033ZM11.5 6.00024C11.7761 6.00024 12 5.77639 12 5.50024C12 5.2241 11.7761 5.00024 11.5 5.00024C11.2239 5.00024 11 5.2241 11 5.50024C11 5.77639 11.2239 6.00024 11.5 6.00024Z' fill='white'/%3E %3C/svg%3E"
                class="user-profile-image-camera"
                />
              </div>
                      <!-- 숨겨 놓은 파일 선택 버튼 -->
              <input name="memberFile" accept="image/*" type="file"  class="profile-upload-button" />
          </label>
          `
        $formChangeProfile.append(text)
    }

}
showFormProfile();