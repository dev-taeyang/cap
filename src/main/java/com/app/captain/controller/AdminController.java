package com.app.captain.controller;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.Search;
import com.app.captain.service.MemberService;
import com.app.captain.service.NoticeService;
import com.app.captain.service.ReviewFileService;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/admin/*")
@Slf4j
@RequiredArgsConstructor
public class AdminController {
    private final MemberService memberService;
    private final NoticeService noticeService;
    private final ReviewService reviewService;
    private final ReviewFileService reviewFileService;

    @GetMapping("/admin-notice")
    public void showNotices(Model model, Long noticeId){
        model.addAttribute("notices", noticeService.getList());
        model.addAttribute("noticeCount", noticeService.getNoticeCount());
        log.info("notice");
    }

    @GetMapping("/admin-member")
    public void showMembers(Model model, Long memberId){
    }

    @GetMapping("/admin-review")
    public void showReviews(Model model, Criteria criteria, Search search){
        model.addAttribute("reviews", reviewService.getList(criteria, search));
    }
}
