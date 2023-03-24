package com.app.captain.controller;

import com.app.captain.domain.vo.ReviewVO;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/reviews/*")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("detail")
    public ReviewVO getReview(@PathVariable("reviewId") Long reviewId){
        return reviewService.getReveiw(reviewId);
    }

    @GetMapping("list")
    public List<ReviewVO> getList(){
        return reviewService.getList();
    }

}
