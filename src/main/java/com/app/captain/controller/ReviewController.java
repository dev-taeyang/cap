package com.app.captain.controller;

import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/reviews/*")
public class ReviewController {

    private final ReviewService reviewService;

//    리뷰 상세보기
    @GetMapping("detail")
    public ReviewVO getReview(@PathVariable("reviewId") Long reviewId){
        return reviewService.getReveiw(reviewId);
    }

//    리뷰 리스트
    @GetMapping("list")
    public List<ReviewVO> getList(){
        log.info(reviewService.getList().toString());
        return reviewService.getList();
    }
//    리뷰 작성
    @GetMapping("register")
    public void register(ReviewVO reviewVO){
        reviewVO.setReviewCategory("여행");
        reviewVO.setReviewContent("여행을 떠나요");
        reviewVO.setReviewTitle("즉흥여행");
        reviewVO.setGroupId(1L);
        reviewVO.setReviewGrade(5D);
        log.info(reviewVO.toString());
        reviewService.write(reviewVO);
    }

//    리뷰 삭제
    @PutMapping("delete/{reviewId}")
    public void delete(@PathVariable("reviewId")Long reviewId){
        log.info(reviewService.getReveiw(reviewId).toString());
        reviewService.remove(reviewId);
    }

//    리뷰 수정
    @GetMapping("modify/{reviewId}")
    public void modify(@PathVariable("reviewId") Long reviewId){
        ReviewVO reviewVO = reviewService.getReveiw(reviewId);
        reviewVO.setReviewGrade(4.0D);
        reviewVO.setReviewTitle("정지욱 바보");
        reviewVO.setReviewContent("그만좀아파라");
        reviewVO.setReviewCategory("원숭이");
        log.info(reviewVO.toString());
        reviewService.modify(reviewVO);
    }
}
