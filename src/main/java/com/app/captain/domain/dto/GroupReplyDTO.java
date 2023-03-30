package com.app.captain.domain.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class GroupReplyDTO {

    private Long memberId;
    private Long groupId;
    private String groupName;
    private Long groupMaxValue;
    private String groupCategory;
    private String groupTitle;
    private String groupContent;
    private String groupLocation;
    private String groupRegisterDate;
    private String groupEndDate;
    private String groupMeetDate;
    private String groupFileOriginalName;
    private String groupFileUuid;
    private String groupFilePath;
    private String groupFileSize;
    private String groupFileType;
    private Long groupCaptain;
    private Long groupReplyId;
    private String groupReplyContent;
    private String groupReplyRegisterDate;
    private String groupReplyUpdateDate;

}
