package com.app.captain.controller;

import com.app.captain.domain.vo.MailTO;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.service.KakaoService;
import com.app.captain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Controller
@RequestMapping("/member/*")
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final KakaoService kakaoService;

    @GetMapping("login")
    public void login() {
        ;
    }

    @PostMapping("login")
    public String login(MemberVO member, RedirectAttributes redirectAttributes, HttpServletRequest request, HttpServletResponse response) {
        MemberVO memberVO = memberService.getMember(member);
        HttpSession session = request.getSession();
        boolean autoLogin = Boolean.valueOf(request.getParameter("auto-login"));
        if (memberVO != null && member.getMemberPassword().equals(memberVO.getMemberPassword())) {
            if (autoLogin) {
                Cookie cookie = new Cookie("loginCookie", session.getId());
                cookie.setPath("/");
                cookie.setMaxAge(60 * 60 * 24 * 7);
                response.addCookie(cookie);
            }
            session.setAttribute("member", memberVO);
            session.setAttribute("memberId", memberVO.getMemberId());
            return "redirect:/main";
        }
        int result = 0;
        redirectAttributes.addFlashAttribute("result", result);
        return "redirect:/login";
    }

    @GetMapping("logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        Long memberId = (Long) session.getAttribute("memberId");
            /*Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0); //초단위
                response.addCookie(cookie);
        }*/
        if (memberService.checkStatus(memberId) != null) {
            kakaoService.logoutKakao((String) session.getAttribute("token"));
            session.invalidate();
            return "redirect:/main";
        }
        session.invalidate();
        return "redirect:/main";
    }

    @GetMapping("join")
    public void join() {
        ;
    }

    @PostMapping("join")
    public String join(MemberVO member) {
        memberService.setMember(member);
        return "redirect:/login";
    }

    @PostMapping("checkId")
    @ResponseBody
    public String checkId(String memberIdentification) {
        int check = memberService.checkId(memberIdentification);

        if (check != 0) {
            return "fail";
        } else {
            return "success";
        }
    }

    @PostMapping("checkPhone")
    @ResponseBody
    public String checkPhone(String memberPhone) {
        int check = memberService.checkPhone(memberPhone);

        if (check != 0) {
            return "fail";
        } else {
            return "success";
        }
    }

    @PostMapping("checkNickname")
    @ResponseBody
    public String checkNickname(String memberNickname) {
        int check = memberService.checkNickname(memberNickname);

        if (check != 0) {
            return "fail";
        } else {
            return "success";
        }
    }

    @PostMapping("checkEmail")
    @ResponseBody
    public String checkEmail(String memberEmail) {
        int check = memberService.checkEmail(memberEmail);

        if (check != 0) {
            return "fail";
        } else {
            return "success";
        }
    }

    @PostMapping("checkSms")
    @ResponseBody
    public String checkSms(String memberPhone) {
        Random random = new Random();

        String code = "";
        for (int i = 0; i < 4; i++) {
            String number = Integer.toString(random.nextInt(10));
            code += number;
        }

        memberService.checkSms(memberPhone, code);
        return code;
    }

    @GetMapping("findId")
    public void findId() {
        ;
    }

    @PostMapping("findId")
    @ResponseBody
    public String findId(String memberPhone) {
        String identification = memberService.findId(memberPhone);

        if (identification == "") {
            return null;
        } else {
            return identification;
        }
    }

    @GetMapping("findPassword")
    public void findPassword() {
        ;
    }

    @PostMapping("send")
    @ResponseBody
    public boolean sendTestMail(String memberEmail) {
        if (memberService.checkEmail(memberEmail) == 1) {

            MailTO mailTO = new MailTO();

            mailTO.setAddress(memberEmail);
            mailTO.setTitle("탐험대장 이메일 링크 전송");
            mailTO.setMessage("http://localhost:10000/member/changePassword?memberEmail=" + memberEmail);

            memberService.sendMail(mailTO);
            return true;
        }
        return false;
    }

    @GetMapping("changePassword")
    public void changePassword() {
        ;
    }

    @PostMapping("changePassword")
    public String changePassword(String memberEmail, String memberPassword) {
        log.info(memberEmail);
        log.info(memberPassword);
        memberService.changePassword(memberEmail, memberPassword);
        return "redirect:/login";
    }

    /* 카카오 로그인 */
    /*@ResponseBody
    @GetMapping("/kakao")
    public void kakaoCallback(@RequestParam String code, HttpSession session) throws Exception {
        log.info(code);
        String token = kakaoService.getKaKaoAccessToken(code);
        session.setAttribute("token", token);
        kakaoService.getKakaoInfo(token);
    }*/

    @GetMapping("/kakao/logout")
    public String kakaoLogout(HttpSession session) {
        log.info("logout");
        kakaoService.logoutKakao((String) session.getAttribute("token"));
        session.invalidate();
        return "redirect:/login";
    }

    /*@ResponseBody
    @GetMapping("/kakao")
    public void  kakaoCallback(@RequestParam String code, HttpSession session) throws Exception{
        String token = kakaoService.getKaKaoAccessToken(code);
        session.setAttribute("token", token);
    }*/

    /*@ResponseBody*/
    @GetMapping("/kakao")
    public String login(/*@RequestParam("code")*/MemberVO member, String code, HttpSession session) throws Exception {
        String token = kakaoService.getKaKaoAccessToken(code);
        int number = 0;
        number++;
        MemberVO kakaoInfo = kakaoService.getKakaoInfo(token);
        //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if(memberService.checkEmail(kakaoInfo.getMemberEmail()) == 0){
            MemberVO memberVO = new MemberVO();
            if(memberService.checkNickname(kakaoInfo.getMemberNickname()) != 0){
                memberVO.setMemberNickname(kakaoInfo.getMemberNickname() + number);
            } else{
                memberVO.setMemberNickname(kakaoInfo.getMemberNickname());
            }
            memberVO.setMemberIdentification(kakaoInfo.getMemberIdentification());
            memberVO.setMemberPassword(kakaoInfo.getMemberPassword());
            memberVO.setMemberName(kakaoInfo.getMemberName());
            memberVO.setMemberEmail(kakaoInfo.getMemberEmail());
            memberVO.setMemberGender(kakaoInfo.getMemberGender());
            memberVO.setMemberStatus(1);
            memberService.setMember(memberVO);
            member = memberService.getMember(memberVO);
            session.setAttribute("member", member);
            log.info(session.getAttribute("member").toString());
        }else {
            member = memberService.getMember(kakaoInfo);
            session.setAttribute("member", member);
            log.info(member.toString());
        }
        return "redirect:/main";
    }

}
