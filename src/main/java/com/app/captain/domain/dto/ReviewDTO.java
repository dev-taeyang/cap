package com.app.captain.domain.dto;

import com.app.captain.domain.vo.ReviewFileVO;
import com.app.captain.domain.vo.ReviewVO;
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
    private Long memberId;
    private List<ReviewFileVO> files;

    public ReviewDTO toDTO(ReviewVO reviewVO) {
        this.reviewId = reviewVO.getReviewId();
        this.reviewTitle = reviewVO.getReviewTitle();
        this.reviewContent = reviewVO.getReviewContent();
        this.reviewCategory = reviewVO.getReviewCategory();
        this.reviewRegisterDate = reviewVO.getReviewRegisterDate();
        this.reviewUpdateDate = reviewVO.getReviewUpdateDate();
        this.reviewGrade = reviewVO.getReviewGrade();
        this.groupId = reviewVO.getGroupId();
        return this;
    }
}
