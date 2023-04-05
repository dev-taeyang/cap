/* 남은 일자 구하기 */

/* date안에 날짜형식의 값을 넣으면 알아서 계산됨. */
function remainingDays(date) {
    const start = new Date();
    const end = new Date(date);

    const diff = (end - start) / (1000 * 60 * 60 * 24);

    if (diff < 0) {
        return '모집이 마감되었습니다.';
    } else if (diff === 0) {
        return '오늘이 마감일 입니다.';
    } else {
        return `모집 마감까지 ${Math.ceil(diff)}일`;
    }
}