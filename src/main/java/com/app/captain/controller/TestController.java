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
    public String test() {
        return "/faq/faq.html";
    }

    @GetMapping("/404")
    public String test2() {
        return "/error/404.html";
    }

    @GetMapping("/main")
    public String test3() {
        return "/main/main.html";
    }

    @GetMapping("/findId")
    public String test4() {
        return "/member/findId.html";
    }

    @GetMapping("/findPassword")
    public String test5() {
        return "/member/findPassword.html";
    }

    @GetMapping("/join")
    public String test6() {
        return "/member/join.html";
    }

    @GetMapping("/login")
    public String test7() {
        return "/member/login.html";
    }

    @GetMapping("/mypage")
    public String test8() {
        return "/mypage/mypage.html";
    }

    @GetMapping("/mypageMyRecruitList")
    public String test9() {
        return "/mypage/mypageMyRecruitList.html";
    }

    @GetMapping("/mypageParticipateRecruitList")
    public String test10() {
        return "/mypage/mypageParticipateRecruitList.html";
    }

    @GetMapping("/mypageReply")
    public String test11() {
        return "/mypage/mypageReply.html";
    }

    @GetMapping("/mypageReview")
    public String test12() {
        return "/mypage/mypageReview.html";
    }

    @GetMapping("/mypageUpdate")
    public String test13() {
        return "/mypage/mypageUpdate.html";
    }

    @GetMapping("/mypageUpdatePassword")
    public String test14() {
        return "/mypage/mypageUpdatePassword.html";
    }

    @GetMapping("/mypageUserLeave")
    public String test15() {
        return "/mypage/mypageUserLeave.html";
    }

    @GetMapping("/notice")
    public String test16() {
        return "/notice/notice.html";
    }

    @GetMapping("/recruitDetail")
    public String test17() {
        return "/recruitPage/recruitDetail.html";
    }

    @GetMapping("/recruitList")
    public String test18() {
        return "/recruitPage/recruitList.html";
    }

    @GetMapping("/recruitMake")
    public String test19() {
        return "/recruitPage/recruitMake.html";
    }

    @GetMapping("/recruitModify")
    public String test20() {
        return "/recruitPage/recruitModify.html";
    }

    @GetMapping("/reply")
    public String test21() {
        return "/replyPage/reply.html";
    }

    @GetMapping("/reviewDetail")
    public String test22() {
        return "/reviews/reviewDetail.html";
    }

    /*@GetMapping("/reviewList")
    public String test23() {
        return "/review/reviewList.html";
    }*/

    @GetMapping("/reviewMake")
    public String test24() {
        return "/reviews/reviewMake.html";
    }

    @GetMapping("/reviewModify")
    public String test25() {
        return "/reviews/reviewModify.html";
    }

    @GetMapping("/admin-member")
    public String test26() {
        return "/admin/admin-member.html";
    }

    @GetMapping("/admin-notice")
    public String test27() {
        return "/admin/admin-notice.html";
    }

    @GetMapping("/admin-recruit")
    public String test28() {
        return "/admin/admin-recruit.html";
    }

    @GetMapping("/admin-reply")
    public String test29() {
        return "/admin/admin-reply.html";
    }

    @GetMapping("/admin-review")
    public String test30() {
        return "/admin/admin-review.html";
    }
}
