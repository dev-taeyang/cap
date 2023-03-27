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
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/reviews/*")
public class ReviewController {

    private final ReviewService reviewService;
    private final ReviewFileService reviewFileService;

    //    리뷰 상세보기
    @GetMapping("reviewdetail/{reviewId}")
    public String getReview(@PathVariable("reviewId") Long reviewId, Model model) {
        log.info(reviewService.getDTO(reviewId).toString());
        model.addAttribute("review",reviewService.getDTO(reviewId));
        return "reviews/reviewDetail";
    }

    //    리뷰 리스트

    @GetMapping("reviewlist")
    public void getList(Model model) {
        List<ReviewVO> reviewList = reviewService.getList();
        model.addAttribute("reviews", reviewList);
    }

    //  리뷰작성 폼
    @GetMapping("write")
    public String getWrite(Model model) {
        model.addAttribute("review", new ReviewVO());
        return "reviews/reviewMake";
    }

    //    리뷰 작성
    @PostMapping("write")
    public RedirectView save(@ModelAttribute ReviewVO reviewVO) {
        reviewVO.setGroupId(1L);
        log.info(reviewVO.toString());
        reviewService.write(reviewVO);
        return new RedirectView("/reviews/reviewlist");
    }

////    파일 저장
//    @PostMapping("write")
//    @ResponseBody
//    public void save(@RequestBody List<ReviewFileVO> files){
//        reviewFileService.write(files);
//    }

////    리뷰 삭제
//    @PutMapping("delete/{reviewId}")
//    public void delete(@PathVariable("reviewId")Long reviewId){
//        log.info(reviewService.getReveiw(reviewId).toString());
//        reviewService.remove(reviewId);
//    }
//
////    리뷰 수정
//    @GetMapping("modify/{reviewId}")
//    public void modify(@PathVariable("reviewId") Long reviewId){
//    }
}
