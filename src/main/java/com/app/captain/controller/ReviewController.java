package com.app.captain.controller;

import com.app.captain.domain.dto.ReviewDTO;
import com.app.captain.domain.vo.ReviewFileVO;
import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.service.ReviewFileService;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/reviews/*")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewFileService reviewFileService;

//    리뷰 상세보기
    @GetMapping("detail")
    public ReviewVO getReview(@PathVariable("reviewId") Long reviewId){
        return reviewService.getReveiw(reviewId);
    }

//    리뷰 리스트
    @GetMapping("reviewlist")
    public void getList(Model model){
        List<ReviewVO> reviewList = reviewService.getList();
        model.addAttribute("reviews", reviewList);

    }
//    리뷰 작성
    @PostMapping("reviewMake")
    @ResponseBody
    public void write(@RequestBody ReviewDTO reviewDTO){
        reviewService.write(reviewDTO);
        log.info("인설트 됨");
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
