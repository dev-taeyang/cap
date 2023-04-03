package com.app.captain.domain.vo;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class ReviewFileVO {
    private Long reviewFileId;
    private String reviewFileOriginalName;
    private String reviewFileUuid;
    private String reviewFilePath;
    private String reviewFileSize;
    private boolean reviewFileType;
    private Long reviewFileRep;
    private Long reviewId;
}
