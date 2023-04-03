package com.app.captain.controller;

import com.app.captain.domain.dto.Criteria;
import com.app.captain.domain.dto.Search;
import com.app.captain.domain.vo.NoticeVO;
import com.app.captain.service.MemberService;
import com.app.captain.service.NoticeService;
import com.app.captain.service.ReviewFileService;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    }

    @GetMapping("/admin-member")
    public void showMembers(Model model, Long memberId){
    }

    @GetMapping("/admin-review")
    public void showReviews(Model model, Criteria criteria){
        model.addAttribute("reviews", reviewService.getList(criteria));
    }

    @ResponseBody
    @GetMapping("/admin-detail")
    public NoticeVO showDetail(@RequestParam("noticeId") Long noticeId) {
        return noticeService.getNotice(noticeId);
    }

    @ResponseBody
    @PostMapping("/admin-update")
    public void update(@RequestParam("noticeId") Long noticeId, @RequestParam("noticeTitle") String noticeTitle, @RequestParam("noticeContent") String noticeContent) {
        NoticeVO noticeVO = new NoticeVO();

        noticeVO.setNoticeId(noticeId);
        noticeVO.setNoticeTitle(noticeTitle);
        noticeVO.setNoticeContent(noticeContent);

        noticeService.setNotice(noticeVO);
    }

    @ResponseBody
    @PostMapping("/admin-write")
    public void write() {
        
    }
}
