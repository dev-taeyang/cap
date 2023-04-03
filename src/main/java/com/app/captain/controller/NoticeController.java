package com.app.captain.controller;

import com.app.captain.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/notice/*")
@Slf4j
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping("list")
    public String showList(Model model){
        model.addAttribute("notices", noticeService.getList());
        log.info(noticeService.getList().toString());
        return "notice/notice";
    }
}
