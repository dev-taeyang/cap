package com.app.captain.controller;

import com.app.captain.domain.vo.MailTO;
import com.app.captain.domain.vo.MemberVO;
import com.app.captain.service.KakaoService;
import com.app.captain.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Random;

@Controller
@RequestMapping("/member/*")
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final KakaoService kakaoService;

    /* 로그인 페이지 */
    @GetMapping("login")
    public String login(HttpServletRequest request, RedirectAttributes redirectAttributes) {
        String memberIdentification = null, memberPassword = null;
        boolean check = false;

        if(request.getHeader("Cookie") != null) {
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                if(cookie.getName().equals("memberIdentification")) {
                    memberIdentification = cookie.getValue();
                    check = true;
                }else if(cookie.getName().equals("memberPassword")) {
                    memberPassword = cookie.getValue();
                    check = true;
                }
            }
        }

        if(check) {
            request.setAttribute("memberIdentification", memberIdentification);
            request.setAttribute("memberPassword", memberPassword);
            return "redirect:/main";
        }
        return "/member/login";
    }

    /* 로그인 실행 */
    @PostMapping("login")
    public String login(String memberIdentification, String memberPassword, RedirectAttributes redirectAttributes, HttpServletRequest request, HttpServletResponse response) {
        MemberVO member = memberService.getMember(memberIdentification, memberPassword);
        HttpSession session = request.getSession();
        boolean autoLogin = Boolean.valueOf(request.getParameter("auto-login"));
        if (member.getMemberIdentification().equals(memberIdentification) && member.getMemberPassword().equals(memberPassword)) {
            session.setAttribute("member", member);
            session.setAttribute("memberId", member.getMemberId());
            if(autoLogin) {
                Cookie memberIdentificationCookie = new Cookie("memberIdentification", memberIdentification);
                Cookie memberPasswordCookie = new Cookie("memberPassword", memberPassword);
                response.addCookie(memberIdentificationCookie);
                response.addCookie(memberPasswordCookie);
            }
            return "redirect:/main";
        }
        int result = 0;
        redirectAttributes.addFlashAttribute("result", result);
        return "/member/login";
    }

    /* 로그아웃 실행 */
    @GetMapping("logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:main";
    }

    /* 회원가입 선택 페이지 */
    @GetMapping("join-check")
    public void joinCheck() {
        ;
    }

    /* 회원가입 페이지 */
    @GetMapping("join")
    public String join(HttpSession session) {
        MemberVO kakaoMember = (MemberVO) session.getAttribute("kakaoInfo");
        session.setAttribute("kakaoInfo", kakaoMember);
        return "/member/join";
    }

    /* 회원가입 실행 */
    @PostMapping("join")
    public String join(MemberVO member, HttpSession session) {
        if (session.getAttribute("kakaoInfo") != null) {
            member.setMemberStatus(1);
            kakaoService.logoutKakao((String) session.getAttribute("token"));
        }
        if(session.getAttribute("naverEmail") != null){
            member.setMemberStatus(2);
            session.invalidate();
        }
        memberService.setMember(member);
        return "redirect:/login";
    }

    /* 가입내역 없을 때 페이지 */
    @GetMapping("no-info")
    public void noInfo() {
        ;
    }

    /* 가입내역 이미 존재할 때 페이지 */
    @GetMapping("already-info")
    public void alreadyInfo() {
        ;
    }

    /* 아이디 중복 체크 */
    @PostMapping("checkId")
    @ResponseBody
    public String checkId(String memberIdentification) {
        Integer check = memberService.checkId(memberIdentification);

        if (check != 0) {
            return "fail";
        } else {
            return "success";
        }
    }

    /* 휴대폰 번호 중복 체크 */
    @PostMapping("checkPhone")
    @ResponseBody
    public String checkPhone(String memberPhone) {
        Integer check = memberService.checkPhone(memberPhone);

        if (check != 0) {
            return "fail";
        } else {
            return "success";
        }
    }

    /* 닉네임 중복 체크 */
    @PostMapping("checkNickname")
    @ResponseBody
    public String checkNickname(String memberNickname) {
        Integer check = memberService.checkNickname(memberNickname);

        if (check != 0) {
            return "fail";
        } else {
            return "success";
        }
    }

    /* 이메일 중복 체크 */
    @PostMapping("checkEmail")
    @ResponseBody
    public String checkEmail(String memberEmail) {
        Integer check = memberService.checkEmail(memberEmail);

        if (check != 0) {
            return "fail";
        } else {
            return "success";
        }
    }

    /* 인증번호 체크 */
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

    /* 아이디 찾기 페이지 */
    @GetMapping("findId")
    public void findId() {
        ;
    }

    /* 아이디 찾기 실행 */
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

    /* 비밀번호 찾기 페이지 */
    @GetMapping("findPassword")
    public void findPassword() {
        ;
    }

    /* 비밀번호 찾기 이메일 인증 코드 전송 */
    @PostMapping("send")
    @ResponseBody
    public boolean sendTestMail(String memberEmail) {
        if (memberService.checkEmail(memberEmail) == 1) {

            String randomKey = memberService.randomKey();

            memberService.updateKey(memberEmail, randomKey);

            MailTO mailTO = new MailTO();

            mailTO.setAddress(memberEmail);
            mailTO.setTitle("탐험대장 이메일 링크 전송");
            mailTO.setMessage("http://localhost:10000/member/changePassword?memberEmail=" + memberEmail + "&memberRandomKey=" + randomKey);

            memberService.sendMail(mailTO);
            return true;
        }
        return false;
    }

    /* 비밀번호 변경 페이지 */
    @GetMapping("changePassword")
    public String changePassword(String memberEmail, String memberRandomKey) {
        if (!memberService.selectKey(memberEmail).equals(memberRandomKey)) {
            return "/";
        }
        memberService.updateKey(memberEmail, null);
        return "/member/changePassword";
    }

    /* 비밀번호 변경 실행 */
    @PostMapping("changePassword")
    public String changePasswordOK(String memberEmail, String memberPassword) {
        log.info(memberEmail);
        log.info(memberPassword);
        memberService.changePassword(memberEmail, memberPassword);
        return "/login";
    }

    /* 카카오 로그인 페이지*/
    @GetMapping("/kakao")
    public String kakaoLogin(MemberVO member, String code, HttpSession session) throws Exception {
        String token = kakaoService.getKaKaoAccessToken(code);
        MemberVO kakaoInfo = kakaoService.getKakaoInfo(token);
        //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if (memberService.checkEmail(kakaoInfo.getMemberEmail()) == 0) {
            session.setAttribute("kakaoInfo", kakaoInfo);
            return "redirect:no-info";
        } else if(memberService.checkStatus(kakaoInfo.getMemberEmail()) != 1){
            return "redirect:already-info";
        }
        member = memberService.getMemberByEmail(kakaoInfo.getMemberEmail());
        Long memberId = member.getMemberId();
        member.setMemberStatus(1);
        session.setAttribute("member", member);
        session.setAttribute("memberId", memberId);
        log.info(member.toString());
        return "redirect:/main";
    }

    /* 카카오 로그아웃 */
    @GetMapping("/kakao/logout")
    public String kakaoLogout(HttpSession session) {
        log.info("logout");
        kakaoService.logoutKakao((String) session.getAttribute("token"));
        session.invalidate();
        return "redirect:/login";
    }

    /* 네이버 로그인 페이지 */
    @GetMapping("naver")
    public String naverLogin() {
        return "/member/callback";
    }

    /* 네이버 로그인 실행 */
    @PostMapping("naver")
    @ResponseBody
    public Integer naverLogin(String memberName, String memberEmail, HttpSession session) {
        log.info(memberEmail);
        log.info(memberName);
        MemberVO member = memberService.getMemberByEmail(memberEmail);
        if (member == null) {
            session.setAttribute("naverEmail", memberEmail);
            session.setAttribute("naverName", memberName);
            return 0;
        }
        if(memberService.checkStatus(memberEmail) != 2){
            return 1;
        }
        Long memberId = member.getMemberId();
        session.setAttribute("member", member);
        session.setAttribute("memberId", memberId);
        return 2;
    }

}
