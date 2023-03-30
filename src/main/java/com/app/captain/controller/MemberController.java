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

    @GetMapping("login")
    public void login(Model model, HttpSession session) {
//        String naverAuthUrl = naverloginbo.getAuthorizationUrl(session);
//        model.addAttribute("naverUrl", naverAuthUrl);
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
        String memberEmail = (String) session.getAttribute("memberEmail");
            /*Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0); //초단위
                response.addCookie(cookie);
        }*/
        if (memberService.checkStatus(memberEmail) != null) {
            kakaoService.logoutKakao((String) session.getAttribute("token"));
            session.invalidate();
            return "redirect:/main";
        }
        session.invalidate();
        return "redirect:/main";
    }

    @GetMapping("join-check")
    public void joinCheck() {
        ;
    }

    @GetMapping("join")
    public String join(HttpSession session) throws Exception {
        MemberVO kakaoMember = (MemberVO) session.getAttribute("kakaoInfo");
        session.setAttribute("kakaoInfo", kakaoMember);
        return "redirect:/join";
    }

    @PostMapping("join")
    public String join(MemberVO member, String code, HttpSession session) throws Exception {
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

    @GetMapping("no-info")
    public void noInfo() {
        ;
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

    @GetMapping("changePassword")
    public String changePassword(String memberEmail, String memberRandomKey) {
        if (!memberService.selectKey(memberEmail).equals(memberRandomKey)) {
            return "/";
        }
        memberService.updateKey(memberEmail, null);
        return "/member/changePassword";
    }

    @PostMapping("changePassword")
    public String changePasswordOK(String memberEmail, String memberPassword) {
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

    @GetMapping("/kakao")
    public String kakaoLogin(MemberVO member, String code, HttpSession session) throws Exception {
        String token = kakaoService.getKaKaoAccessToken(code);
        MemberVO kakaoInfo = kakaoService.getKakaoInfo(token);
        //    클라이언트의 이메일이 존재할 때 세션에 해당 이메일과 토큰 등록
        if (memberService.checkEmail(kakaoInfo.getMemberEmail()) == 0) {
            session.setAttribute("kakaoInfo", kakaoInfo);
            return "redirect:no-info";
        } else if(memberService.checkStatus(kakaoInfo.getMemberEmail()) != 1){
            return "redirect:login";
        }
        member = memberService.getKakaoMember(kakaoInfo.getMemberEmail());
        member.setMemberStatus(1);
        session.setAttribute("member", member);
        log.info(member.toString());
        return "redirect:/main";
    }

    @GetMapping("naver")
    public String naverLogin(HttpSession session) {
        return "/member/callback";
    }

    @PostMapping("naver")
    @ResponseBody
    public boolean naverLogin(MemberVO member, String memberEmail, HttpSession session) {
        log.info(memberEmail);
        member = memberService.getKakaoMember(memberEmail);
        if (member == null) {
            session.setAttribute("naverEmail", memberEmail);
            return false;
        }
        session.setAttribute("member", member);
        return true;
    }

}
