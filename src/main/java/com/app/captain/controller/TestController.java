package com.app.captain.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
@RequiredArgsConstructor
public class TestController {
    @GetMapping("/faq")
    public String test(){
        return "/faq/faq.html";
    }
    @GetMapping("/404")
    public String test2(){
        return "/error/404.html";
    }
    @GetMapping("/main")
    public String test3(){
        return "/main/main.html";
    }
    @GetMapping("/findId")
    public String test4(){
        return "/member/findId.html";
    }
    @GetMapping("/findPassword")
    public String test5(){
        return "/member/findPassword.html";
    }
    @GetMapping("/join")
    public String test6(){
        return "/member/join.html";
    }
    @GetMapping("/login")
    public String test7(){
        return "/member/login.html";
    }
    @GetMapping("/mypage")
    public String test8(){
        return "/mypage/mypage.html";
    }
}
