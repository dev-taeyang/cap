package com.app.captain.domain.vo;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class GroupVO {
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
    private boolean groupFileType;
    private Long groupCaptain;
}
