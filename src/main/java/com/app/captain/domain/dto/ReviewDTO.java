package com.app.captain.domain.dto;

import com.app.captain.domain.vo.ReviewFileVO;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
public class ReviewDTO {
    private Long reviewId;
    private String reviewTitle;
    private String reviewContent;
    private String reviewCategory;
    private String reviewRegisterDate;
    private String reviewUpdateDate;
    private Double reviewGrade;
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
}
