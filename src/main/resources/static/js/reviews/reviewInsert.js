FileList.prototype.forEach = Array.prototype.forEach;
globalThis.arrayFile = new Array();
globalThis.i = 0;

$("input[name='file']").on("change", function () {
    const $files = $("input[name=file]")[0].files;
    let formData = new FormData();

    Array.from($files).forEach(file => globalThis.arrayFile.push(file));

    console.log("globalthis.arrayFile:" + globalThis.arrayFile);

    console.log("파일맞냐?:" + $files);
    $files.forEach(file => {
        formData.append("file", file)
    });
    $.ajax({
        url: "/reviews/upload",
        type: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (uuids) {
            globalThis.uuids = uuids;
            $files.forEach((file, i) => {
                if (file.type.startsWith("image")) {
                    $("#thumbnail").append(`
                                             <div class="thumbnail"  >
                                                <span class="thumbnailSpan" >
                                                    <img src="/reviews/display?fileName=${toStringByFormatting(new Date())}/t_${uuids[i]}_${file.name}">
                                                </span>
                                             </div>
                                          `);
                } else {
                    $("#thumbnail").append(`<div class="thumbnail"><span class="thumbnailSpan"><img src="/images/camera_icon.png" width="100"></span></div>`);
                }
            });
            /********************************************************************/
            /*게시글 추가 부분*/
            const dataTransfer = new DataTransfer();
            globalThis.arrayFile.forEach(file => dataTransfer.items.add(file));
            $("input[name='file']")[0].files = dataTransfer.files;
            console.log("datatransfer.files:" + dataTransfer.files);
            let text = "";
            $files.forEach(file => {
                console.log("들어왔냐?" + file);
                text +=
                    `
                    <input type="hidden" name="files[${i}].reviewFileOriginalName" value="${file.name}">
                    <input type="hidden" name="files[${i}].reviewFileUuid" value="${globalThis.uuids[i]}">
                    <input type="hidden" name="files[${i}].reviewFilePath" value="${toStringByFormatting(new Date())}">
                    <input type="hidden" name="files[${i}].reviewFileSize" value="${file.size}">
                    <input type="hidden" name="files[${i}].reviewFileType" value="${file.type.startsWith("image")}">
                    `
                i++;
            });
            $("form[name='review']").append(text);
            $files.forEach((file) => {
                files.push(file);
            })
            console.log("파일이름:" + files[0].name);
        }
    });
});

function leftPad(value) {
    if (value >= 10) {
        return value;
    }

    return `0${value}`;
}

function toStringByFormatting(source, delimiter = '/') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
}