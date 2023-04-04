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
    private String reviewFileOriginalName;
    private String reviewFileUuid;
    private String reviewFilePath;
    private String reviewFileSize;
    private String reviewFileType;
    private Long memberId;
    private String memberName;
    private String memberNickname;
    private String memberFileOriginalName;
    private String memberFileUuid;
    private String memberFilePath;
    private String memberFileSize;
    private String memberFileType;
}
