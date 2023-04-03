package com.app.captain.controller;

import com.app.captain.domain.dto.ReviewFileDTO;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.service.MemberService;
import com.app.captain.service.ReviewFileService;
import com.app.captain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MainController {
    private final MemberService memberService;
    private final ReviewService reviewService;
    private final ReviewFileService reviewFileService;

    @GetMapping("/main")
    public String main(Model model){
        model.addAttribute("reviews", reviewService.getTotalMain());
        return "/main/main";}

}
