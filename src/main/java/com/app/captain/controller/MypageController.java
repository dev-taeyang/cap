package com.app.captain.controller;

import com.app.captain.domain.vo.MemberVO;
import com.app.captain.service.GroupReplyService;
import com.app.captain.service.MemberService;
import com.app.captain.service.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.logging.Logger;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/mypage/*")
public class MypageController {
    private final MypageService mypageService;
    private final GroupReplyService groupReplyService;

//    테스트로 컨트롤러 태워보기
//    내 정보들 가져오기

/*    @GetMapping("me/{memberId}")
    public String getMember(Model model, @PathVariable("memberId") Long memberId) {
        Long replyCount = mypageService.getReplyCount(memberId);
        MypageDTO mypageDTO = mypageService.getMember(memberId);
        model.addAttribute("mypageDTO", mypageDTO);
        model.addAttribute("replyCount", replyCount);

        return "/mypage/mypage";
    }*/

//    @GetMapping("mypage")
//    public void getMember(Model model, HttpSession session) {
//        Long replyCount = mypageService.getReplyCount((Long)session.getAttribute("memberId"));
//        model.addAttribute("mypageDTO", mypageService.getMember((Long)session.getAttribute("memberId")));
//        model.addAttribute("replyCount", replyCount);
////        log.info(sessionId);
//        log.info("들어옴");
//    }

    @GetMapping("me")
    public String getMember(Model model, HttpSession session) {
        MemberVO memberVO = (MemberVO) session.getAttribute("member");
        /* 세션에 값이 담겨 있다면 마이페이지로 이동*/
        if(memberVO != null) {
            model.addAttribute("members", mypageService.getMemberById(memberVO.getMemberId()));
            model.addAttribute("replyCount", groupReplyService.getReplyCount(memberVO.getMemberId()));

            return "mypage/mypage";
        }

        /* 없다면 로그인 페이지 */
        return "member/login";
    }

//      내 정보들 가져오기
//      post맨으로 잘 가져와짐
/*    @GetMapping("mypage/{memberId}")
    public MypageDTO getMemberPost(@PathVariable("memberId") Long memberId) {
        log.info(mypageService.getMember(memberId).toString());
        return mypageService.getMember(memberId);
    }*/


//    수정 폼으로 가기
    @GetMapping("mypageUpdate")
    public void moveToUpdate(HttpSession session, Model model){
        MemberVO memberVO = (MemberVO) session.getAttribute("member");

    };

    //    내 정보 수정하기
    @PatchMapping("mypageUpdate")
    public void modify(@PathVariable("memberId") Long memberId) {
        MemberVO memberVO = new MemberVO();
        memberVO.setMemberId(memberId);
        memberVO.setMemberIdentification("jjw123");
        memberVO.setMemberPassword("asd1234");
        memberVO.setMemberEmail("jjw123@gmail.com");
        memberVO.setMemberName("정지욱");
        memberVO.setMemberNickname("지욱22");
        memberVO.setMemberPhone("01012341234");
        memberVO.setMemberBirth("20000202");
        memberVO.setMemberGender("여");
    }

    /* 회원탈퇴하기 */
    @GetMapping("remove")
    public String remove(HttpSession session) {
        MemberVO memberVO = (MemberVO) session.getAttribute("member");
        /* 세션에 담긴 값 없애기 */
        session.invalidate();
        mypageService.remove(memberVO.getMemberId());

        return "redirect:/main";
    }

//    내가 개설한 탐험대 정보


//    내가 참가한 탐험대 정보
}
