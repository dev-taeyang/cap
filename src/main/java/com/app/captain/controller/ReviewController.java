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
    @GetMapping("detail")
    public ReviewDTO getReview(@PathVariable("reviewId") Long reviewId){
        return reviewService.getReveiw(reviewId);
    }

//    리뷰 리스트
    @GetMapping("list")
    public void getList(Model model){
        List<ReviewVO> reviewList = reviewService.getList();
        model.addAttribute("reviews", reviewList);

    }
//    리뷰 작성
    @PostMapping("write")
    @ResponseBody
    public RedirectView write(@RequestBody ReviewVO reviewVO){
        reviewService.write(reviewVO);
        return new RedirectView("/reviews/list");
    }

//    파일 저장
    @PostMapping("write")
    @ResponseBody
    public void save(@RequestBody List<ReviewFileVO> files){
        reviewFileService.write(files);
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
    }
}
