package com.app.captain.controller;

import com.app.captain.service.NoticeService;
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
    private final NoticeService noticeService;

    @GetMapping("/admin-notice")
    public void showList(Model model, Long noticeId){
        model.addAttribute("notices", noticeService.getList());
        model.addAttribute("noticeCount", noticeService.getNoticeCount());
        log.info("notice");
    }
}
