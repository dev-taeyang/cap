package com.app.captain.controller;

import com.app.captain.domain.vo.MemberVO;
import com.app.captain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.http.HttpResponse;
import java.util.Date;
import java.util.Random;

@Controller
@RequestMapping("/members/*")
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("login")
    public void login() {
        ;
    }

    @PostMapping("login")
    public String login(MemberVO member, HttpSession session, RedirectAttributes redirectAttributes) {
        MemberVO memberVO = memberService.getMember(member);
        if (memberVO != null && member.getMemberPassword().equals(memberVO.getMemberPassword())) {
            session.setAttribute("member", memberVO);
            return "redirect:/main";
        }
        int result = 0;
        redirectAttributes.addFlashAttribute("result", result);
        return "redirect:/login";
    }

    @GetMapping("logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate();
        return "redirect:/main";
    }

    @GetMapping("join")
    public void join(){;}

    @PostMapping("join")
    public String join(MemberVO member){
        memberService.setMember(member);
        return "redirect:/login";
    }

    @PostMapping("checkId")
    @ResponseBody
    public String checkId(String memberIdentification){
        int check = memberService.checkId(memberIdentification);

        if(check != 0){
            return "fail";
        }else{
            return "success";
        }
    }

    @PostMapping("checkPhone")
    @ResponseBody
    public String checkPhone(String memberPhone){
        int check = memberService.checkPhone(memberPhone);

        if(check != 0){
            return "fail";
        }else{
            return "success";
        }
    }

    @PostMapping("checkNickname")
    @ResponseBody
    public String checkNickname(String memberNickname){
        int check = memberService.checkNickname(memberNickname);

        if(check != 0){
            return "fail";
        }else{
            return "success";
        }
    }

    @PostMapping("checkSms")
    @ResponseBody
    public String checkSms(String memberPhone){
        Random random = new Random();

        String code = "";
        for(int i=0; i<4; i++) {
            String number = Integer.toString(random.nextInt(10));
            code += number;
        }

        memberService.checkSms(memberPhone,code);
        return code;
    }
}
