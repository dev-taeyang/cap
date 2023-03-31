package com.app.captain.domain.dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class GroupDTO {

    private Long memberId;
    private String memberIdentification;
    private String memberPassword;
    private String memberEmail;
    private String memberName;
    private String memberNickname;
    private String memberPhone;
    private String memberBirth;
    private String memberGender;
    private int memberStatus;
    private String memberRandomKey;
    private String memberFileOriginalName;
    private String memberFileUuid;
    private String memberFilePath;
    private String memberFileSize;
    private boolean memberFileType;
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
    private Long groupReplyCount;

}
